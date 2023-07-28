import { Request, Response } from "express";

import User from "../../models/user";

const SUCCESS_CHANGED_EMAIL = "Email changed successfully";

const ERROR_USER_DOES_NOT_EXIST = "User does not exist";
const ERROR_USER_ALREADY_EXIST = "User already exists";
const ERROR_INVALID_EMAIL_FORMAT = "Invalid email format";
const ERROR_FAILED_TO_CHANGE_EMAIL = "Failed to change email";

export default async function handleChangeEmail(req: Request, res: Response) {
  try {
    const userId = req.body.userId as number;
    const newEmail = req.body.newEmail as string;

    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ message: ERROR_USER_DOES_NOT_EXIST });
    }

    if (await User.findOne({ where: { email: newEmail } })) {
      return res.status(400).json({ message: ERROR_USER_ALREADY_EXIST });
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(newEmail)) {
      return res.status(400).json({ message: ERROR_INVALID_EMAIL_FORMAT });
    }

    user.email = newEmail;
    await user.save();

    res.status(201).json({ message: SUCCESS_CHANGED_EMAIL });
  } catch (error) {
    res.status(500).json({ message: ERROR_FAILED_TO_CHANGE_EMAIL, error });
  }
}
