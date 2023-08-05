import { Router } from "express";

import authenticateToken from "../../middleware/auth";
import AuthRouter from "./auth/auth";
import GiftedListingRouter from "./giftedListing/giftedListing";
import ListingRouter from "./listing/listing";
import PersonRouter from "./person/person";
import SavedListingRouter from "./savedListing/savedListing";

const router: Router = Router();

router.use(
  "/api",
  authenticateToken,
  AuthRouter,
  GiftedListingRouter,
  ListingRouter,
  PersonRouter,
  SavedListingRouter
);

export default router;
