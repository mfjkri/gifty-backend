import { Request, Response } from "express";

import Listing from "../../models/listing";
import User from "../../models/user";
import { ListGiftedListingParams } from "../../params/giftedListing/listGiftedListing";
import GiftedListing from "../../models/giftedListing";

const SUCCESS_LISTED_GIFTED_LISTING = "Listed gifted listing successfully";

const ERROR_FAILED_TO_LISTING_GIFTED_LISTING = "Failed to list gifted listing";

export default async function handleListGiftedListing(
  req: Request,
  res: Response,
  params: ListGiftedListingParams
) {
  try {
    const user: User = req.body.user;
    const giftedListings = await GiftedListing.findAll({
      where: { userId: user.id },
      include: { model: Listing, as: "listing" },
    });

    res.status(201).json({
      message: SUCCESS_LISTED_GIFTED_LISTING,
      data: { giftedListings: giftedListings },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: ERROR_FAILED_TO_LISTING_GIFTED_LISTING, error });
  }
}
