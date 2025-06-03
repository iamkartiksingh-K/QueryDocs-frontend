"use client";
import { MessageCircle, Layers } from "lucide-react";

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
} from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";
import { NavUser } from "./nav-user";
import { useUserStore } from "@/lib/store/userStore";
import { useEffect } from "react";
// Menu items.
const items = [
  {
    title: "Chat",
    url: "/dashboard/chat",
    icon: MessageCircle,
  },
  {
    title: "Docs",
    url: "/dashboard/docs",
    icon: Layers,
  },
];

export default function AppSidebar() {
  const { setUser, user } = useUserStore();
  useEffect(() => {
    fetch("/api/profile")
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        setUser(data);
      });
  }, []);
  return (
    <Sidebar>
      <SidebarHeader className="pl-5 pt-5">
        <Image
          src={"/query-docs.png"}
          width={"160"}
          height={"160"}
          alt="logo"
        />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={{ name: user?.name, email: user?.email }} />
      </SidebarFooter>
    </Sidebar>
  );
}
