import { Op, OrderItem } from "sequelize";
import { Request, Response } from "express";

import { ListListingParams } from "../../params/listing/listListing";
import Listing from "../../models/listing";

const SUCCESS_LIST_LISTING = "Listed listing successfully";

const ERROR_FAILED_TO_LIST_LISTING = "Failed to list listing";

export default async function handleListListing(
  req: Request<any, any, any, ListListingParams>,
  res: Response,
  params: ListListingParams
) {
  try {
    const {
      orderBy,
      search,
      categories,
      platform,
      minPrice,
      maxPrice,
      page,
      limit,
    } = req.query;
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
    if (minPrice && maxPrice) {
      whereClause.price = { [Op.between]: [minPrice, maxPrice] };
    } else if (minPrice) {
      whereClause.price = { [Op.gte]: minPrice };
    } else if (maxPrice) {
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
    } else {
      order.push(["createdAt", "DESC"]);
    }

    // Pagination settings
    const currentPage = page ? page : 1;
    const itemsPerPage = limit ? limit : 50;
    const offset = (currentPage - 1) * itemsPerPage;
    const totalCount = await Listing.count({ where: whereClause });
    const totalPages = Math.ceil(totalCount / itemsPerPage);

    const listings = await Listing.findAll({
      where: whereClause,
      order,
      limit: itemsPerPage,
      offset: offset,
    });

    res.status(200).json({
      message: SUCCESS_LIST_LISTING,
      listing: listings,
      currentPage,
      totalPages,
    });
  } catch (error) {
    res.status(500).json({ message: ERROR_FAILED_TO_LIST_LISTING, error });
  }
}
