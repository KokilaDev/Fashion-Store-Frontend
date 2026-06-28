"use client"

import { Link, useLocation } from "react-router-dom"
import {
  LayoutDashboard,
  ShirtIcon,
  ShoppingBag,
  Users,
  Settings,
  LogOut,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar"
import { Avatar, AvatarFallback } from "../ui/avatar"

const mainNav = [
  { title: "Dashboard", href: "/admin", icon: LayoutDashboard, isActive: true },
  { title: "Products", href: "/admin/products", icon: ShirtIcon, isActive: false },
  { title: "Orders", href: "/admin/orders", icon: ShoppingBag, isActive: false },
  { title: "Customers", href: "/admin/customers", icon: Users, isActive: false },
//   { title: "Sales Reports", href: "/admin/reports", icon: BarChart3 },
//   { title: "Promotions", href: "/admin/promotions", icon: TicketPercent },
]

const secondaryNav = [
  { title: "Settings", href: "/admin/settings", icon: Settings, isActive: false }
]

export function AppSidebar() {
  const location = useLocation()

  const isActive = (href: string) =>
    href === "/admin" ? location.pathname === "/admin" : location.pathname.startsWith(href)

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-4">
        <Link to="/" className="flex items-center gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-sidebar-primary font-heading text-lg font-bold text-sidebar-primary-foreground">
            A
          </span>
          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <span className="font-heading text-base font-semibold leading-none tracking-wide text-sidebar-foreground">
              AURA Fashion Hub
            </span>
            <span className="text-xs text-sidebar-foreground/60">
              Admin Panel
            </span>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {mainNav.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    isActive={isActive(item.href)}
                    tooltip={item.title}
                    render={<Link to={item.href} />}
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>System</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {secondaryNav.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    isActive={isActive(item.href)}
                    tooltip={item.title}
                    render={<Link to={item.href} />}
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-3">
        <div className="flex items-center gap-3 rounded-lg bg-sidebar-accent/60 p-2 group-data-[collapsible=icon]:bg-transparent group-data-[collapsible=icon]:p-0">
          <Avatar className="size-9">
            <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground">
              K
            </AvatarFallback>
          </Avatar>
          <div className="flex min-w-0 flex-1 flex-col group-data-[collapsible=icon]:hidden">
            <span className="truncate text-sm font-medium text-sidebar-primary-foreground">
              Kokila Dewmini
            </span>
            <span className="truncate text-xs text-sidebar-primary-foreground/60">
              Admin
            </span>
          </div>
          <LogOut 
            className="size-4 text-sidebar-primary-foreground/80 group-data-[collapsible=icon]:hidden"
          />
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
