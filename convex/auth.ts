import { convexAuth } from "@convex-dev/auth/server";
import { ResendOTP } from "./resendotp";
import Google from "@auth/core/providers/google";

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [ResendOTP, Google],
  callbacks: {
    async afterUserCreatedOrUpdated(ctx, args) {
      if (args.existingUserId) return;

      await ctx.db.patch(args.userId, {
        role: "parent",
      });
    },
  },
});
