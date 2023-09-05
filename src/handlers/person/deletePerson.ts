import { Request, Response } from "express";

import User from "../../models/user";
import Person from "../../models/person";
import { DeletePersonParams } from "../../params/person/deletePerson";

const SUCCESS_DELETED_PERSON = "Person deleted successfully";

const ERROR_PERSON_DOES_NOT_EXIST = "Person does not exist";
const ERROR_MISSING_PERMISSIONS = "Missing permissions";
const ERROR_FAILED_TO_DELETE_PERSON = "Failed to delete person";

export default async function handleDeletePerson(
  req: Request,
  res: Response,
  params: DeletePersonParams
) {
  try {
    const user = req.body.user as User;
    const person = await Person.findOne({ where: { id: params.id } });

    if (!person) {
      return res.status(400).json({ message: ERROR_PERSON_DOES_NOT_EXIST });
    }
    if (person.ownerId !== user.id) {
      return res.status(400).json({ message: ERROR_MISSING_PERMISSIONS });
    }
    await person.destroy();

    res.status(201).json({ message: SUCCESS_DELETED_PERSON, person });
  } catch (error) {
    res.status(500).json({ message: ERROR_FAILED_TO_DELETE_PERSON, error });
  }
}
