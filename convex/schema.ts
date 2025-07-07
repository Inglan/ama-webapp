import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

export default defineSchema({
  ...authTables,
  users: defineTable({
    name: v.optional(v.string()),
    image: v.optional(v.string()),
    email: v.optional(v.string()),
    emailVerificationTime: v.optional(v.float64()),
    role: v.optional(
      v.union(v.literal("admin"), v.literal("parent"), v.literal("teacher")),
    ),
  }).index("email", ["email"]),
  contacts: defineTable({
    userId: v.id("users"),
    name: v.string(),
    phoneNumber: v.string(),
    altPhoneNumber: v.optional(v.string()),
    email: v.string(),
    relationship: v.string(),
  }),
  students: defineTable({
    name: v.string(),
    parentId: v.id("users"),
    dob: v.object({
      day: v.number(),
      month: v.number(),
      year: v.number(),
    }),
    studentId: v.string(),
    notes: v.string(),
  }).index("by_parent", ["parentId"]),
});
