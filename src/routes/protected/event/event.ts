import { Router } from "express";

import CreateEventRouter from "./createEvent";
import ReadEventRouter from "./readEvent";
import UpdateEventRouter from "./updateEvent";

const router: Router = Router();

router.use("/event", CreateEventRouter, ReadEventRouter, UpdateEventRouter);

export default router;
