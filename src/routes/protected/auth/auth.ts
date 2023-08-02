import { Router } from "express";

import GetUserRouter from "./getUser";
import UpdatePasswordRouter from "./updatePassword";
import UpdateUserRouter from "./updateUser";

const router: Router = Router();

router.use("/auth", GetUserRouter, UpdatePasswordRouter, UpdateUserRouter);

export default router;
