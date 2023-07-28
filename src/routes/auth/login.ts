import { Router, Request, Response } from "express";

import { checkParams } from "../../params/params";
import LoginParams from "../../params/auth/login";
import handleLogin from "../../handlers/auth/login";

const router: Router = Router();

router.post("/login", async (req: Request, res: Response) => {
  if (!checkParams(req, res, LoginParams)) {
    return;
  }
  handleLogin(req, res);
});

export default router;
