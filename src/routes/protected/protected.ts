import { Router } from "express";

import authenticateToken from "../../middleware/auth";
import AuthRouter from "./auth/auth";
import ListingRouter from "./listing/listing";
import PersonRouter from "./person/person";

const router: Router = Router();

router.use("/api", authenticateToken, AuthRouter, ListingRouter, PersonRouter);

export default router;
