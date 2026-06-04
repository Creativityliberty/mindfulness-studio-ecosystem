import { useAuthStore } from "../stores/auth-store";
import type { Role } from "../types/role";

export function getCurrentRole(): Role | null {
  return useAuthStore.getState().user?.role ?? null;
}

export function isSuperAdmin(): boolean {
  return getCurrentRole() === "super_admin";
}

export function isAdmin(): boolean {
  return getCurrentRole() === "admin";
}
