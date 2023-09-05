import { Request, Response } from "express";

import User from "../../models/user";
import Person from "../../models/person";
import { AddFriendParams } from "../../params/person/addFriend";

const SUCCESS_ADDED_AS_FRIEND = "Added as friend successfully";

const ERROR_USER_DOES_NOT_EXIST = "User does not exist";
const ERROR_USER_ALREADY_ADDED_AS_FRIEND = "User already friends";
const ERROR_FAILED_TO_ADD_AS_FRIEND = "Failed to add as friend";

export default async function handleAddFriend(
  req: Request,
  res: Response,
  params: AddFriendParams
) {
  try {
    const user = req.body.user as User;
    const friend = await User.findOne({ where: { id: params.id } });
    if (!friend) {
      return res.status(400).json({ message: ERROR_USER_DOES_NOT_EXIST });
    }
    if (
      await Person.findOne({ where: { ownerId: user.id, userId: params.id } })
    ) {
      return res
        .status(400)
        .json({ message: ERROR_USER_ALREADY_ADDED_AS_FRIEND });
    }

    const person = await Person.create({
      ownerId: user.id,
      name: friend.username,
      userId: params.id,
      selfOwned: false,
    });

    res.status(201).json({ message: SUCCESS_ADDED_AS_FRIEND, person });
  } catch (error) {
    res.status(500).json({ message: ERROR_FAILED_TO_ADD_AS_FRIEND, error });
  }
}
