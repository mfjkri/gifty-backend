import { Router } from "express";

import CreatePersonRouter from "./createPerson";

const router: Router = Router();

router.use("/person", CreatePersonRouter);

export default router;
