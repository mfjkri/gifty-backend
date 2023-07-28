import { Express } from "express";

import LoginRouter from "./login";

export default function initRoutes(expressApp: Express) {
  expressApp.use("/auth", LoginRouter);
}
