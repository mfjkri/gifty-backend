import { Router, Request, Response } from "express";

import { parseParams } from "../../../params/event/deleteEvent";
import handleDeleteEvent from "../../../handlers/event/deleteEvent";

const router: Router = Router();

router.delete("/:id", async (req: Request, res: Response) => {
  const params = parseParams(req.body);
  if (!params) {
    return res.status(400).json({ message: "Invalid params" });
  }

  await handleDeleteEvent(req, res, params);
});

export default router;
