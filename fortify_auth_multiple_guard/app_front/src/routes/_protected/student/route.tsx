import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/student')({
  beforeLoad: async ({ context, location }) => {
    if (context.role !== 'student') {
      if (context.role === 'super_admin') throw redirect({ to: '/super-admin/dashboard' })
      if (context.role === 'admin') throw redirect({ to: '/admin/dashboard' })
      if (context.role === 'teacher') throw redirect({ to: '/teacher/dashboard' })
      throw redirect({ to: '/login' })
    }

    if (location.pathname === '/student' || location.pathname === '/student/') {
      throw redirect({ to: '/student/dashboard' })
    }
  },
})
