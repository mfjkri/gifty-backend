import { Request, Response } from "express";
import { Op, OrderItem } from "sequelize";

import Avatar from "../../models/avatar";
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

    const whereClause: any = {};
    const searchParam = req.params.search;
    if (searchParam) {
      whereClause[Op.or] = [{ name: { [Op.iLike]: `%${searchParam}%` } }];
    }
    const order: OrderItem[] = [];
    order.push(["name", "ASC"]);

    const persons = await Person.findAll({
      where: [whereClause, { ownerId: user.id }],
      include: {
        model: User,
        as: "user",
        include: [{ model: Avatar, as: "avatar" }],
      },
      order,
    });

    res.status(201).json({
      message: SUCCESS_LIST_PERSON,
      persons: persons.filter((person) => person.userId !== user.id),
    });
  } catch (error) {
    res.status(500).json({ message: ERROR_FAILED_TO_LIST_PERSON, error });
  }
}
