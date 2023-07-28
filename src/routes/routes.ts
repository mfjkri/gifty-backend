import { Express } from "express";

import initAuthRoutes from "./auth/auth";

export default function initRoutes(expressApp: Express) {
  initAuthRoutes(expressApp);
}
