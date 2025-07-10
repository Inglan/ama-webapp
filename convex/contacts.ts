import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
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

export const add = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    phoneNumber: v.string(),
    altPhoneNumber: v.string(),
    relationship: v.string(),
  },
  handler: async (
    ctx,
    { name, email, phoneNumber, altPhoneNumber, relationship },
  ) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");

    await ctx.db.insert("contacts", {
      userId,
      name,
      email,
      phoneNumber,
      altPhoneNumber,
      relationship,
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("contacts"),
    name: v.string(),
    email: v.string(),
    phoneNumber: v.string(),
    altPhoneNumber: v.optional(v.string()),
    relationship: v.string(),
  },
  handler: async (
    ctx,
    { id, name, email, phoneNumber, altPhoneNumber, relationship },
  ) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");

    await ctx.db.patch(id, {
      name,
      email,
      phoneNumber,
      altPhoneNumber,
      relationship,
    });
  },
});

export const remove = mutation({
  args: {
    id: v.id("contacts"),
  },
  handler: async (ctx, { id }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");

    await ctx.db.delete(id);
  },
});
