import { Express } from "express";

import PublicRouters from "./public/public";
import ProtectedRouters from "./protected/protected";

export default function initRoutes(expressApp: Express) {
  expressApp.use(PublicRouters, ProtectedRouters);
}
