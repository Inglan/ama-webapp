import { query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const get = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;
    const user = await ctx.db.get(userId);
    if (!user) return null;
    return {
      role: user.role,
      email: user.email,
      id: userId,
      name: user.name,
      doneOnboarding: user.doneOnboarding || false,
    };
  },
});
