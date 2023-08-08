import nodemailer from "nodemailer";

const EMAIL_USERNAME = "gifty.discover@gmail.com";
const EMAIL_PASSWORD = "PIZpK0gObw7Y21xG";

const transporter = nodemailer.createTransport({
  host: "smtp-relay.sendinblue.com",
  port: 587,
  secure: false,
  auth: {
    user: EMAIL_USERNAME,
    pass: EMAIL_PASSWORD,
  },
});

export async function sendEmailWithOTP(userEmail: string, otp: number) {
  const mailOptions = {
    from: EMAIL_USERNAME,
    to: userEmail,
    subject: "Password Reset OTP",
    text: `Your OTP for resetting the password is: ${otp}`,
  };

  try {
    console.log("sneding", userEmail);
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}
