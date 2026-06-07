import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
} from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import { Link, useNavigate, useRouteContext } from '@tanstack/react-router'
import type { RouterContext } from '@/routes/__root'

export function NavUser() {
  const { isMobile } = useSidebar()
  const context = useRouteContext({ from: '__root__' }) as RouterContext
  const { logout, user, role } = context
  const navigate = useNavigate()

  const handleLogout = async () => {
    console.log('🚪 User initiated logout')
    await logout()
    // Redirect to login page after logout
    navigate({ to: '/login' })
  }

  // Default user data if not available
  const displayUser = {
    name: user?.name || 'Guest',
    email: user?.email || 'guest@example.com',
    avatar: '',
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={displayUser.avatar} alt={displayUser.name} />
                <AvatarFallback className="rounded-lg">
                  {displayUser.name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{displayUser.name}</span>
                <span className="truncate text-xs">{displayUser.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={displayUser.avatar}
                    alt={displayUser.name}
                  />
                  <AvatarFallback className="rounded-lg">
                    {displayUser.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {displayUser.name}
                  </span>
                  <span className="truncate text-xs">{displayUser.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Sparkles />
                Upgrade to Pro
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link 
                  to={
                    role === 'admin' 
                      ? '/admin/profile' 
                      : role === 'instructor' 
                      ? ('/instructor/profile' as any) 
                      : '/client/profile'
                  } 
                  className="cursor-pointer w-full flex items-center gap-2"
                >
                  <BadgeCheck className="size-4" />
                  <span>Mon Profil</span>
                </Link>
              </DropdownMenuItem>
              {role === 'client' && (
                <DropdownMenuItem asChild>
                  <Link to="/client/payment-history" className="cursor-pointer w-full flex items-center gap-2">
                    <CreditCard className="size-4" />
                    <span>Facturation</span>
                  </Link>
                </DropdownMenuItem>
              )}
              {role === 'admin' && (
                <DropdownMenuItem asChild>
                  <Link to="/admin/payments" className="cursor-pointer w-full flex items-center gap-2">
                    <CreditCard className="size-4" />
                    <span>Finances & Ventes</span>
                  </Link>
                </DropdownMenuItem>
              )}
              <DropdownMenuItem asChild>
                <Link 
                  to={
                    role === 'admin' 
                      ? '/admin/notifications' 
                      : role === 'instructor' 
                      ? ('/instructor/notifications' as any) 
                      : '/client/notifications'
                  } 
                  className="cursor-pointer w-full flex items-center gap-2"
                >
                  <Bell className="size-4" />
                  <span>Notifications</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
