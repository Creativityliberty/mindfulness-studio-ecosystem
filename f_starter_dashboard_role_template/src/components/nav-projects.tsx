'use client'

import { type LucideIcon } from 'lucide-react'
import { Link, useMatchRoute } from '@tanstack/react-router'

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'

export function NavProjects({
  projects,
}: {
  projects: {
    name: string
    url: string
    icon: LucideIcon
  }[]
}) {
  const matchRoute = useMatchRoute()

  if (projects.length === 0) return null

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Échanges</SidebarGroupLabel>
      <SidebarMenu>
        {projects.map((item) => {
          const isActive = matchRoute({ to: item.url })

          return (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton asChild isActive={!!isActive}>
                <Link to={item.url}>
                  <item.icon />
                  <span>{item.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
