import { Request, Response } from "express";

import Event from "../../models/event";
import User from "../../models/user";
import { ListEventParams } from "../../params/event/listEvent";

const SUCCESS_LIST_EVENT = "Listed events successfully";

const ERROR_FAILED_TO_LIST_EVENT = "Failed to list event";

export default async function handleListEvent(
  req: Request,
  res: Response,
  params: ListEventParams
) {
  try {
    const user: User = req.body.user;
    const events = await Event.findAll({ where: { userId: user.id } });

    res.status(201).json({ message: SUCCESS_LIST_EVENT, data: { events } });
  } catch (error) {
    res.status(500).json({ message: ERROR_FAILED_TO_LIST_EVENT, error });
  }
}
