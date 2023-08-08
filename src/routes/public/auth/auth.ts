import { Router } from "express";

import LoginRouter from "./login";
import RegisterRouter from "./register";
import RefreshTokenRouter from "./refreshToken";
import GetOTPRouter from "./getOTP";

const router: Router = Router();

router.use(
  "/auth",
  GetOTPRouter,
  LoginRouter,
  RegisterRouter,
  RefreshTokenRouter
);

export default router;
