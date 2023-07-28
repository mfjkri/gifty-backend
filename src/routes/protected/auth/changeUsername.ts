import { Router, Request, Response } from "express";

import { checkParams } from "../../../params/params";
import ChangeUsernameParams from "../../../params/auth/changeUsername";
import handleChangeUsername from "../../../handlers/auth/changeUsername";

const router: Router = Router();

router.post("/changeUsername", async (req: Request, res: Response) => {
  if (!checkParams(req, res, ChangeUsernameParams)) {
    return;
  }
  handleChangeUsername(req, res);
});

export default router;
