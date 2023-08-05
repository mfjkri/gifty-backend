import { Request, Response } from "express";

import Event from "../../models/event";
import User from "../../models/user";
import { DeleteEventParams } from "../../params/event/deleteEvent";

const SUCCESS_DELETED_EVENT = "Event deleted successfully";

const ERROR_EVENT_DOES_NOT_EXIST = "Event does not exist";
const ERROR_MISSING_PERMISSIONS = "Missing permissions";
const ERROR_FAILED_TO_DELETE_EVENT = "Failed to delete event";

export default async function handleDeleteEvent(
  req: Request,
  res: Response,
  params: DeleteEventParams
) {
  try {
    const user = req.body.user as User;
    const event = await Event.findOne({ where: { id: params.id } });

    if (!event) {
      return res.status(400).json({ message: ERROR_EVENT_DOES_NOT_EXIST });
    }
    if (event.userId !== user.id) {
      return res.status(400).json({ message: ERROR_MISSING_PERMISSIONS });
    }
    await event.destroy();

    res.status(201).json({ message: SUCCESS_DELETED_EVENT, data: { event } });
  } catch (error) {
    res.status(500).json({ message: ERROR_FAILED_TO_DELETE_EVENT, error });
  }
}
