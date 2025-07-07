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
  enrollments: defineTable({
    year: v.number(),
    studentId: v.id("students"),
    activityId: v.id("activities"),
    studentYear: v.union(
      v.literal("K"),
      v.literal("1"),
      v.literal("2"),
      v.literal("3"),
      v.literal("4"),
      v.literal("5"),
      v.literal("6"),
      v.literal("7"),
      v.literal("8"),
      v.literal("9"),
      v.literal("10"),
      v.literal("11"),
      v.literal("12"),
    ),
    status: v.union(v.literal("requested"), v.literal("confirmed")),
  }).index("by_student", ["studentId"]),
  activities: defineTable({
    name: v.string(),
    type: v.union(v.literal("individual"), v.literal("group")),
    teacherId: v.id("users"),
  }).index("by_teacher", ["teacherId"]),
});
