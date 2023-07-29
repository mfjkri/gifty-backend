import { Router } from "express";

import CreatePersonRouter from "./createPerson";
import UpdatePersonRouter from "./updatePerson";
import DeletePersonRouter from "./deletePerson";

const router: Router = Router();

router.use(
  "/person",
  CreatePersonRouter,
  UpdatePersonRouter,
  DeletePersonRouter
);

export default router;
