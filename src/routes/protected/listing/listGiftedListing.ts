import { Router, Request, Response } from "express";

import { parseParams } from "../../../params/listing/listGiftedListing";
import handleListGiftedListing from "../../../handlers/listing/listGiftedListing";

const router: Router = Router();

router.get("/gifted/:search?", async (req: Request, res: Response) => {
  const params = parseParams(req.body);
  if (!params) {
    return res.status(400).json({ message: "Invalid params" });
  }

  await handleListGiftedListing(req, res, params);
});

export default router;
