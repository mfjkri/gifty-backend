import { Request, Response } from "express";

import Listing from "../../models/listing";
import SavedListing from "../../models/savedListing";
import User from "../../models/user";
import { ListSavedListingParams } from "../../params/savedListing/listSavedListing";

const SUCCESS_LISTED_SAVED_LISTING = "Listed saved listing successfully";

const ERROR_FAILED_TO_LISTING_SAVED_LISTING = "Failed to list saved listing";

export default async function handleListSavedListing(
  req: Request,
  res: Response,
  params: ListSavedListingParams
) {
  try {
    const user: User = req.body.user;
    const savedListings = await SavedListing.findAll({
      where: { userId: user.id },
      include: { model: Listing, as: "listing" },
    });

    res.status(201).json({
      message: SUCCESS_LISTED_SAVED_LISTING,
      data: { savedListings },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: ERROR_FAILED_TO_LISTING_SAVED_LISTING, error });
  }
}
