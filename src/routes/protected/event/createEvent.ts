import { Router, Request, Response } from "express";

import { parseParams } from "../../../params/event/createEvent";
import handleCreateEvent from "../../../handlers/event/createEvent";

const router: Router = Router();

router.post("/", async (req: Request, res: Response) => {
  const params = parseParams(req.body);
  if (!params) {
    return res.status(400).json({ message: "Invalid params" });
  }

  await handleCreateEvent(req, res, params);
});

export default router;
