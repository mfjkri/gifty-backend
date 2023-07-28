import { Router, Request, Response } from "express";

import { checkParams } from "../../../params/params";
import ChangeEmailParams from "../../../params/auth/changeEmail";
import handleChangeEmail from "../../../handlers/auth/changeEmail";

const router: Router = Router();

router.post("/changeEmail", async (req: Request, res: Response) => {
  if (!checkParams(req, res, ChangeEmailParams)) {
    return;
  }
  handleChangeEmail(req, res);
});

export default router;
