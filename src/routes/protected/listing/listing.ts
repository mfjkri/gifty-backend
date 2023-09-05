import { Router } from "express";

import ListGiftedListingRouter from "./listGiftedListing";
import ListListingRouter from "./listListing";
import ListMyWishlistedListingRouter from "./listMyWishlistedListing";
import ListSavedListingRouter from "./listSavedListing";
import ListWislistedListingRouter from "./listWishlistedListing";
import RandomListingRouter from "./randomListing";
import ReadListingRouter from "./readListing";

const router: Router = Router();

router.use(
  "/listing",
  ListGiftedListingRouter,
  ListListingRouter,
  ListMyWishlistedListingRouter,
  ListSavedListingRouter,
  ListWislistedListingRouter,
  RandomListingRouter,
  ReadListingRouter
);

export default router;
