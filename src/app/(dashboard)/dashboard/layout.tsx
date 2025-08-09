"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/app-sidebar";
import { AuthWrapper } from "@/components/auth/auth-wrapper";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthWrapper requireAuth={true}>
      <SidebarProvider>
        <AppSidebar />
        <SidebarTrigger />
        <main className="w-full">
          <div className="h-screen">{children}</div>
        </main>
      </SidebarProvider>
    </AuthWrapper>
  );
}
