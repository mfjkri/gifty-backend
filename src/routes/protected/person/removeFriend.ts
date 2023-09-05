import { Router, Request, Response } from "express";

import { parseParams } from "../../../params/person/removeFriend";
import handleRemoveFriend from "../../../handlers/person/removeFriend";

const router: Router = Router();

router.delete("/friend/:id", async (req: Request, res: Response) => {
  const params = parseParams(req.body);
  if (!params) {
    return res.status(400).json({ message: "Invalid params" });
  }

  await handleRemoveFriend(req, res, params);
});

export default router;
