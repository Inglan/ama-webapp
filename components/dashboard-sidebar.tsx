"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarFooter,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { api } from "@/convex/_generated/api";
import { useAuthActions } from "@convex-dev/auth/react";
import { useConvexAuth, useQuery } from "convex/react";
import { Home, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const parentMenuItems: { label: string; href: string }[] = [
  { label: "Students", href: "/dashboard/students" },
  { label: "Emergency Contacts", href: "/dashboard/contacts" },
  { label: "Enroll", href: "/dashboard/enroll" },
  { label: "Enrolled Activities", href: "/dashboard/enrollments" },
];

const tutorMenuItems: { label: string; href: string }[] = [
  { label: "Enrollments", href: "/dashboard/tutor/enrollments" },
  { label: "Activities", href: "/dashboard/tutor/activities" },
  { label: "Profile", href: "/dashboard/tutor/profile" },
];

const adminMenuItems: { label: string; href: string }[] = [
  { label: "Dashboard", href: "/dashboard/admin" },
  { label: "Parents", href: "/dashboard/admin/parents" },
  { label: "Tutors", href: "/dashboard/admin/tutors" },
  { label: "Users", href: "/dashboard/admin/users" },
  { label: "Activities", href: "/dashboard/admin/activities" },
  { label: "Enrollments", href: "/dashboard/admin/enrollments" },
];

export function DashboardSidebar() {
  const pathName = usePathname();
  const userInfo = useQuery(api.userInfo.get);

  const { signOut } = useAuthActions();
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Home className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium">Home</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Parent Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {parentMenuItems.map((item) => {
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      isActive={pathName === item.href}
                      asChild
                    >
                      <Link href={item.href}>{item.label}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Tutor Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {tutorMenuItems.map((item) => {
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      isActive={pathName === item.href}
                      asChild
                    >
                      <Link href={item.href}>{item.label}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Admin</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminMenuItems.map((item) => {
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      isActive={pathName === item.href}
                      asChild
                    >
                      <Link href={item.href}>{item.label}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  {userInfo?.name || userInfo?.email}
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={signOut}>
                  <LogOut /> Logout
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
}
