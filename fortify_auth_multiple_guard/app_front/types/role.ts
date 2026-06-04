// types/role.ts
import { PERMISSIONS, type Permission } from "./permission";

export const ADMIN_ROLES = ["super-admin", "admin"] as const;
export const WEB_ROLES = ["teacher", "student"] as const;
export const ROLES = [...ADMIN_ROLES, ...WEB_ROLES] as const;

export type AdminRole = (typeof ADMIN_ROLES)[number];
export type WebRole = (typeof WEB_ROLES)[number];
export type Role = AdminRole | WebRole;

// ─── Permissions par rôle ─────────────────────────────────────

export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  "super-admin": [...PERMISSIONS],

  admin: [
    "view_centers",
    "create_centers",
    "update_centers",
    "view_users",
    "create_users",
    "update_users",
    "delete_users",
    "view_levels",
    "create_levels",
    "update_levels",
    "delete_levels",
    "view_sub_levels",
    "create_sub_levels",
    "update_sub_levels",
    "delete_sub_levels",
    "view_groups",
    "create_groups",
    "update_groups",
    "delete_groups",
    "view_enrollments",
    "create_enrollments",
    "update_enrollments",
    "delete_enrollments",
    "view_payments",
    "create_payments",
    "update_payments",
    "view_schedules",
    "create_schedules",
    "update_schedules",
    "delete_schedules",
    "view_sessions",
    "create_sessions",
    "update_sessions",
    "delete_sessions",
  ],

  teacher: [
    "view_groups",
    "view_enrollments",
    "view_schedules",
    "view_sessions",
  ],

  student: [
    "view_groups",
    "view_enrollments",
    "view_payments",
    "view_schedules",
  ],
};

// ─── Helpers ──────────────────────────────────────────────────

export const isAdminRole = (role: Role): role is AdminRole =>
  (ADMIN_ROLES as readonly string[]).includes(role);

export const isWebRole = (role: Role): role is WebRole =>
  (WEB_ROLES as readonly string[]).includes(role);
