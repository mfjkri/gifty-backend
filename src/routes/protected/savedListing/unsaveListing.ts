import { Router, Request, Response } from "express";

import { parseParams } from "../../../params/savedListing/unsaveListing";
import handleUnsaveListing from "../../../handlers/savedListing/unsaveListing";

const router: Router = Router();

router.put("/:id/unsave", async (req: Request, res: Response) => {
  const params = parseParams(req.body);
  if (!params) {
    return res.status(400).json({ message: "Invalid params" });
  }

  await handleUnsaveListing(req, res, params);
});

export default router;
