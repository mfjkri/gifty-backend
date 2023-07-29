import { Request, Response } from "express";

import { ReadListingParams } from "../../params/listing/readListing";
import Listing from "../../models/listing";

const SUCCESS_READ_LISTING = "Listing read successfully";

const ERROR_LISTING_DOES_NOT_EXIST = "Listing does not exist";
const ERROR_FAILED_TO_READ_LISTING = "Failed to read listing";

export default async function handleReadListing(
  req: Request,
  res: Response,
  params: ReadListingParams
) {
  try {
    const listing = await Listing.findOne({ where: { id: params.id } });
    if (!listing) {
      return res.status(400).json({ message: ERROR_LISTING_DOES_NOT_EXIST });
    }

    res.status(201).json({ message: SUCCESS_READ_LISTING, data: { listing } });
  } catch (error) {
    res.status(500).json({ message: ERROR_FAILED_TO_READ_LISTING, error });
  }
}
