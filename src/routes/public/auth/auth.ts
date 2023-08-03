import { Router } from "express";

import LoginRouter from "./login";
import RegisterRouter from "./register";
import RefreshTokenRouter from "./refreshToken";

const router: Router = Router();

router.use("/auth", LoginRouter, RegisterRouter, RefreshTokenRouter);

export default router;
