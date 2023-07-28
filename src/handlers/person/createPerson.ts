import { Request, Response } from "express";

import User from "../../models/user";
import Person from "../../models/person";

const SUCCESS_CREATED_PERSON = "Person created successfully";

const ERROR_PERSON_ALREADY_EXIST = "Person already exists";
const ERROR_FAILED_TO_CREATE_PERSON = "Failed to create person";

export default async function handleCreatePerson(req: Request, res: Response) {
  try {
    const user = req.body.user as User;
    const name = req.body.name as string;
    const birthday = req.body.birthday as string;

    if (await Person.findOne({ where: { name: name } })) {
      return res.status(400).json({ message: ERROR_PERSON_ALREADY_EXIST });
    }

    const person = await Person.create({
      userId: user.id,
      name: name,
      birthday: new Date(birthday),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    res.status(201).json({ message: SUCCESS_CREATED_PERSON, person });
  } catch (error) {
    res.status(500).json({ message: ERROR_FAILED_TO_CREATE_PERSON, error });
  }
}
