"use client";

import { AuthWrapper } from "@/components/auth/auth-wrapper";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthWrapper requireAuth={false} redirectTo="/dashboard">
      <main>{children}</main>
    </AuthWrapper>
  );
}
