import { Router } from "express";

import CreatePersonRouter from "./createPerson";
import ReadPersonRouter from "./readPerson";
import UpdatePersonRouter from "./updatePerson";
import DeletePersonRouter from "./deletePerson";

const router: Router = Router();

router.use(
  "/person",
  CreatePersonRouter,
  ReadPersonRouter,
  UpdatePersonRouter,
  DeletePersonRouter
);

export default router;
