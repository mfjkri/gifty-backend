import { Op, OrderItem } from "sequelize";
import { Request, Response } from "express";

import { getListing } from "./listing";
import { ListWishlistedListingParams } from "../../params/listing/listWishlistedListing";
import WishlistedListing from "../../models/wishlistedListing";

const SUCCESS_LIST_LISTING = "Listed listing successfully";

const ERROR_FAILED_TO_LIST_LISTING = "Failed to list listing";

export default async function handleListWishlistedListing(
  req: Request<any, any, any, ListWishlistedListingParams>,
  res: Response,
  params: ListWishlistedListingParams
) {
  try {
    const whereClause: any = {};
    const { personId, search } = req.query;
    if (search) {
      whereClause[Op.or] = [
        { title: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } },
      ];
    }

    const order: OrderItem[] = [];
    order.push(["updatedAt", "DESC"]);

    const wishlistedListings = await WishlistedListing.findAll({
      where: [
        {
          userId: req.body.user.id,
          personId: personId,
          isWishlisted: true,
        },
        // whereClause,
      ],
      order,
    });

    const listingsJoined: any[] = [];
    for (const wishlistedListing of wishlistedListings) {
      const listingJoined = await getListing(
        wishlistedListing.listingId,
        req.body.user,
        res
      );
      if (listingJoined) {
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
