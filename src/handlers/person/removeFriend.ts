import { Request, Response } from "express";

import User from "../../models/user";
import Person from "../../models/person";
import { RemoveFriendParams } from "../../params/person/removeFriend";

const SUCCESS_REMOVED_FRIEND = "Removed friend successfully";

const ERROR_FRIEND_DOES_NOT_EXIST = "Friend does not exist";
const ERROR_FAILED_TO_REMOVE_FRIEND = "Failed to remove friend";

export default async function handleRemoveFriend(
  req: Request,
  res: Response,
  params: RemoveFriendParams
) {
  try {
    const user = req.body.user as User;
    const person = await Person.findOne({
      where: { ownerId: user.id, userId: params.id },
    });
    if (!person) {
      return res.status(400).json({ message: ERROR_FRIEND_DOES_NOT_EXIST });
    }
    await person.destroy();

    res.status(201).json({ message: SUCCESS_REMOVED_FRIEND, person });
  } catch (error) {
    res.status(500).json({ message: ERROR_FAILED_TO_REMOVE_FRIEND, error });
  }
}
