import { Op, OrderItem } from "sequelize";
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
    const { orderBy, search, categories, platform, minPrice, maxPrice } =
      params;
    const whereClause: any = {};

    // Apply search filter
    if (search) {
      whereClause[Op.or] = [
        { title: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } },
      ];
    }

    // Apply category filter
    if (categories && categories.length > 0) {
      whereClause.categories = { [Op.overlap]: categories };
    }

    // Apply platform filter
    if (platform) {
      whereClause.platform = platform;
    }

    // Apply price range filter
    if (minPrice !== -Infinity && maxPrice !== Infinity) {
      whereClause.price = { [Op.between]: [minPrice, maxPrice] };
    } else if (minPrice !== -Infinity) {
      whereClause.price = { [Op.gte]: minPrice };
    } else if (maxPrice !== Infinity) {
      whereClause.price = { [Op.lte]: maxPrice };
    }

    // Apply sorting order
    const order: OrderItem[] = [];
    if (orderBy === "price_asc") {
      order.push(["price", "ASC"]);
    } else if (orderBy === "price_desc") {
      order.push(["price", "DESC"]);
    } else if (orderBy === "createdAt_asc") {
      order.push(["createdAt", "ASC"]);
    } else if (orderBy === "createdAt_desc") {
      order.push(["createdAt", "DESC"]);
    } else if (orderBy === "updatedAt_asc") {
      order.push(["updatedAt", "ASC"]);
    } else if (orderBy === "updatedAt_desc") {
      order.push(["updatedAt", "DESC"]);
    }

    console.log("whereClause is", whereClause);

    const listing = await Listing.findAll({
      where: whereClause,
      order,
    });

    res.status(201).json({ message: SUCCESS_LIST_LISTING, data: { listing } });
  } catch (error) {
    res.status(500).json({ message: ERROR_FAILED_TO_LIST_LISTING, error });
  }
}
