import { Router, Request, Response } from "express";

import { parseParams } from "../../../params/savedListing/unsaveListing";
import handleUngiftListing from "../../../handlers/giftedListing/ungiftListing";

const router: Router = Router();

router.put("/:id/ungift", async (req: Request, res: Response) => {
  const params = parseParams(req.body);
  if (!params) {
    return res.status(400).json({ message: "Invalid params" });
  }

  await handleUngiftListing(req, res, params);
});

export default router;
