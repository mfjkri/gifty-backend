import { Request, Response } from "express";

import User from "../../models/user";
import { UpdatePasswordParams } from "../../params/auth/updatePassword";

const SUCCESS_UPDATED_PASSWORD = "Password updated successfully";

const ERROR_FAILED_TO_UPDATE_PASSWORD = "Failed to update password";

export default async function handleUpdatePassword(
  req: Request,
  res: Response,
  params: UpdatePasswordParams
) {
  try {
    const user: User = req.body.user;
    user.password = params.newPassword;
    await user.save();

    res.status(201).json({ message: SUCCESS_UPDATED_PASSWORD });
  } catch (error) {
    res.status(500).json({ message: ERROR_FAILED_TO_UPDATE_PASSWORD, error });
  }
}
