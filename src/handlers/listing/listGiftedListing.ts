import { Op, OrderItem } from "sequelize";
import { Request, Response } from "express";

import { getListing } from "./listing";
import { ListGiftedListingParams } from "../../params/listing/listGiftedListing";
import GiftedListing from "../../models/giftedListing";

const SUCCESS_LIST_LISTING = "Listed listing successfully";

const ERROR_FAILED_TO_LIST_LISTING = "Failed to list listing";

export default async function handleListGiftedListing(
  req: Request,
  res: Response,
  params: ListGiftedListingParams
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
    order.push(["updatedAt", "ASC"]);

    const giftedListings = await GiftedListing.findAll({
      where: [{ userId: req.body.user.id, isGifted: true }, whereClause],
      order,
    });

    const listingsJoined: any[] = [];
    for (const giftedListing of giftedListings) {
      const listingJoined = await getListing(
        giftedListing.listingId,
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
