import { Router } from "express";

import WishListingRouter from "./wishListing";
import UnwishListingRouter from "./unwishListing";

const router: Router = Router();

router.use("/wishlistedListing", WishListingRouter, UnwishListingRouter);

export default router;
