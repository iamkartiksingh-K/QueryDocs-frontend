import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import { redirect } from "next/navigation";
import { isLoggedIn } from "@/app/_utils/auth-client2";

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
export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const status = await isLoggedIn();
  if (status) redirect("/dashboard");

  return (
    <html>
      <head></head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <main>{children}</main>
      </body>
    </html>
  );
}
