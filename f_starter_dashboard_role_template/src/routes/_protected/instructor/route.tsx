import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/instructor')({
  beforeLoad: async ({ context, location }) => {
    if (!context.isInstructor) {
      if (context.isAdmin) {
        throw redirect({ to: '/admin' })
      }
      if (context.isClient) {
        throw redirect({ to: '/client' })
      }
      throw redirect({ to: '/login' })
    }

    if (location.pathname === '/instructor' || location.pathname === '/instructor/') {
      throw redirect({
        to: '/instructor/dashboard' as any,
      })
    }
  },
})
