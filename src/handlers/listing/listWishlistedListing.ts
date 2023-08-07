import { Op, OrderItem } from "sequelize";
import { Request, Response } from "express";

import { getListing } from "./listing";
import { ListWishlistedListingParams } from "../../params/listing/listWishlistedListing";
import Listing from "../../models/listing";

const SUCCESS_LIST_LISTING = "Listed listing successfully";

const ERROR_FAILED_TO_LIST_LISTING = "Failed to list listing";

export default async function handleListWishlistedListing(
  req: Request,
  res: Response,
  params: ListWishlistedListingParams
) {
  try {
    const whereClause: any = {};
    const searchParam = req.params.search;
    if (searchParam) {
      whereClause[Op.or] = [
        { title: { [Op.iLike]: `%${searchParam}%` } },
        { description: { [Op.iLike]: `%${searchParam}%` } },
      ];
    }

    const order: OrderItem[] = [];
    order.push(["updatedAt", "DESC"]);

    const listings = await Listing.findAll({ where: whereClause, order });

    const listingsJoined: any[] = [];
    for (const listing of listings) {
      const listingJoined = await getListing(listing.id, req.body.user, res);
      if (
        listingJoined &&
        listingJoined.wishlisted.includes(parseInt(req.params.personId))
      ) {
        listingsJoined.push(listingJoined);
      }
    }

    res.status(201).json({
      message: SUCCESS_LIST_LISTING,
      listing: listingsJoined,
    });
  } catch (error) {
    res.status(500).json({ message: ERROR_FAILED_TO_LIST_LISTING, error });
  }
}
