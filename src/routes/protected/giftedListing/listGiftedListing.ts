import { Router, Request, Response } from "express";

import { parseParams } from "../../../params/giftedListing/listGiftedListing";
import handleListGiftedListing from "../../../handlers/giftedListing/listGiftedListing";

const router: Router = Router();

router.get("/", async (req: Request, res: Response) => {
  const params = parseParams(req.body);
  if (!params) {
    return res.status(400).json({ message: "Invalid params" });
  }

  await handleListGiftedListing(req, res, params);
});

export default router;
