import { Request, Response } from "express";
import bcrypt from "bcrypt";

import User from "../../models/user";

const SUCCESS_CHANGED_PASSWORD = "Password changed successfully";

const ERROR_FAILED_TO_CHANGE_PASSWORD = "Failed to change password";

export default async function handleChangePassword(
  req: Request,
  res: Response
) {
  try {
    const user = req.body.user as User;
    const newPassword = req.body.newPassword as string;

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.status(201).json({ message: SUCCESS_CHANGED_PASSWORD });
  } catch (error) {
    res.status(500).json({ message: ERROR_FAILED_TO_CHANGE_PASSWORD, error });
  }
}
