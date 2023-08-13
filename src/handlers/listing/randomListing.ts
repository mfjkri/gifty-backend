import { Request, Response } from "express";

import { RandomListingParams } from "../../params/listing/randomListing";
import { joinListing } from "./listing";
import Listing from "../../models/listing";
import User from "../../models/user";

const ERROR_NO_LISTINGS = "No listings available";

export default async function handleGetRandomListing(
  req: Request,
  res: Response,
  params: RandomListingParams
) {
  try {
    const user: User = req.body.user;

    const totalListings = await Listing.count();
    if (totalListings === 0) {
      return res.status(404).json({ message: ERROR_NO_LISTINGS });
    }

    const randomOffset = Math.floor(Math.random() * totalListings);
    const randomListing = await Listing.findOne({
      offset: randomOffset,
    });
    if (!randomListing) {
      return res.status(404).json({ message: ERROR_NO_LISTINGS });
    }

    const joinedListing = await joinListing(randomListing, user);
    if (!joinedListing) {
      return;
    }

    res.status(200).json({ listing: joinedListing });
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
}
