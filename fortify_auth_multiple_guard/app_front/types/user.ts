import type { JsonApiResource } from "./json-api";
import type { Permission } from "./permission";
import type { Role } from "./role";
import type { UserStatus } from "./user-status";

export interface UserAttributes {
  first_name: string | null;
  last_name: string | null;
  email: string;
  status: UserStatus | null;
  role: Role | null;
  permissions: Permission[];
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string; // UUID
  first_name: string | null; // nullable en base
  last_name: string | null;
  email: string;
  status: UserStatus | null;
  role: Role | null;
  permissions: Permission[];
  created_at: string;
  updated_at: string;
}

export type UserResource = JsonApiResource<"users", UserAttributes>;
