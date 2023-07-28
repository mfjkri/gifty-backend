import { Request, Response } from "express";
import bcrypt from "bcrypt";

import User from "../../models/user";
import signToken from "./jwt";

const SUCCESS_CHANGED_PASSWORD = "Password changed successfully";

const ERROR_USER_DOES_NOT_EXIST = "User does not exist";
const ERROR_FAILED_TO_CHANGE_PASSWORD = "Failed to change password";

export default async function handleChangePassword(
  req: Request,
  res: Response
) {
  try {
    const newPassword = req.body.newPassword as string;
    const userId = req.body.userId as number;

    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ message: ERROR_USER_DOES_NOT_EXIST });
    }
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.status(201).json({ message: SUCCESS_CHANGED_PASSWORD });
  } catch (error) {
    res.status(500).json({ message: ERROR_FAILED_TO_CHANGE_PASSWORD, error });
  }
}
