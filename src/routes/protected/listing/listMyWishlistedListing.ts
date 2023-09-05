import { Router, Request, Response } from "express";

import { parseParams } from "../../../params/listing/listMyWishlistedListing";
import handleListMyWishlistedListing from "../../../handlers/listing/listMyWishlistedListing";

const router: Router = Router();

router.get("/myWishlisted", async (req: Request, res: Response) => {
  const params = parseParams(req.body);
  if (!params) {
    return res.status(400).json({ message: "Invalid params" });
  }

  await handleListMyWishlistedListing(req, res, params);
});

export default router;
