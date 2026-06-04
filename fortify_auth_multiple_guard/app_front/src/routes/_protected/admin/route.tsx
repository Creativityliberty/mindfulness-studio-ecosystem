import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/admin')({
  beforeLoad: async ({ context, location }) => {
    if (context.role !== 'admin') {
      if (context.role === 'super_admin') throw redirect({ to: '/super-admin/dashboard' })
      if (context.role === 'teacher') throw redirect({ to: '/teacher/dashboard' })
      if (context.role === 'student') throw redirect({ to: '/student/dashboard' })
      throw redirect({ to: '/login' })
    }

    if (location.pathname === '/admin' || location.pathname === '/admin/') {
      throw redirect({ to: '/admin/dashboard' })
    }
  },
})
