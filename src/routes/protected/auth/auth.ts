import { Router } from "express";

import ChangeBirthdayRouter from "./changeBirthday";
import ChangeEmailRouter from "./changeEmail";
import ChangePasswordRouter from "./changePassword";
import ChangeUsernameRouter from "./changeUsername";

const router: Router = Router();

router.use(
  "/auth",
  ChangeBirthdayRouter,
  ChangeEmailRouter,
  ChangePasswordRouter,
  ChangeUsernameRouter
);

export default router;
