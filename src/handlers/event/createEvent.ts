import { Request, Response } from "express";

import Event from "../../models/event";
import User from "../../models/user";
import { CreateEventParams } from "../../params/event/createEvent";

const SUCCESS_CREATED_EVENT = "Event created successfully";

const ERROR_FAILED_TO_CREATE_EVENT = "Failed to create event";

export default async function handleCreateEvent(
  req: Request,
  res: Response,
  params: CreateEventParams
) {
  try {
    const user = req.body.user as User;

    const event = await Event.create({
      userId: user.id,
      name: params.name,
      date: new Date(params.date),
      reminder: params.reminder,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    res.status(201).json({ message: SUCCESS_CREATED_EVENT, data: { event } });
  } catch (error) {
    res.status(500).json({ message: ERROR_FAILED_TO_CREATE_EVENT, error });
  }
}
