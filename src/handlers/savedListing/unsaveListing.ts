import { Request, Response } from "express";

import SavedListing from "../../models/savedListing";
import User from "../../models/user";
import { UnsaveListingParams } from "../../params/savedListing/saveListing";

const SUCCESS_UNSAVED_LISTING = "Unsaved listing successfully";

const ERROR_FAILED_TO_UNSAVE_LISTING = "Failed to unsave listing";

export default async function handleUnsaveListing(
  req: Request,
  res: Response,
  params: UnsaveListingParams
) {
  try {
    const user: User = req.body.user;
    const savedListings = await SavedListing.findAll({
      where: { userId: user.id, listingId: params.id },
    });

    if (savedListings) {
      if (savedListings.length > 1) {
        for (let i = 1; i < savedListings.length; i++) {
          await savedListings[i].destroy();
        }
      }

      await savedListings[0].update({ isSaved: false });
    }

    res.status(201).json({
      message: SUCCESS_UNSAVED_LISTING,
    });
  } catch (error) {
    res.status(500).json({ message: ERROR_FAILED_TO_UNSAVE_LISTING, error });
  }
}
