import type { RouterContext, UserRole } from '@/routes/__root'
import { useAuthStore } from '@/stores/auth-store'

export function useRouterContextState(): RouterContext {
  const { user, isAuthenticated, logout: logoutFromStore } = useAuthStore()

  const role: UserRole = user?.role || null
  const isAdmin = role === 'admin'
  const isClient = role === 'client'
  const isInstructor = role === 'instructor'

  const logout = async () => {
    console.log('🚪 Router context logout triggered')
    await logoutFromStore()
    // Navigation will be handled by the calling component
  }

  return {
    role,
    user,
    logout,
    isAdmin,
    isClient,
    isInstructor,
    isAuthenticated,
  }
}
