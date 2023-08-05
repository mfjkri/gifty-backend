import { Request, Response } from "express";

import GiftedListing from "../../models/giftedListing";
import Listing from "../../models/listing";
import User from "../../models/user";
import { GiftListingParams } from "../../params/giftedListing/ungiftListing";

const SUCCESS_GIFTED_LISTING = "Gifted listing successfully";

const ERROR_FAILED_TO_GIFT_LISTING = "Failed to gift listing";

export default async function handleGiftListing(
  req: Request,
  res: Response,
  params: GiftListingParams
) {
  try {
    const user: User = req.body.user;
    const giftedListings = await GiftedListing.findAll({
      where: { userId: user.id, listingId: params.id },
      include: { model: Listing, as: "listing" },
    });

    if (giftedListings.length === 0) {
      const giftedListing = await GiftedListing.create({
        userId: user.id,
        listingId: params.id,
        isGifted: true,
      });

      await giftedListing.reload({
        include: { model: Listing, as: "listing" },
      });

      return res.status(201).json({
        message: SUCCESS_GIFTED_LISTING,
        giftedListing,
      });
    } else {
      if (giftedListings.length > 1) {
        for (let i = 1; i < giftedListings.length; i++) {
          await giftedListings[i].destroy();
        }
      }

      giftedListings[0].isGifted = true;
      await giftedListings[0].save();

      res.status(201).json({
        message: SUCCESS_GIFTED_LISTING,
        giftedListing: giftedListings[0],
      });
    }
  } catch (error) {
    res.status(500).json({ message: ERROR_FAILED_TO_GIFT_LISTING, error });
  }
}
