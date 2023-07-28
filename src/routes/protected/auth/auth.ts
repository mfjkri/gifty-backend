import { Router } from "express";

import ChangeBirthdayRouter from "./changeBirthday";
import ChangePasswordRouter from "./changePassword";

const router: Router = Router();

router.use("/auth", ChangeBirthdayRouter, ChangePasswordRouter);

export default router;
