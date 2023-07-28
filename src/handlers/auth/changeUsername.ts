import { Request, Response } from "express";

import User from "../../models/user";

const SUCCESS_CHANGED_USERNAME = "Username changed successfully";

const ERROR_USER_DOES_NOT_EXIST = "User does not exist";
const ERROR_USER_ALREADY_EXIST = "User already exists";
const ERROR_FAILED_TO_CHANGE_USERNAME = "Failed to change username";

export default async function handleChangeUsername(
  req: Request,
  res: Response
) {
  try {
    const newUsername = req.body.newUsername as string;
    const userId = req.body.userId as number;

    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ message: ERROR_USER_DOES_NOT_EXIST });
    }

    if (await User.findOne({ where: { username: newUsername } })) {
      return res.status(400).json({ message: ERROR_USER_ALREADY_EXIST });
    }

    user.username = newUsername;
    await user.save();

    res.status(201).json({ message: SUCCESS_CHANGED_USERNAME });
  } catch (error) {
    res.status(500).json({ message: ERROR_FAILED_TO_CHANGE_USERNAME, error });
  }
}
