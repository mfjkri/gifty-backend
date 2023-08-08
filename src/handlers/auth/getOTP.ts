import { Request, Response } from "express";

import ResetPasswordToken from "../../models/resetPasswordToken";
import User from "../../models/user";
import { sendEmailWithOTP } from "../../utilities/mail";
import { GetOTPParams } from "../../params/auth/getOTP";

const SUCCESS_OTP_GENERATED = "OTP token generated successfully";

const ERROR_USER_NOT_FOUND = "User not found";
const ERROR_FAILED_TO_GENERATE_OTP = "Failed to generate OTP token";

export default async function handleGenerateOTP(
  req: Request,
  res: Response,
  params: GetOTPParams
) {
  try {
    const otp = Math.floor(100000 + Math.random() * 900000);
    const expirationTime = 3600;

    const user = await User.findOne({ where: { email: params.email } });
    if (!user) {
      return res.status(400).json({ message: ERROR_USER_NOT_FOUND });
    }

    let resetPasswordToken = await ResetPasswordToken.findOne({
      where: { userId: user.id },
    });

    if (!resetPasswordToken) {
      resetPasswordToken = await ResetPasswordToken.create({
        userId: user.id,
        otp: otp,
        expirationTime: expirationTime,
      });
    } else {
      resetPasswordToken.otp = otp;
      resetPasswordToken.expirationTime = expirationTime;
      await resetPasswordToken.save();
    }

    await sendEmailWithOTP(user.email, otp);
    res.status(201).json({ message: SUCCESS_OTP_GENERATED });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: ERROR_FAILED_TO_GENERATE_OTP, error });
  }
}
