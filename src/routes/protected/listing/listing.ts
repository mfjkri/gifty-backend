import { Router } from "express";

import ListListingRouter from "./listListing";
import ListSavedListingRouter from "./listSavedListing";
import ReadListingRouter from "./readListing";

const router: Router = Router();

router.use(
  "/listing",
  ListListingRouter,
  ListSavedListingRouter,
  ReadListingRouter
);

export default router;
