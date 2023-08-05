import { Router } from "express";

import CreateEventRouter from "./createEvent";
import ReadEventRouter from "./readEvent";

const router: Router = Router();

router.use("/event", CreateEventRouter, ReadEventRouter);

export default router;
