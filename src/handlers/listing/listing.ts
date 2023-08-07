import { Response } from "express";

import Listing from "../../models/listing";
import User from "../../models/user";
import GiftedListing from "../../models/giftedListing";
import SavedListing from "../../models/savedListing";

const ERROR_LISTING_DOES_NOT_EXIST = "Listing does not exist";

export async function getListing(listingId: number, user: User, res: Response) {
  const listing = await Listing.findOne({ where: { id: listingId } });
  if (!listing) {
    res.status(400).json({ message: ERROR_LISTING_DOES_NOT_EXIST });
    return null;
  }

  let isGifted = false;
  let isSaved = false;
  {
    const giftedListings = await GiftedListing.findAll({
      where: { userId: user.id, listingId: listing.id },
    });
    if (giftedListings.length > 0) {
      for (const giftedListing of giftedListings) {
        isGifted = isGifted || giftedListing.isGifted;
      }
    }
  }
  {
    const savedListings = await SavedListing.findAll({
      where: { userId: user.id, listingId: listing.id },
    });
    if (savedListings.length > 0) {
      for (const savedListing of savedListings) {
        isSaved = isSaved || savedListing.isSaved;
      }
    }
  }

  return {
    id: listing.id,
    title: listing.title,
    description: listing.description,

    categories: listing.categories,
    price: listing.price,

    source: listing.source,
    platform: listing.platform,
    purchaseUrl: listing.purchaseUrl,

    isGifted,
    isSaved,
    wishlisted: [],
  };
}
