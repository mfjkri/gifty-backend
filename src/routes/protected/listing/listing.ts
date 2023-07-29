import { Router } from "express";

import ListListingRouter from "./listListing";
import ReadListingRouter from "./readListing";

const router: Router = Router();

router.use("/listing", ListListingRouter, ReadListingRouter);

export default router;
