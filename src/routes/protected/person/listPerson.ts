import { Router, Request, Response } from "express";

import { parseParams } from "../../../params/person/listPerson";
import handleListPerson from "../../../handlers/person/listPerson";

const router: Router = Router();

router.get("/:search?", async (req: Request, res: Response) => {
  const params = parseParams(req.body);
  if (!params) {
    return res.status(400).json({ message: "Invalid params" });
  }

  await handleListPerson(req, res, params);
});

export default router;
