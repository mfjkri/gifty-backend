import { Router, Request, Response } from "express";

import { checkParams } from "../../../params/params";
import CreatePersonParams from "../../../params/person/createPerson";
import handleCreatePerson from "../../../handlers/person/createPerson";

const router: Router = Router();

router.post("/", async (req: Request, res: Response) => {
  if (!checkParams(req, res, CreatePersonParams)) {
    return;
  }
  handleCreatePerson(req, res);
});

export default router;
