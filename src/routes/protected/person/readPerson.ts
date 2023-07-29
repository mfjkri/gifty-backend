import { Router, Request, Response } from "express";

import { parseParams } from "../../../params/person/readPerson";
import handleReadPerson from "../../../handlers/person/readPerson";

const router: Router = Router();

router.get("/:id", async (req: Request, res: Response) => {
  const params = parseParams(req.body);
  if (!params) {
    return res.status(400).json({ message: "Invalid params" });
  }

  await handleReadPerson(req, res, params);
});

export default router;
