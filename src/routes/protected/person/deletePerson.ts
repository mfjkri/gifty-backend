import { Router, Request, Response } from "express";

import { parseParams } from "../../../params/person/deletePerson";
import handleDeletePerson from "../../../handlers/person/deletePerson";

const router: Router = Router();

router.delete("/:id", async (req: Request, res: Response) => {
  const params = parseParams(req.body);
  if (!params) {
    return res.status(400).json({ message: "Invalid params" });
  }

  await handleDeletePerson(req, res, params);
});

export default router;
