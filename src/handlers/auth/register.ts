import { Request, Response } from "express";
import bcrypt from "bcrypt";

import User from "../../models/user";
import signToken from "./jwt";

const SUCCESS_USER_REGISTERED = "User registered successfully";

const ERROR_USER_ALREADY_EXIST = "User already exists";
const ERROR_INVALID_EMAIL_FORMAT = "Invalid email format";
const ERROR_FAILED_TO_REGISTER_USER = "Failed to register user";

export default async function handleRegister(req: Request, res: Response) {
  try {
    const username = req.body.username as string;
    const password = req.body.password as string;
    const email = req.body.email as string;
    const birthday = req.body.birthday as string;

    if (
      (await User.findOne({ where: { username } })) ||
      (await User.findOne({ where: { email } }))
    ) {
      return res.status(400).json({ message: ERROR_USER_ALREADY_EXIST });
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: ERROR_INVALID_EMAIL_FORMAT });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      birthday: new Date(birthday),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const token = signToken(user);
    res.status(201).json({ message: SUCCESS_USER_REGISTERED, token });
  } catch (error) {
    res.status(500).json({ message: ERROR_FAILED_TO_REGISTER_USER, error });
  }
}
