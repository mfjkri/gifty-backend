import { Router } from "express";

import LoginRouter from "./login";
import RegisterRouter from "./register";

const router: Router = Router();

router.use("/auth", LoginRouter, RegisterRouter);

export default router;
