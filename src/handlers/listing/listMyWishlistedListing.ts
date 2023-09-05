import { Op, OrderItem } from "sequelize";
import { Request, Response } from "express";

import { getListing } from "./listing";
import { ListMyWishlistedListingParams } from "../../params/listing/listMyWishlistedListing";
import WishlistedListing from "../../models/wishlistedListing";
import Person from "../../models/person";
import User from "../../models/user";

const SUCCESS_LIST_LISTING = "Listed listing successfully";

const ERROR_PERSON_NOT_FOUND = "Person not found";
const ERROR_USER_NOT_FOUND = "User not found";
const ERROR_FAILED_TO_LIST_LISTING = "Failed to list listing";

export default async function handleListMyWishlistedListing(
  req: Request<any, any, any, ListMyWishlistedListingParams>,
  res: Response,
  params: ListMyWishlistedListingParams
) {
  try {
    const { userId, search } = req.query;
    let user: User | null;
    if (userId && userId !== 0) {
      user = await User.findOne({ where: { id: userId } });
    } else {
      user = req.body.user;
    }

    if (!user) {
      user = req.body.user;
    }
    if (!user) {
      return res.status(400).json({ message: ERROR_USER_NOT_FOUND });
    }

    const whereClause: any = {};
    if (search) {
      whereClause[Op.or] = [
        { title: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } },
      ];
    }

    const order: OrderItem[] = [];
    order.push(["updatedAt", "DESC"]);

    const person = await Person.findOne({
      where: {
        userId: user.id,
        ownerId: user.id,
      },
    });

    if (!person) {
      return res.status(400).json({ message: ERROR_PERSON_NOT_FOUND });
    }

    const wishlistedListings = await WishlistedListing.findAll({
      where: [{ userId: user.id, personId: person.id, isWishlisted: true }],
      order,
    });

    const listingsJoined: any[] = [];
    for (const wishlistedListing of wishlistedListings) {
      const listingJoined = await getListing(
        wishlistedListing.listingId,
        user,
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
