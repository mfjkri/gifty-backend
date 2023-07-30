import { Router } from "express";

import SaveListingRouter from "./saveListing";
import UnsaveListingRouter from "./unsaveListing";

const router: Router = Router();

router.use("/savedListing", SaveListingRouter, UnsaveListingRouter);

export default router;
