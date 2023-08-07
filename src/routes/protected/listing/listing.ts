import { Router } from "express";

import ListGiftedListingRouter from "./listGiftedListing";
import ListListingRouter from "./listListing";
import ListSavedListingRouter from "./listSavedListing";
import ReadListingRouter from "./readListing";

const router: Router = Router();

router.use(
  "/listing",
  ListGiftedListingRouter,
  ListListingRouter,
  ListSavedListingRouter,
  ReadListingRouter
);

export default router;
