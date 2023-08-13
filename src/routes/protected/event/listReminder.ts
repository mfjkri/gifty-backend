import { Router, Request, Response } from "express";

import { parseParams } from "../../../params/event/listReminder";
import handleListReminder from "../../../handlers/event/listReminder";

const router: Router = Router();

router.get("/list/reminder", async (req: Request, res: Response) => {
  const params = parseParams(req.body);
  if (!params) {
    return res.status(400).json({ message: "Invalid params" });
  }

  await handleListReminder(req, res, params);
});

export default router;
