import { Id } from "../_generated/dataModel";
import { MutationCtx, QueryCtx } from "../_generated/server";

export const VALID_ROLES = {
  PARENT: "parent",
  TEACHER: "teacher",
  ADMIN: "admin",
  SUPERADMIN: "superadmin",
};

export async function getRole(
  ctx: QueryCtx | MutationCtx,
  userId: Id<"users">,
) {
  const user = await ctx.db.get(userId);
  if (!user || !user.role) return false;
  return user.role;
}
