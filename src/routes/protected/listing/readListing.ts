import { Router, Request, Response } from "express";

import { parseParams } from "../../../params/listing/readListing";
import handleReadListing from "../../../handlers/listing/readListing";

const router: Router = Router();

router.get("/:id", async (req: Request, res: Response) => {
  const params = parseParams(req.body);
  if (!params) {
    return res.status(400).json({ message: "Invalid params" });
  }

  await handleReadListing(req, res, params);
});

export default router;
