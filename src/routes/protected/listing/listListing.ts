import { Router, Request, Response } from "express";

import {
  ListListingParams,
  parseParams,
} from "../../../params/listing/listListing";
import handleListListing from "../../../handlers/listing/listListing";

const router: Router = Router();

router.get(
  "/",
  async (req: Request<any, any, any, ListListingParams>, res: Response) => {
    const params = parseParams(req.body);
    if (!params) {
      return res.status(400).json({ message: "Invalid params" });
    }

    await handleListListing(req, res, params);
  }
);

export default router;
