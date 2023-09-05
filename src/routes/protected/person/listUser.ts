import { Router, Request, Response } from "express";

import { parseParams } from "../../../params/person/listUser";
import handleListUser from "../../../handlers/person/listUser";

const router: Router = Router();

router.get("/user/:search?", async (req: Request, res: Response) => {
  const params = parseParams(req.body);
  if (!params) {
    return res.status(400).json({ message: "Invalid params" });
  }

  await handleListUser(req, res, params);
});

export default router;
