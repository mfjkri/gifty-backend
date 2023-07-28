import { Router, Request, Response } from "express";

import { checkParams } from "../../../params/params";
import ChangeBirthdayParams from "../../../params/auth/changeBirthday";
import handleChangeBirthday from "../../../handlers/auth/changeBirthday";

const router: Router = Router();

router.put("/changeBirthday", async (req: Request, res: Response) => {
  if (!checkParams(req, res, ChangeBirthdayParams)) {
    return;
  }
  handleChangeBirthday(req, res);
});

export default router;
