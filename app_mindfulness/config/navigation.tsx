import {
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  ShoppingBag,
  BarChart3,
  UserCircle,
  BookOpen,
  CreditCard,
  type LucideIcon,
  Table2,
  Calendar,
  Tags,
} from "lucide-react";
import type { Role } from "../types/role";

export interface NavigationItem {
  title: string;
  url: string;
  icon: LucideIcon;
  isActive?: boolean;
  allowedRoles: Array<Exclude<Role, null>>;
  items?: {
    title: string;
    url: string;
    allowedRoles: Array<Exclude<Role, null>>;
  }[];
}

export interface NavigationProject {
  name: string;
  url: string;
  icon: LucideIcon;
  allowedRoles: Array<Exclude<Role, null>>;
}

// Super Admin Navigation
export const navigationSuperAdmin: NavigationItem[] = [
  {
    title: "Dashboard",
    url: "/super-admin/dashboard",
    icon: LayoutDashboard,
    allowedRoles: ["super-admin"],
  },
  {
    title: "Gestion des categories",
    url: "/super-admin/categories",
    icon: Tags,
    allowedRoles: ["super-admin"],
  },
  {
    title: "Gestion des formations",
    url: "/super-admin/courses",
    icon: BookOpen,
    allowedRoles: ["super-admin"],
  },
  {
    title: "Gestion des modules",
    url: "/super-admin/modules",
    icon: FileText,
    allowedRoles: ["super-admin"],
  },
  {
    title: "Gestion des leçons",
    url: "/super-admin/lessons",
    icon: BookOpen,
    allowedRoles: ["super-admin"],
  },
  {
    title: "Gestion des sessions",
    url: "/super-admin/course-sessions",
    icon: Calendar,
    allowedRoles: ["super-admin"],
  },
  {
    title: "Gestion des inscriptions",
    url: "/super-admin/enrollments",
    icon: Users,
    allowedRoles: ["super-admin"],
  },
  {
    title: "Gestion des utilisateurs",
    url: "/super-admin/users",
    icon: Users,
    allowedRoles: ["super-admin"],
    items: [
      {
        title: "Etudiants",
        url: "/super-admin/users/students",
        allowedRoles: ["super-admin"],
      },
      {
        title: "Equipe Administrative",
        url: "/super-admin/users/team-administration",
        allowedRoles: ["super-admin"],
      },
      {
        title: "Personnel Enseignant",
        url: "/super-admin/users/teachers",
        allowedRoles: ["super-admin"],
      },

      {
        title: "Rôles et permissions",
        url: "/super-admin/users/roles-permissions",
        allowedRoles: ["super-admin"],
      },
    ],
  },

  {
    title: "Configuration système",
    url: "/super-admin/settings",
    icon: Settings,
    allowedRoles: ["super-admin"],
    items: [
      {
        title: "Paramètres généraux",
        url: "/super-admin/settings",
        allowedRoles: ["super-admin"],
      },
      {
        title: "Sécurité",
        url: "/super-admin/settings/security",
        allowedRoles: ["super-admin"],
      },
      {
        title: "Logs système",
        url: "/super-admin/settings/logs",
        allowedRoles: ["super-admin"],
      },
    ],
  },
];

// Admin Navigation
export const navigationAdmin: NavigationItem[] = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: LayoutDashboard,
    allowedRoles: ["admin"],
  },
  {
    title: "Gestion des utilisateurs",
    url: "/admin/users",
    icon: Users,
    allowedRoles: ["admin"],
    items: [
      {
        title: "Etudiants",
        url: "/admin/users/students",
        allowedRoles: ["admin"],
      },
      {
        title: "Ajouter un utilisateur",
        url: "/admin/users/add",
        allowedRoles: ["admin"],
      },
    ],
  },
  {
    title: "Gestion des paiements",
    url: "/admin/payments",
    icon: CreditCard,
    allowedRoles: ["admin"],
    items: [
      {
        title: "Tous les paiements",
        url: "/admin/payments",
        allowedRoles: ["admin"],
      },
      {
        title: "Paiements en attente",
        url: "/admin/payments/pending",
        allowedRoles: ["admin"],
      },
    ],
  },
  {
    title: "Gestion des salles",
    url: "/admin/rooms",
    icon: Table2,
    allowedRoles: ["admin"],
  },
  {
    title: "Gestion des sessions",
    url: "/admin/periods",
    icon: Calendar,
    allowedRoles: ["admin"],
  },
  {
    title: "Gestion des groupes",
    url: "/admin/groups",
    icon: Users,
    allowedRoles: ["admin"],
    items: [
      {
        title: "Tous les groupes",
        url: "/admin/groups",
        allowedRoles: ["admin"],
      },
      {
        title: "Créer un groupe",
        url: "/admin/groups/create",
        allowedRoles: ["admin"],
      },
    ],
  },

  {
    title: "Paramètres",
    url: "/admin/settings",
    icon: Settings,
    allowedRoles: ["admin"],
    items: [
      {
        title: "Général",
        url: "/admin/settings",
        allowedRoles: ["admin"],
      },
      {
        title: "Sécurité",
        url: "/admin/settings/security",
        allowedRoles: ["admin"],
      },
    ],
  },
];

