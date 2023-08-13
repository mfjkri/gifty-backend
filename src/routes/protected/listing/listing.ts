import { Router } from "express";

import ListGiftedListingRouter from "./listGiftedListing";
import ListListingRouter from "./listListing";
import ListSavedListingRouter from "./listSavedListing";
import ListWislistedListingRouter from "./listWishlistedListing";
import RandomListingRouter from "./randomListing";
import ReadListingRouter from "./readListing";

const router: Router = Router();

router.use(
  "/listing",
  ListGiftedListingRouter,
  ListListingRouter,
  ListSavedListingRouter,
  ListWislistedListingRouter,
  RandomListingRouter,
  ReadListingRouter
);

export default router;
