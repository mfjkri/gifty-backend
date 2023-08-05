import { Request, Response } from "express";

import User from "../../models/user";
import { UpdateAvatarParams } from "../../params/auth/updateAvatar";
import Avatar from "../../models/avatar";

const SUCCESS_UPDATED_AVATAR = "Avatar updated successfully";

const ERROR_FAILED_TO_UPDATE_AVATAR = "Failed to update avatar";

export default async function handleUpdateAvatar(
  req: Request,
  res: Response,
  params: UpdateAvatarParams
) {
  try {
    const user: User = req.body.user;
    let avatar: Avatar | null = null;

    if (user.avatarId) {
      avatar = await Avatar.findOne({ where: { id: user.avatarId } });
    }

    if (!avatar) {
      avatar = await Avatar.create(params);
      user.avatarId = avatar.id;
      await user.save();
    } else {
      avatar.update(params);
      avatar.save();
    }

    res.status(201).json({ message: SUCCESS_UPDATED_AVATAR, user });
  } catch (error) {
    res.status(500).json({ message: ERROR_FAILED_TO_UPDATE_AVATAR, error });
  }
}
