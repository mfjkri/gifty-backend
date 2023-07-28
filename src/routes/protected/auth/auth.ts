import { Router } from "express";

import ChangePasswordRouter from "./changePassword";

const router: Router = Router();

router.use("/auth", ChangePasswordRouter);

export default router;
