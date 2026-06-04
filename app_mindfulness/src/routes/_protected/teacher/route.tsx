import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/teacher')({
  beforeLoad: async ({ context, location }) => {
    if (context.role !== 'teacher') {
      if (context.role === 'super_admin') throw redirect({ to: '/super-admin/dashboard' })
      if (context.role === 'admin') throw redirect({ to: '/admin/dashboard' })
      if (context.role === 'student') throw redirect({ to: '/student/dashboard' })
      throw redirect({ to: '/login' })
    }

    if (location.pathname === '/teacher' || location.pathname === '/teacher/') {
      throw redirect({ to: '/teacher/dashboard' })
    }
  },
})
