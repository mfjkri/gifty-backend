import { Request, Response } from "express";

import { ReadListingParams } from "../../params/listing/readListing";
import { getListing } from "./listing";
import User from "../../models/user";

const SUCCESS_READ_LISTING = "Listing read successfully";

const ERROR_LISTING_DOES_NOT_EXIST = "Listing does not exist";
const ERROR_FAILED_TO_READ_LISTING = "Failed to read listing";

export default async function handleReadListing(
  req: Request,
  res: Response,
  params: ReadListingParams
) {
  try {
    const user: User = req.body.user;

    const listing = await getListing(params.id, user, res);
    if (!listing) {
      return;
    }

    res.status(201).json({
      message: SUCCESS_READ_LISTING,
      data: { listing },
    });
  } catch (error) {
    res.status(500).json({ message: ERROR_FAILED_TO_READ_LISTING, error });
  }
}
