import { Router, Request, Response } from "express";

import { parseParams } from "../../../params/event/updateEvent";
import handleUpdateEvent from "../../../handlers/event/updateEvent";

const router: Router = Router();

router.put("/:id", async (req: Request, res: Response) => {
  const params = parseParams(req.body);
  if (!params) {
    return res.status(400).json({ message: "Invalid params" });
  }

  await handleUpdateEvent(req, res, params);
});

export default router;
