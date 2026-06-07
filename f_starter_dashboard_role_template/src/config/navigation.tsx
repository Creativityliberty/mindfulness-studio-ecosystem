import {
  LayoutDashboard,
  BookOpen,
  CreditCard,
  MessageSquare,
  Award,
  TrendingUp,
  PlayCircle,
  Bell,
  User,
  BarChart2,
  type LucideIcon,
} from 'lucide-react'
import type { UserRole } from '@/routes/__root'

export interface NavigationItem {
  title: string
  url: string
  icon: LucideIcon
  isActive?: boolean
  allowedRoles: Array<Exclude<UserRole, null>>
  items?: {
    title: string
    url: string
    allowedRoles: Array<Exclude<UserRole, null>>
  }[]
}

export interface NavigationProject {
  name: string
  url: string
  icon: LucideIcon
  allowedRoles: Array<Exclude<UserRole, null>>
}

export const navigationMain: NavigationItem[] = [
  // Admin Main Section
  {
    title: 'Dashboard Admin',
    url: '/admin/dashboard',
    icon: LayoutDashboard,
    allowedRoles: ['admin'],
    items: [
      {
        title: "Vue d'ensemble",
        url: '/admin/dashboard',
        allowedRoles: ['admin'],
      },
    ],
  },
  {
    title: 'Gestion des Cours',
    url: '/admin/courses',
    icon: BookOpen,
    allowedRoles: ['admin'],
    items: [
      {
        title: 'Tous les cours',
        url: '/admin/courses',
        allowedRoles: ['admin'],
      },
    ],
  },
  {
    title: 'Gestion Formateurs',
    url: '/admin/instructors',
    icon: User,
    allowedRoles: ['admin'],
  },
  {
    title: 'Finances & Ventes',
    url: '/admin/payments',
    icon: CreditCard,
    allowedRoles: ['admin'],
  },
  {
    title: 'Notifications',
    url: '/admin/notifications',
    icon: Bell,
    allowedRoles: ['admin'],
  },
  {
    title: 'Mon Profil',
    url: '/admin/profile',
    icon: User,
    allowedRoles: ['admin'],
  },

  // Client (Student) Main Section - Flattened & Direct Links
  {
    title: 'Tableau de bord',
    url: '/client/dashboard',
    icon: LayoutDashboard,
    allowedRoles: ['client'],
  },
  {
    title: 'Catalogue',
    url: '/client/catalog',
    icon: BookOpen,
    allowedRoles: ['client'],
  },
  {
    title: 'Mes formations',
    url: '/client/dashboard',
    icon: PlayCircle,
    allowedRoles: ['client'],
  },
  {
    title: 'Progression',
    url: '/client/dashboard',
    icon: TrendingUp,
    allowedRoles: ['client'],
  },
  {
    title: 'Certificats',
    url: '/client/certificates',
    icon: Award,
    allowedRoles: ['client'],
  },
  {
    title: 'Historique',
    url: '/client/payment-history',
    icon: CreditCard,
    allowedRoles: ['client'],
  },
  {
    title: 'Messages',
    url: '/client/messaging',
    icon: MessageSquare,
    allowedRoles: ['client'],
  },
  {
    title: 'Notifications',
    url: '/client/notifications',
    icon: Bell,
    allowedRoles: ['client'],
  },
  {
    title: 'Mon Profil',
    url: '/client/profile',
    icon: User,
    allowedRoles: ['client'],
  },

  // Instructor Main Section
  {
    title: 'Tableau de bord',
    url: '/instructor/dashboard',
    icon: LayoutDashboard,
    allowedRoles: ['instructor'],
  },
  {
    title: 'Mes Formations',
    url: '/instructor/courses',
    icon: BookOpen,
    allowedRoles: ['instructor'],
  },
  {
    title: 'Revenus & Statistiques',
    url: '/instructor/dashboard',
    icon: BarChart2,
    allowedRoles: ['instructor'],
  },
  {
    title: 'Messages',
    url: '/instructor/dashboard',
    icon: MessageSquare,
    allowedRoles: ['instructor'],
  },
  {
    title: 'Notifications',
    url: '/instructor/notifications',
    icon: Bell,
    allowedRoles: ['instructor'],
  },
  {
    title: 'Mon Profil',
    url: '/instructor/profile',
    icon: User,
    allowedRoles: ['instructor'],
  },
]

export const navigationProjects: NavigationProject[] = []

