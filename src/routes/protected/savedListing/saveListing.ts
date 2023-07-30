import { Router, Request, Response } from "express";

import { parseParams } from "../../../params/savedListing/saveListing";
import handleSaveListing from "../../../handlers/savedListing/saveListing";

const router: Router = Router();

router.put("/:id/save", async (req: Request, res: Response) => {
  const params = parseParams(req.body);
  if (!params) {
    return res.status(400).json({ message: "Invalid params" });
  }

  await handleSaveListing(req, res, params);
});

export default router;
