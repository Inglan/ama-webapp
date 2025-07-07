import { convexAuth } from "@convex-dev/auth/server";
import { ResendOTP } from "./resendotp";

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [ResendOTP],
});
