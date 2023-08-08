import { Request, Response } from "express";

import Listing from "../../models/listing";
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
      include: { model: Listing, as: "listing" },
    });

    if (savedListings.length === 0) {
      const savedListing = await SavedListing.create({
        userId: user.id,
        listingId: params.id,
        isSaved: true,
      });

      await savedListing.reload({
        include: { model: Listing, as: "listing" },
      });

      return res.status(201).json({
        message: SUCCESS_SAVED_LISTING,
        savedListing,
      });
    } else {
      if (savedListings.length > 1) {
        for (let i = 1; i < savedListings.length; i++) {
          await savedListings[i].destroy();
        }
      }

      await savedListings[0].update({ isSaved: true });

      res.status(201).json({
        message: SUCCESS_SAVED_LISTING,
        savedListing: savedListings[0],
      });
    }
  } catch (error) {
    res.status(500).json({ message: ERROR_FAILED_TO_SAVE_LISTING, error });
  }
}
