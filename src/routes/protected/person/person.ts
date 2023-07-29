import { Router } from "express";

import CreatePersonRouter from "./createPerson";
import DeletePersonRouter from "./deletePerson";

const router: Router = Router();

router.use("/person", CreatePersonRouter, DeletePersonRouter);

export default router;
