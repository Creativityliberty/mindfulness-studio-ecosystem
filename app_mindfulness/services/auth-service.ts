import { api } from "@/lib/api";
import type { LoginCredentials, LoginResponse } from "../types/auth";
import type { User, UserResource } from "../types/user";
import { normalizeUser } from "../normalizers/user-normalizer";

class AuthService {
  /**
   * Get CSRF cookie from Sanctum before making authenticated requests
   */
  async getCsrfCookie(): Promise<void> {
    console.log("🔐 Getting CSRF cookie...");
    await api.get("/sanctum/csrf-cookie");
  }

  /**
   * Login user with email and password
   */
  async login(credentials: LoginCredentials): Promise<{ two_factor: boolean; user: User }> {
    console.log("🔑 Attempting login for:", credentials.email);

    await this.getCsrfCookie();

    const response = await api.post<LoginResponse>("/api/auth/login", credentials);
    const user = normalizeUser(response.data.user.data);

    console.log("✅ Login successful:", {
      user: user.email,
      role: user.role,
    });

    return { two_factor: response.data.two_factor, user };
  }

  /**
   * Logout current user
   */
  async logout(): Promise<void> {
    console.log("🚪 Logging out...");
    await api.post("/api/auth/logout");
    console.log("✅ Logout successful");
  }

  /**
   * Get current authenticated user
   */
  async getCurrentUser(): Promise<User> {
    const response = await api.get<{ user: UserResource }>("/api/auth/me");
    return normalizeUser(response.data.user);
  }
}

export const authService = new AuthService();
