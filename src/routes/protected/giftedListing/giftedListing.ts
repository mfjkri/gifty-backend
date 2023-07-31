import { Router } from "express";

import GiftListingRouter from "./giftListing";
import UngiftListingRouter from "./ungiftListing";

const router: Router = Router();

router.use("/giftedListing", GiftListingRouter, UngiftListingRouter);

export default router;
