import { Router } from "express";

import ChangeBirthdayRouter from "./changeBirthday";
import ChangeEmailRouter from "./changeEmail";
import ChangePasswordRouter from "./changePassword";

const router: Router = Router();

router.use(
  "/auth",
  ChangeBirthdayRouter,
  ChangeEmailRouter,
  ChangePasswordRouter
);

export default router;
