import { Router, Request, Response } from "express";

import { parseParams } from "../../../params/listing/listWishlistedListing";
import handleListWishlistedListing from "../../../handlers/listing/listWishlistedListing";

const router: Router = Router();

router.get(
  "/wishlisted/:personId?:search?",
  async (req: Request, res: Response) => {
    const params = parseParams(req.body);
    if (!params) {
      return res.status(400).json({ message: "Invalid params" });
    }

    await handleListWishlistedListing(req, res, params);
  }
);

export default router;
