import { Request, Response } from "express";

import Event from "../../models/event";
import User from "../../models/user";
import { UpdateEventParams } from "../../params/event/updateEvent";

const SUCCESS_UPDATE_EVENT = "Updated event successfully";

const ERROR_EVENT_DOES_NOT_EXIST = "Event does not exist";
const ERROR_MISSING_PERMISSIONS = "Missing permissions";
const ERROR_FAILED_TO_UPDATE_EVENT = "Failed to update event";

export default async function handleUpdateEvent(
  req: Request,
  res: Response,
  params: UpdateEventParams
) {
  try {
    const user: User = req.body.user;
    const event = await Event.findOne({ where: { id: params.id } });

    if (!event) {
      return res.status(400).json({ message: ERROR_EVENT_DOES_NOT_EXIST });
    }
    if (event.userId !== user.id) {
      return res.status(400).json({ message: ERROR_MISSING_PERMISSIONS });
    }

    if (params.name) {
      event.name = params.name;
    }
    if (params.date) {
      event.date = new Date(params.date);
    }
    if (params.reminder) {
      event.reminder = params.reminder;
    }
    await event.save();

    res.status(201).json({ message: SUCCESS_UPDATE_EVENT, data: { event } });
  } catch (error) {
    res.status(500).json({ message: ERROR_FAILED_TO_UPDATE_EVENT, error });
  }
}
