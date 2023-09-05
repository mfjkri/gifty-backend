import { Request, Response } from "express";

import Avatar from "../../models/avatar";
import Person from "../../models/person";
import User from "../../models/user";
import { GetUserParams } from "../../params/auth/getUser";

const SUCCESS_FETCHED_USER = "Fetched user successfully";

const ERROR_USER_DOES_NOT_EXIST = "User does not exist";
const ERROR_FAILED_TO_GET_USER = "Failed to get user";

export default async function handleGetUser(
  req: Request,
  res: Response,
  params: GetUserParams
) {
  try {
    let user: User | null;
    if (!req.params.id || req.params.id === "0") {
      user = req.body.user;
    } else {
      user = await User.findOne({
        where: { id: req.params.id },
        include: { model: Avatar, as: "avatar" },
      });
    }

    if (!user) {
      return res.status(404).json({ message: ERROR_USER_DOES_NOT_EXIST });
    }

    let isFriends = false;
    if (req.body.user.id !== user.id) {
      const person = await Person.findOne({
        where: { ownerId: req.body.user.id, userId: user.id },
      });
      isFriends = person ? true : false;
    }

    const person = await Person.findOne({
      where: { ownerId: user.id, userId: user.id },
    });

    if (!person) {
      return res.status(404).json({ message: ERROR_USER_DOES_NOT_EXIST });
    }

    return res.status(201).json({
      message: SUCCESS_FETCHED_USER,
      user: {
        username: user.username,
        email: user.email,
        birthday: user.birthday,
        avatar: user.avatar,
        joinedAt: user.createdAt,
        isFriends: isFriends,
        personId: person.id,
      },
    });
  } catch (error) {
    res.status(500).json({ message: ERROR_FAILED_TO_GET_USER, error });
  }
}
