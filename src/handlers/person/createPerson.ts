import { Request, Response } from "express";

import User from "../../models/user";
import Person from "../../models/person";
import { CreatePersonParams } from "../../params/person/createPerson";

const SUCCESS_CREATED_PERSON = "Person created successfully";

const ERROR_PERSON_ALREADY_EXIST = "Person already exists";
const ERROR_FAILED_TO_CREATE_PERSON = "Failed to create person";

export default async function handleCreatePerson(
  req: Request,
  res: Response,
  params: CreatePersonParams
) {
  try {
    const user = req.body.user as User;

    if (await Person.findOne({ where: { name: params.name } })) {
      return res.status(400).json({ message: ERROR_PERSON_ALREADY_EXIST });
    }

    const person = await Person.create({
      userId: user.id,
      name: params.name,
      birthday: new Date(params.birthday),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    res.status(201).json({ message: SUCCESS_CREATED_PERSON, person });
  } catch (error) {
    res.status(500).json({ message: ERROR_FAILED_TO_CREATE_PERSON, error });
  }
}
