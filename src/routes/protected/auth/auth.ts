import { Router } from "express";

import UpdatePasswordRouter from "./updatePassword";
import UpdateUserRouter from "./updateUser";

const router: Router = Router();

router.use("/auth", UpdatePasswordRouter, UpdateUserRouter);

export default router;
