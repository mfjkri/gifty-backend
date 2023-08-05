import { Router } from "express";

import authenticateToken from "../../middleware/auth";
import AuthRouter from "./auth/auth";
import EventRouter from "./event/event";
import GiftedListingRouter from "./giftedListing/giftedListing";
import ListingRouter from "./listing/listing";
import PersonRouter from "./person/person";
import SavedListingRouter from "./savedListing/savedListing";

const router: Router = Router();

router.use(
  "/api",
  authenticateToken,
  AuthRouter,
  EventRouter,
  GiftedListingRouter,
  ListingRouter,
  PersonRouter,
  SavedListingRouter
);

export default router;
