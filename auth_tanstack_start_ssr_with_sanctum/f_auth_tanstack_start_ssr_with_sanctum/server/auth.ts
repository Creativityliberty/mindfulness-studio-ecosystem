import { createServerFn } from '@tanstack/react-start'
import { redirect } from '@tanstack/react-router'
import { api, createAuthenticatedApi } from '@/lib/api'
import { useAppSession } from 'utils/session'

// --- LOGIN ---
export const loginFn = createServerFn({ method: 'POST' })
  .inputValidator((data: { email: string; password: string }) => data)
  .handler(async ({ data }) => {
    try {
      // Appel API login (pas besoin de CSRF avec les tokens)
      const { data: response } = await api.post('/api/v1/login', data)

      // Stocker dans la session TanStack
      const session = await useAppSession()
      await session.update({
        userId: response.user.id,
        email: response.user.email,
        name: response.user.name,
        token: response.token,
      })

      throw redirect({ to: '/dashboard' })
    } catch (error: any) {
      // Propager les redirections
      if (error instanceof Response) {
        throw error
      }

      return {
        error:
          error?.response?.data?.message ??
          error?.message ??
          'Authentication failed',
      }
    }
  })

// --- LOGOUT ---
export const logoutFn = createServerFn({ method: 'POST' }).handler(async () => {
  const session = await useAppSession()
  const token = session.data?.token

  // Logout côté Laravel (révoquer le token)
  if (token) {
    try {
      const authApi = createAuthenticatedApi(token)
      await authApi.post('/api/v1/logout')
    } catch {
      // Ignorer les erreurs (token peut être déjà invalide)
    }
  }

  // Clear la session TanStack
  await session.clear()

  throw redirect({ to: '/login' })
})

// --- CURRENT USER ---
export const getCurrentUserFn = createServerFn({ method: 'GET' }).handler(
  async () => {
    const session = await useAppSession()
    const { userId, email, name, token } = session.data ?? {}

    if (!userId || !token) {
      return null
    }

    return { id: userId, email, name }
  },
)

// --- GET USERS (protected route) ---
export const getUsersFn = createServerFn({ method: 'GET' }).handler(async () => {
  const session = await useAppSession()
  const token = session.data?.token

  if (!token) {
    throw new Error('Not authenticated')
  }

  const authApi = createAuthenticatedApi(token)
  const { data } = await authApi.get('/api/users')

  return data.users
})
