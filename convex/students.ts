import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const get = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;
    const students = await ctx.db
      .query("students")
      .filter((q) => q.eq(q.field("parentId"), userId))
      .take(100);

    return students.map((student) => ({
      id: student._id,
      name: student.name,
      parentId: student.parentId,
      dob: student.dob,
      studentId: student.studentId,
      notes: student.notes,
    }));
  },
});

export const add = mutation({
  args: {
    name: v.string(),
    dob: v.object({
      day: v.number(),
      month: v.number(),
      year: v.number(),
    }),
    studentId: v.string(),
    notes: v.string(),
  },
  handler: async (ctx, { name, dob, studentId, notes }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");

    await ctx.db.insert("students", {
      parentId: userId,
      name,
      dob,
      studentId,
      notes,
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("students"),
    name: v.string(),
    dob: v.object({
      day: v.number(),
      month: v.number(),
      year: v.number(),
    }),
    studentId: v.string(),
    notes: v.string(),
  },
  handler: async (ctx, { id, name, dob, studentId, notes }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");

    await ctx.db.patch(id, {
      name,
      dob,
      studentId,
      notes,
    });
  },
});

export const remove = mutation({
  args: {
    id: v.id("students"),
  },
  handler: async (ctx, { id }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");

    await ctx.db.delete(id);
  },
});