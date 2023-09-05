import { Router } from "express";

import CreatePersonRouter from "./createPerson";
import UpdatePersonRouter from "./updatePerson";
import DeletePersonRouter from "./deletePerson";
import ListPersonRouter from "./listPerson";
import ListUserRouter from "./listUser";
import AddFriendRouter from "./addFriend";
import RemoveFriendRouter from "./removeFriend";

const router: Router = Router();

router.use(
  "/person",
  CreatePersonRouter,
  UpdatePersonRouter,
  DeletePersonRouter,
  ListPersonRouter,
  ListUserRouter,
  AddFriendRouter,
  RemoveFriendRouter
);

export default router;
