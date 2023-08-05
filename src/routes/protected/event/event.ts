import { Router } from "express";

import CreateEventRouter from "./createEvent";
import ReadEventRouter from "./readEvent";
import UpdateEventRouter from "./updateEvent";
import DeleteEventRouter from "./deleteEvent";

const router: Router = Router();

router.use(
  "/event",
  CreateEventRouter,
  ReadEventRouter,
  UpdateEventRouter,
  DeleteEventRouter
);

export default router;
