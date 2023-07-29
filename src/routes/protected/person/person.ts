import { Router } from "express";

import CreatePersonRouter from "./createPerson";
import ReadPersonRouter from "./readPerson";
import UpdatePersonRouter from "./updatePerson";
import DeletePersonRouter from "./deletePerson";
import ListPersonRouter from "./listPerson";

const router: Router = Router();

router.use(
  "/person",
  CreatePersonRouter,
  ReadPersonRouter,
  UpdatePersonRouter,
  DeletePersonRouter,
  ListPersonRouter
);

export default router;
