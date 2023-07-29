import { Request, Response } from "express";

import Person from "../../models/person";
import User from "../../models/user";
import { ListPersonParams } from "../../params/person/listPerson";

const SUCCESS_LIST_PERSON = "Listed person successfully";

const ERROR_FAILED_TO_LIST_PERSON = "Failed to list person";

export default async function handleListPerson(
  req: Request,
  res: Response,
  params: ListPersonParams
) {
  try {
    const user: User = req.body.user;
    const persons = await Person.findAll({ where: { userId: user.id } });

    res.status(201).json({ message: SUCCESS_LIST_PERSON, data: { persons } });
  } catch (error) {
    res.status(500).json({ message: ERROR_FAILED_TO_LIST_PERSON, error });
  }
}
