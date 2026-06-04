import { api } from '@/lib/api'
import type { LoginCredentials, LoginResponse, User } from '@/types/user'

class AuthService {
  /**
   * Get CSRF cookie from Sanctum before making authenticated requests
   */
  async getCsrfCookie(): Promise<void> {
    console.log('🔐 Getting CSRF cookie...')
   const csrfToken = await api.get('/sanctum/csrf-cookie')
    console.log('csrfToken', csrfToken)
  }

  /**
   * Login user with email and password
   */
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    console.log('🔑 Attempting login for:', credentials.email)

    // Get CSRF cookie first
    await this.getCsrfCookie()

    const response = await api.post<LoginResponse>('/api/login', credentials)
    console.log('✅ Login successful:', {
      user: response.data.user.email,
    })

    return response.data
  }

  /**
   * Logout current user
   */
  async logout(): Promise<void> {
    console.log('🚪 Logging out...')
    await api.post('/api/logout')
    console.log('✅ Logout successful')
  }

  /**
   * Get current authenticated user
   */
  async getCurrentUser(): Promise<User> {
    const response = await api.get<{ user: User }>('/api/user')
    return response.data.user
  }
}

export const authService = new AuthService()
