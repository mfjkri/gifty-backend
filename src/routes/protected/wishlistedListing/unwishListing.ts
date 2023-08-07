import { Router, Request, Response } from "express";

import { parseParams } from "../../../params/wishlistedListing/unwishListing";
import handleUnwishListing from "../../../handlers/wishlistedListing/unwishListing";

const router: Router = Router();

router.put("/:id/unwish", async (req: Request, res: Response) => {
  const params = parseParams(req.body);
  if (!params) {
    return res.status(400).json({ message: "Invalid params" });
  }

  await handleUnwishListing(req, res, params);
});

export default router;
