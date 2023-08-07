import { Router, Request, Response } from "express";

import { parseParams } from "../../../params/listing/listSavedListing";
import handleListSavedListing from "../../../handlers/listing/listSavedListing";

const router: Router = Router();

router.get("/saved/:search?", async (req: Request, res: Response) => {
  const params = parseParams(req.body);
  if (!params) {
    return res.status(400).json({ message: "Invalid params" });
  }

  await handleListSavedListing(req, res, params);
});

export default router;
