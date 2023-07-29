import { Router, Request, Response } from "express";

import { parseParams } from "../../../params/person/updatePerson";
import handleUpdatePerson from "../../../handlers/person/updatePerson";

const router: Router = Router();

router.put("/:id", async (req: Request, res: Response) => {
  const params = parseParams(req.body);
  if (!params) {
    return res.status(400).json({ message: "Invalid params" });
  }

  await handleUpdatePerson(req, res, params);
});

export default router;
