import { query } from "./_generated/server";
import { getRole } from "./lib/roles";
import { getAuthUserId } from "@convex-dev/auth/server";

export const get = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return false;
    return getRole(ctx, userId);
  },
});
