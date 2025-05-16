import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/app-sidebar";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full mr-16">
        <SidebarTrigger />
        <div className="mx-16">{children}</div>
      </main>
    </SidebarProvider>
  );
}
