import { Request, Response } from "express";

import Event from "../../models/event";
import User from "../../models/user";
import { ListReminderParams } from "../../params/event/listReminder";
import { Op } from "sequelize";

const SUCCESS_LIST_REMINDER = "Listed reminders successfully";

const ERROR_FAILED_TO_LIST_REMINDER = "Failed to list reminder";

export default async function handleListReminder(
  req: Request,
  res: Response,
  params: ListReminderParams
) {
  try {
    const user: User = req.body.user;
    const events = await Event.findAll({
      where: {
        userId: user.id,
        reminder: true,
        date: {
          [Op.gte]: new Date(),
        },
      },
    });

    res.status(201).json({ message: SUCCESS_LIST_REMINDER, events });
  } catch (error) {
    res.status(500).json({ message: ERROR_FAILED_TO_LIST_REMINDER, error });
  }
}
