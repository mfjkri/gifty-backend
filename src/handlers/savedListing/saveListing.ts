import { Request, Response } from "express";

import SavedListing from "../../models/savedListing";
import User from "../../models/user";
import { SaveListingParams } from "../../params/savedListing/unsaveListing";

const SUCCESS_SAVED_LISTING = "Saved listing successfully";

const ERROR_FAILED_TO_SAVE_LISTING = "Failed to save listing";

export default async function handleSaveListing(
  req: Request,
  res: Response,
  params: SaveListingParams
) {
  try {
    const user: User = req.body.user;
    const savedListings = await SavedListing.findAll({
      where: { userId: user.id, listingId: params.id },
    });

    if (savedListings.length === 0) {
      const savedListing = await SavedListing.create({
        userId: user.id,
        listingId: params.id,
        isSaved: true,
      });

      return res.status(201).json({
        message: SUCCESS_SAVED_LISTING,
        data: { savedListing },
      });
    } else {
      if (savedListings.length > 1) {
        for (let i = 1; i < savedListings.length; i++) {
          await savedListings[i].destroy();
        }
      }

      savedListings[0].isSaved = true;
      await savedListings[0].save();

      res.status(201).json({
        message: SUCCESS_SAVED_LISTING,
        data: { savedListing: savedListings[0] },
      });
    }
  } catch (error) {
    res.status(500).json({ message: ERROR_FAILED_TO_SAVE_LISTING, error });
  }
}
