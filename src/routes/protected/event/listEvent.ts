import { Router, Request, Response } from "express";

import { parseParams } from "../../../params/event/listEvent";
import handleListEvent from "../../../handlers/event/listEvent";

const router: Router = Router();

router.get("/", async (req: Request, res: Response) => {
  const params = parseParams(req.body);
  if (!params) {
    return res.status(400).json({ message: "Invalid params" });
  }

  await handleListEvent(req, res, params);
});

export default router;
