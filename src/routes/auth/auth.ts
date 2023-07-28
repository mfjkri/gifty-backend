import { Express } from "express";

import LoginRouter from "./login";
import RegisterRouter from "./register";

export default function initRoutes(expressApp: Express) {
  expressApp.use("/auth", LoginRouter, RegisterRouter);
}
