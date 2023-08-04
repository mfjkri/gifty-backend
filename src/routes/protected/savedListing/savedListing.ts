import { Router } from "express";

import ListSavedListingRouter from "./listSavedListing";
import SaveListingRouter from "./saveListing";
import UnsaveListingRouter from "./unsaveListing";

const router: Router = Router();

router.use(
  "/savedListing",
  ListSavedListingRouter,
  SaveListingRouter,
  UnsaveListingRouter
);

export default router;
