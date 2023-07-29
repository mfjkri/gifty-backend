import { Router, Request, Response } from "express";

import { parseParams } from "../../../params/person/createPerson";
import handleCreatePerson from "../../../handlers/person/createPerson";

const router: Router = Router();

router.post("/", async (req: Request, res: Response) => {
  const params = parseParams(req.body);
  if (!params) {
    return res.status(400).json({ message: "Invalid params" });
  }

  await handleCreatePerson(req, res, params);
});

export default router;
