import { Router } from "express";

import ReadListingRouter from "./readListing";

const router: Router = Router();

router.use("/listing", ReadListingRouter);

export default router;
