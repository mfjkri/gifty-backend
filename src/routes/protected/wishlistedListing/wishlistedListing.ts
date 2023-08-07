import { Router } from "express";

import WishListingRouter from "./wishListing";

const router: Router = Router();

router.use("/wishlistedListing", WishListingRouter);

export default router;
