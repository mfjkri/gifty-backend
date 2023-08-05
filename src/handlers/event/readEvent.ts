import { Request, Response } from "express";

import Event from "../../models/event";
import User from "../../models/user";
import { ReadEventParams } from "../../params/event/readEvent";

const SUCCESS_READ_EVENT = "Event read successfully";

const ERROR_EVENT_DOES_NOT_EXIST = "Event does not exist";
const ERROR_MISSING_PERMISSIONS = "Missing permissions";
const ERROR_FAILED_TO_READ_EVENT = "Failed to read event";

export default async function handleReadEvent(
  req: Request,
  res: Response,
  params: ReadEventParams
) {
  try {
    const user = req.body.user as User;
    const event = await Event.findOne({ where: { id: req.params.id } });

    if (!event) {
      return res.status(400).json({ message: ERROR_EVENT_DOES_NOT_EXIST });
    }
    if (event.userId !== user.id) {
      return res.status(400).json({ message: ERROR_MISSING_PERMISSIONS });
    }

    res.status(201).json({ message: SUCCESS_READ_EVENT, data: { event } });
  } catch (error) {
    res.status(500).json({ message: ERROR_FAILED_TO_READ_EVENT, error });
  }
}
