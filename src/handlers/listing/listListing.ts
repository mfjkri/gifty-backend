import { Request, Response } from "express";

import { ListListingParams } from "../../params/listing/listListing";
import Listing from "../../models/listing";

const SUCCESS_LIST_LISTING = "Listed listing successfully";

const ERROR_FAILED_TO_LIST_LISTING = "Failed to list listing";

export default async function handleListListing(
  req: Request,
  res: Response,
  params: ListListingParams
) {
  try {
    const listing = await Listing.findAll();

    res.status(201).json({ message: SUCCESS_LIST_LISTING, data: { listing } });
  } catch (error) {
    res.status(500).json({ message: ERROR_FAILED_TO_LIST_LISTING, error });
  }
}
