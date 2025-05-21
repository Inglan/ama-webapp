import { Email } from "@convex-dev/auth/providers/Email";
import { Resend as ResendAPI } from "resend";

const alphabet = (range: string) => {
  if (range === "0-9") return "0123456789";
  return "";
};

const generateRandomString = (length: number, characters: string) => {
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

export const ResendOTP = Email({
  id: "resend-otp",
  apiKey: process.env.AUTH_RESEND_KEY,
  maxAge: 60 * 15, // 15 minutes
  // This function can be asynchronous
  generateVerificationToken() {
    return generateRandomString(6, alphabet("0-9"));
  },
  async sendVerificationRequest({ identifier: email, provider, token }) {
    const resend = new ResendAPI(provider.apiKey);
    const { error } = await resend.emails.send({
      from: "Aranda Music and Arts Program <noreply@arandamusicprogram.org>",
      to: [email],
      subject: `Sign in to AMA portal`,
      text: "Your code is " + token,
    });

    if (error) {
      throw new Error(JSON.stringify(error));
    }
  },
});
