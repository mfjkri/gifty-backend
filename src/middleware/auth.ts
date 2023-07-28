import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { getConfig } from "../config/config";

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ message: "Authentication token missing" });
  }

  jwt.verify(token, getConfig().JWTSecretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    // req.user = user;
    next();
  });
};

export default authenticateToken;
