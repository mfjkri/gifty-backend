import { Router, Request, Response } from "express";

import { checkParams } from "../../../params/params";
import RegisterParams from "../../../params/auth/register";
import handleRegister from "../../../handlers/auth/register";

const router: Router = Router();

router.post("/register", async (req: Request, res: Response) => {
  if (!checkParams(req, res, RegisterParams)) {
    return res;
  }

  handleRegister(req, res);
});

export default router;
