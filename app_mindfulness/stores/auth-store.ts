// stores/auth-store.ts
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { isAxiosError } from "axios";
import type { User } from "types/user";
import { toApiError, type ApiError } from "types/json-api";
import type { LoginCredentials } from "types/auth";
import { authService } from "services/auth-service";

// ─── State ───────────────────────────────────────────────────

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: ApiError | null;
}

// ─── Actions ─────────────────────────────────────────────────

interface AuthActions {
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  fetchUser: () => Promise<void>;
  clearError: () => void;
  setUser: (user: User | null) => void;
}

export type AuthStore = AuthState & AuthActions;

// ─── Initial state ───────────────────────────────────────────

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

// ─── Store ───────────────────────────────────────────────────

export const useAuthStore = create<AuthStore>()(
  devtools(
    (set) => ({
      ...initialState,

      fetchUser: async (): Promise<void> => {
        set({ loading: true, error: null });

        try {
          const user = await authService.getCurrentUser();
          set({ user, isAuthenticated: true, loading: false });
        } catch {
          // Pas d'user connecté — état propre, pas d'erreur
          set({ ...initialState, loading: false });
        }
      },

      login: async (credentials: LoginCredentials): Promise<void> => {
        set({ loading: true, error: null });

        try {
          const { user } = await authService.login(credentials);
          set({ user, isAuthenticated: true, loading: false, error: null });
        } catch (err) {
          if (!isAxiosError(err)) throw err;

          set({
            ...initialState,
            loading: false,
            error: toApiError(err),
          });
        }
      },

      logout: async (): Promise<void> => {
        set({ loading: true });

        try {
          await authService.logout();
        } finally {
          // Force le logout côté client même si l'API échoue
          set({ ...initialState });
        }
      },

      clearError: (): void => set({ error: null }),

      setUser: (user: User | null): void =>
        set({ user, isAuthenticated: !!user }),
    }),
    { name: "auth-store" },
  ),
);
