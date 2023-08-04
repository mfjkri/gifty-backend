import { Router, Request, Response } from "express";

import { parseParams } from "../../../params/savedListing/listSavedListing";
import handleListSavedListing from "../../../handlers/savedListing/listSavedListing";

const router: Router = Router();

router.get("/", async (req: Request, res: Response) => {
  const params = parseParams(req.body);
  if (!params) {
    return res.status(400).json({ message: "Invalid params" });
  }

  await handleListSavedListing(req, res, params);
});

export default router;
