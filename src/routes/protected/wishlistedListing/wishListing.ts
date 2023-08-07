import { Router, Request, Response } from "express";

import { parseParams } from "../../../params/wishlistedListing/wishListing";
import handleWishListing from "../../../handlers/wishlistedListing/wishListing";

const router: Router = Router();

router.put("/:id/wish", async (req: Request, res: Response) => {
  const params = parseParams(req.body);
  if (!params) {
    return res.status(400).json({ message: "Invalid params" });
  }

  await handleWishListing(req, res, params);
});

export default router;
