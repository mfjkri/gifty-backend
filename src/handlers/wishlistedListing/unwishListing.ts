import { Request, Response } from "express";

import { UnwishListingParams } from "../../params/wishlistedListing/unwishListing";
import User from "../../models/user";
import WishlistedListing from "../../models/wishlistedListing";

const SUCCESS_UNWISHLISTED_LISTING = "Unwishlisted listing successfully";

const ERROR_FAILED_TO_UNWISH_LISTING = "Failed to unwish listing";

export default async function handleUnwishListing(
  req: Request,
  res: Response,
  params: UnwishListingParams
) {
  try {
    const user: User = req.body.user;
    const wishlistedListings = await WishlistedListing.findAll({
      where: {
        userId: user.id,
        listingId: params.id,
        personId: params.personId,
      },
    });

    if (wishlistedListings) {
      if (wishlistedListings.length > 1) {
        for (let i = 1; i < wishlistedListings.length; i++) {
          await wishlistedListings[i].destroy();
        }
      }

      await wishlistedListings[0].update({ isWishlisted: false });
    }

    res.status(201).json({
      message: SUCCESS_UNWISHLISTED_LISTING,
    });
  } catch (error) {
    res.status(500).json({ message: ERROR_FAILED_TO_UNWISH_LISTING, error });
  }
}
