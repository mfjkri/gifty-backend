import { Router, Request, Response } from "express";

import { parseParams } from "../../../params/event/readEvent";
import handleReadEvent from "../../../handlers/event/readEvent";

const router: Router = Router();

router.get("/:id", async (req: Request, res: Response) => {
  const params = parseParams(req.body);
  if (!params) {
    return res.status(400).json({ message: "Invalid params" });
  }

  await handleReadEvent(req, res, params);
});

export default router;
