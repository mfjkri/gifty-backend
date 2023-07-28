import { Router } from "express";

import authenticateToken from "../../middleware/auth";

const router: Router = Router();

router.use("/api", authenticateToken);

export default router;
