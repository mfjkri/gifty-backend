import { Router } from "express";

import authenticateToken from "../../middleware/auth";
import AuthRouter from "./auth/auth";
import PersonsRouter from "./person/person";

const router: Router = Router();

router.use("/api", authenticateToken, AuthRouter, PersonsRouter);

export default router;
