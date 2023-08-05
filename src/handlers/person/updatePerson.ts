import { Request, Response } from "express";

import Person from "../../models/person";
import User from "../../models/user";
import { UpdatePersonParams } from "../../params/person/updatePerson";

const SUCCESS_UPDATE_PERSON = "Updated person successfully";

const ERROR_PERSON_DOES_NOT_EXIST = "Person does not exist";
const ERROR_MISSING_PERMISSIONS = "Missing permissions";
const ERROR_FAILED_TO_UPDATE_PERSON = "Failed to update person";

export default async function handleUpdatePerson(
  req: Request,
  res: Response,
  params: UpdatePersonParams
) {
  try {
    const user: User = req.body.user;
    const person = await Person.findOne({ where: { id: params.id } });

    if (!person) {
      return res.status(400).json({ message: ERROR_PERSON_DOES_NOT_EXIST });
    }
    if (person.userId !== user.id) {
      return res.status(400).json({ message: ERROR_MISSING_PERMISSIONS });
    }

    if (params.name) {
      person.name = params.name;
    }
    if (params.birthday) {
      person.birthday = new Date(params.birthday);
    }
    await person.save();

    res.status(201).json({ message: SUCCESS_UPDATE_PERSON, person });
  } catch (error) {
    res.status(500).json({ message: ERROR_FAILED_TO_UPDATE_PERSON, error });
  }
}
