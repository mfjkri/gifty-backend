import { Router, Request, Response } from "express";

import { parseParams } from "../../../params/listing/randomListing";
import handleGetRandomListing from "../../../handlers/listing/randomListing";

const router: Router = Router();

router.get("/random/get", async (req: Request, res: Response) => {
  const params = parseParams(req.body);
  if (!params) {
    return res.status(400).json({ message: "Invalid params" });
  }

  await handleGetRandomListing(req, res, params);
});

export default router;
