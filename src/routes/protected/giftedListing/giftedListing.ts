import { Router } from "express";

import ListGiftedListingRouter from "./listGiftedListing";
import GiftListingRouter from "./giftListing";
import UngiftListingRouter from "./ungiftListing";

const router: Router = Router();

router.use(
  "/giftedListing",
  ListGiftedListingRouter,
  GiftListingRouter,
  UngiftListingRouter
);

export default router;
