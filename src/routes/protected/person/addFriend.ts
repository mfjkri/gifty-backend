import { Router, Request, Response } from "express";

import { parseParams } from "../../../params/person/addFriend";
import handleAddFriend from "../../../handlers/person/addFriend";

const router: Router = Router();

router.post("/friend/", async (req: Request, res: Response) => {
  const params = parseParams(req.body);
  if (!params) {
    return res.status(400).json({ message: "Invalid params" });
  }

  await handleAddFriend(req, res, params);
});

export default router;
