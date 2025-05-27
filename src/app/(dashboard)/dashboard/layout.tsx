import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/app-sidebar";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import { isLoggedIn } from "@/app/_utils/auth-client2";
import { redirect } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "QueryDocs",
  description: "Ask questions from your docs",
};
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const status = await isLoggedIn();
  if (!status) redirect("/auth/login");
  return (
    <html>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SidebarProvider>
          <AppSidebar />
          <SidebarTrigger />

          <main className="w-full">
            <div className="h-screen">{children}</div>
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
}
