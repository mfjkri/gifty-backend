import { Router } from "express";

import CreateEventRouter from "./createEvent";

const router: Router = Router();

router.use("/event", CreateEventRouter);

export default router;
