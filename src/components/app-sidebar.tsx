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
        <NavUser user={{ name: "Kartik Singh", email: "kartik@gmail.com" }} />
      </SidebarFooter>
    </Sidebar>
  );
}
