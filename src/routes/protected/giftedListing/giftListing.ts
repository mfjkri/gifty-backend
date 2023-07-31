import { Router, Request, Response } from "express";

import { parseParams } from "../../../params/savedListing/saveListing";
import handleGiftListing from "../../../handlers/giftedListing/giftListing";

const router: Router = Router();

router.put("/:id/gift", async (req: Request, res: Response) => {
  const params = parseParams(req.body);
  if (!params) {
    return res.status(400).json({ message: "Invalid params" });
  }

  await handleGiftListing(req, res, params);
});

export default router;
