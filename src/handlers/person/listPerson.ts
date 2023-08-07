import { Request, Response } from "express";
import { Op, OrderItem } from "sequelize";

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
    order.push(["updatedAt", "DESC"]);

    const persons = await Person.findAll({
      where: [whereClause, { userId: user.id }],
      order,
    });

    res.status(201).json({ message: SUCCESS_LIST_PERSON, persons });
  } catch (error) {
    res.status(500).json({ message: ERROR_FAILED_TO_LIST_PERSON, error });
  }
}
