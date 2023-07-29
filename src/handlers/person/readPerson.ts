import { Request, Response } from "express";

import User from "../../models/user";
import Person from "../../models/person";
import { ReadPersonParams } from "../../params/person/readPerson";

const SUCCESS_READ_PERSON = "Person read successfully";

const ERROR_PERSON_DOES_NOT_EXIST = "Person does not exist";
const ERROR_MISSING_PERMISSIONS = "Missing permissions";
const ERROR_FAILED_TO_READ_PERSON = "Failed to read person";

export default async function handleReadPerson(
  req: Request,
  res: Response,
  params: ReadPersonParams
) {
  try {
    const user = req.body.user as User;
    const person = await Person.findOne({ where: { id: params.id } });

    if (!person) {
      return res.status(400).json({ message: ERROR_PERSON_DOES_NOT_EXIST });
    }
    if (person.userId !== user.id) {
      return res.status(400).json({ message: ERROR_MISSING_PERMISSIONS });
    }

    res.status(201).json({ message: SUCCESS_READ_PERSON, data: { person } });
  } catch (error) {
    res.status(500).json({ message: ERROR_FAILED_TO_READ_PERSON, error });
  }
}
