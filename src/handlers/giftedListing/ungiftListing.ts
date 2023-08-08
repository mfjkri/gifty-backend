import { Request, Response } from "express";

import GiftedListing from "../../models/giftedListing";
import User from "../../models/user";
import { UngiftListingParams } from "../../params/giftedListing/giftListing";

const SUCCESS_UNGIFTED_LISTING = "Ungifted listing successfully";

const ERROR_FAILED_TO_UNGIFT_LISTING = "Failed to ungift listing";

export default async function handleUngiftListing(
  req: Request,
  res: Response,
  params: UngiftListingParams
) {
  try {
    const user: User = req.body.user;
    const giftedListings = await GiftedListing.findAll({
      where: { userId: user.id, listingId: params.id },
    });

    if (giftedListings) {
      if (giftedListings.length > 1) {
        for (let i = 1; i < giftedListings.length; i++) {
          await giftedListings[i].destroy();
        }
      }

      await giftedListings[0].update({ isGifted: false });
    }

    res.status(201).json({
      message: SUCCESS_UNGIFTED_LISTING,
    });
  } catch (error) {
    res.status(500).json({ message: ERROR_FAILED_TO_UNGIFT_LISTING, error });
  }
}
