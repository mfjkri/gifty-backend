import jwt from "jsonwebtoken";

import { getConfig } from "../../config/config";
import User from "../../models/user";

export default function signToken(user: User) {
  const config = getConfig();
  return jwt.sign({ userId: user.id }, config.JWTSecretKey, {
    expiresIn: "2 days",
  });
}
