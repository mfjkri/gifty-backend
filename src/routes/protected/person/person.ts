import { Router } from "express";

import CreatePersonRouter from "./createPerson";
import UpdatePersonRouter from "./updatePerson";
import DeletePersonRouter from "./deletePerson";
import ListPersonRouter from "./listPerson";

const router: Router = Router();

router.use(
  "/person",
  CreatePersonRouter,
  UpdatePersonRouter,
  DeletePersonRouter,
  ListPersonRouter
);

export default router;
