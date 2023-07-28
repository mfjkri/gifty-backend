import { Router, Request, Response } from "express";

import { checkParams } from "../../../params/params";
import ChangePasswordParams from "../../../params/auth/changePassword";
import handleChangePassword from "../../../handlers/auth/changePassword";

const router: Router = Router();

router.put("/changePassword", async (req: Request, res: Response) => {
  if (!checkParams(req, res, ChangePasswordParams)) {
    return;
  }
  handleChangePassword(req, res);
});

export default router;