// Teacher Navigation
export const navigationTeacher: NavigationItem[] = [
  {
    title: "Dashboard",
    url: "/teacher",
    icon: LayoutDashboard,
    isActive: true,
    allowedRoles: ["teacher"],
    items: [
      {
        title: "Tableau de bord",
        url: "/teacher/dashboard",
        allowedRoles: ["teacher"],
      },
      {
        title: "Mes statistiques",
        url: "/teacher/stats",
        allowedRoles: ["teacher"],
      },
    ],
  },
  {
    title: "Mes groupes",
    url: "/teacher/groups",
    icon: Users,
    allowedRoles: ["teacher"],
    items: [
      {
        title: "Tous mes groupes",
        url: "/teacher/groups",
        allowedRoles: ["teacher"],
      },
      {
        title: "Emploi du temps",
        url: "/teacher/schedule",
        allowedRoles: ["teacher"],
      },
    ],
  },
  {
    title: "Gestion des cours",
    url: "/teacher/courses",
    icon: BookOpen,
    allowedRoles: ["teacher"],
    items: [
      {
        title: "Mes cours",
        url: "/teacher/courses",
        allowedRoles: ["teacher"],
      },
      {
        title: "Ajouter un cours",
        url: "/teacher/courses/add",
        allowedRoles: ["teacher"],
      },
    ],
  },
  {
    title: "Évaluations",
    url: "/teacher/evaluations",
    icon: FileText,
    allowedRoles: ["teacher"],
    items: [
      {
        title: "Notes des étudiants",
        url: "/teacher/evaluations",
        allowedRoles: ["teacher"],
      },
      {
        title: "Créer une évaluation",
        url: "/teacher/evaluations/create",
        allowedRoles: ["teacher"],
      },
    ],
  },
  {
    title: "Mon profil",
    url: "/teacher/profile",
    icon: UserCircle,
    allowedRoles: ["teacher"],
    items: [
      {
        title: "Paramètres du compte",
        url: "/teacher/profile",
        allowedRoles: ["teacher"],
      },
      {
        title: "Préférences",
        url: "/teacher/profile/preferences",
        allowedRoles: ["teacher"],
      },
    ],
  },
];

// Student Navigation
export const navigationStudent: NavigationItem[] = [
  {
    title: "Dashboard",
    url: "/student/dashboard",
    icon: LayoutDashboard,
    allowedRoles: ["student"],
  },
  {
    title: "Mes Formations",
    url: "/student/courses",
    icon: BookOpen,
    allowedRoles: ["student"],
  },
  {
    title: "Mes notes",
    url: "/student/grades",
    icon: FileText,
    allowedRoles: ["student"],
    items: [
      {
        title: "Relevé de notes",
        url: "/student/grades",
        allowedRoles: ["student"],
      },
      {
        title: "Historique",
        url: "/student/grades/history",
        allowedRoles: ["student"],
      },
    ],
  },
  {
    title: "Paiements",
    url: "/student/payments",
    icon: CreditCard,
    allowedRoles: ["student"],
    items: [
      {
        title: "Historique des paiements",
        url: "/student/payments",
        allowedRoles: ["student"],
      },
      {
        title: "Effectuer un paiement",
        url: "/student/payments/make",
        allowedRoles: ["student"],
      },
    ],
  },
  {
    title: "Mon profil",
    url: "/student/profile",
    icon: UserCircle,
    allowedRoles: ["student"],
    items: [
      {
        title: "Paramètres du compte",
        url: "/student/profile",
        allowedRoles: ["student"],
      },
      {
        title: "Préférences",
        url: "/student/profile/preferences",
        allowedRoles: ["student"],
      },
    ],
  },
];

// Combined navigation for all roles (filtered by role at runtime)
export const navigationMain: NavigationItem[] = [
  // Super Admin items
  ...navigationSuperAdmin,
  // Admin items
  ...navigationAdmin,
  // Teacher items
  ...navigationTeacher,
  // Student items
  ...navigationStudent,
];

export const navigationProjects: NavigationProject[] = [
  {
    name: "Analytiques",
    url: "/analytics",
    icon: BarChart3,
    allowedRoles: ["super-admin", "admin"],
  },
  {
    name: "Gestion des ressources",
    url: "/resources",
    icon: ShoppingBag,
    allowedRoles: ["super-admin", "admin", "teacher"],
  },
  {
    name: "Bibliothèque numérique",
    url: "/library",
    icon: BookOpen,
    allowedRoles: ["super-admin", "admin", "teacher", "student"],
  },
  {
    name: "Messagerie",
    url: "/messages",
    icon: Users,
    allowedRoles: ["super-admin", "admin", "teacher", "student"],
  },
];
