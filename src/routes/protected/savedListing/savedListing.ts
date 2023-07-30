import { Router } from "express";

import SaveListingRouter from "./saveListing";

const router: Router = Router();

router.use("/savedListing", SaveListingRouter);

export default router;
