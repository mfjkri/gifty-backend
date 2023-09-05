import { Request, Response } from "express";
import { Op, OrderItem } from "sequelize";

import Avatar from "../../models/avatar";
import User from "../../models/user";
import { ListUserParams } from "../../params/person/listUser";

const SUCCESS_LIST_USER = "Listed users successfully";

const ERROR_FAILED_TO_LIST_USER = "Failed to list user";

export default async function handleListUser(
  req: Request,
  res: Response,
  params: ListUserParams
) {
  try {
    const user: User = req.body.user;

    const whereClause: any = {};
    const searchParam = req.params.search;
    if (searchParam) {
      whereClause[Op.or] = [{ username: { [Op.iLike]: `%${searchParam}%` } }];
    }
    const order: OrderItem[] = [];
    order.push(["username", "ASC"]);

    const users = await User.findAll({
      where: whereClause,
      include: {
        model: Avatar,
        as: "avatar",
      },
      order,
    });

    const sanitisedUsers = users
      .filter((other_user) => other_user.id !== user.id)
      .filter((other_user) => other_user.username.includes(searchParam))
      .map((other_user) => ({
        id: other_user.id,
        username: other_user.username,
        email: other_user.email,
        birthday: other_user.birthday,
        avatar: other_user.avatar,
      }));

    res.status(201).json({
      message: SUCCESS_LIST_USER,
      users: sanitisedUsers,
    });
  } catch (error) {
    res.status(500).json({ message: ERROR_FAILED_TO_LIST_USER, error });
  }
}
