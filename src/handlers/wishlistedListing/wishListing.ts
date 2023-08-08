import { Request, Response } from "express";

import { WishListingParams } from "../../params/wishlistedListing/wishListing";
import Listing from "../../models/listing";
import User from "../../models/user";
import WishlistedListing from "../../models/wishlistedListing";
import Person from "../../models/person";

const SUCCESS_WISHLISTED_LISTING = "Wishlisted listing successfully";

const ERROR_FAILED_TO_WISH_LISTING = "Failed to wish listing";

export default async function handleWishListing(
  req: Request,
  res: Response,
  params: WishListingParams
) {
  try {
    const user: User = req.body.user;

    const wishlistedListings = await WishlistedListing.findAll({
      where: {
        userId: user.id,
        listingId: params.id,
        personId: params.personId,
      },
      include: [
        { model: Listing, as: "listing" },
        { model: Person, as: "person" },
      ],
    });

    if (wishlistedListings.length === 0) {
      const wishlistedListing = await WishlistedListing.create({
        userId: user.id,
        listingId: params.id,
        personId: params.personId,
        isWishlisted: true,
      });

      await wishlistedListing.reload({
        include: [
          { model: Listing, as: "listing" },
          { model: Person, as: "person" },
        ],
      });

      return res.status(201).json({
        message: SUCCESS_WISHLISTED_LISTING,
        wishlistedListing,
      });
    } else {
      if (wishlistedListings.length > 1) {
        for (let i = 1; i < wishlistedListings.length; i++) {
          await wishlistedListings[i].destroy();
        }
      }

      await wishlistedListings[0].update({ isWishlisted: true });

      res.status(201).json({
        message: SUCCESS_WISHLISTED_LISTING,
        wishlistedListing: wishlistedListings[0],
      });
    }
  } catch (error) {
    res.status(500).json({ message: ERROR_FAILED_TO_WISH_LISTING, error });
  }
}
