import {
  LayoutDashboard,
  Settings,
  ShoppingBag,
  BarChart3,
  UserCircle,
  type LucideIcon,
  // Flag,
  Coins,
} from 'lucide-react'

export interface NavigationItem {
  title: string
  url: string
  icon: LucideIcon
  isActive?: boolean
  items?: {
    title: string
    url: string
  }[]
}

export interface NavigationProject {
  name: string
  url: string
  icon: LucideIcon
}

export const navigationMain: NavigationItem[] = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: LayoutDashboard,
    isActive: true,
  },
  // {
  //   title: 'Gestion des pays',
  //   url: '/dashboard/countries',
  //   icon: Flag,
  // },
  {
    title: 'Mes Tontines',
    url: '/dashboard/tontines',
    icon: Coins,
  },
  {
    title: 'Mon profil',
    url: '/profile',
    icon: UserCircle,
  },
  {
    title: 'Paramètres',
    url: '/settings',
    icon: Settings,
    items: [
      {
        title: 'Général',
        url: '/settings',
      },
      {
        title: 'Sécurité',
        url: '/settings/security',
      },
      {
        title: 'Notifications',
        url: '/settings/notifications',
      },
    ],
  },
]

export const navigationProjects: NavigationProject[] = [
  {
    name: 'Analytiques',
    url: '/analytics',
    icon: BarChart3,
  },
  {
    name: 'Mes activités',
    url: '/activities',
    icon: ShoppingBag,
  },
]
