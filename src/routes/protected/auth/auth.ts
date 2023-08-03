import { Router } from "express";

import GetUserRouter from "./getUser";
import UpdateAvatarRouter from "./updateAvatar";
import UpdatePasswordRouter from "./updatePassword";
import UpdateUserRouter from "./updateUser";

const router: Router = Router();

router.use(
  "/auth",
  GetUserRouter,
  UpdateAvatarRouter,
  UpdatePasswordRouter,
  UpdateUserRouter
);

export default router;
