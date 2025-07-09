import { query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const get = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;
    const contacts = await ctx.db
      .query("contacts")
      .filter((q) => q.eq(q.field("userId"), userId))
      .take(100);

    return contacts.map((contact) => ({
      id: contact._id,
      name: contact.name,
      email: contact.email,
      phoneNumber: contact.phoneNumber,
      altPhoneNumber: contact.altPhoneNumber,
      relationship: contact.relationship,
    }));
  },
});
