"use client";

import Link from "next/link";
import { FolderOpen, User, LogOut, Settings } from "lucide-react";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { ShinyButton } from "@/components/magicui/shiny-button";
import { useAuth, useAuthActions } from "@/lib/store/authStore";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const { isAuthenticated, user } = useAuth();
  const { logout } = useAuthActions();
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = async () => {
    await logout();
    toast.success('Logged out successfully', {
      description: 'See you next time!',
      duration: 3000
    });
    router.push('/');
    setShowDropdown(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full">
      <div className="w-full bg-white/30 backdrop-blur-md border-b border-gray-200/50">
        <div className="w-full max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="bg-blue-500 p-2 rounded-lg">
              <FolderOpen className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">QueryDocs</span>
          </Link>

          <div className="flex items-center gap-6">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/50 backdrop-blur-sm border border-gray-200/50 hover:bg-white/70 transition-all duration-200 shadow-sm"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {user?.name || 'User'}
                  </span>
                </button>

                {showDropdown && (
                  <>
                    <div 
                      className="fixed inset-0 z-10" 
                      onClick={() => setShowDropdown(false)}
                    />
                    <div className="absolute right-0 mt-2 w-48 bg-white/90 backdrop-blur-md rounded-xl shadow-xl border border-gray-200/50 z-20 overflow-hidden">
                      <div className="p-3 border-b border-gray-200/50">
                        <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                        <p className="text-xs text-gray-600">{user?.email}</p>
                      </div>
                      
                      <div className="py-2">
                        <Link
                          href="/dashboard"
                          className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50/50 transition-colors"
                          onClick={() => setShowDropdown(false)}
                        >
                          <Settings className="w-4 h-4" />
                          Dashboard
                        </Link>
                        
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50/50 transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          Logout
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <>
                <Link href="/auth/login">
                  <ShinyButton className="rounded-full px-6 py-2.5 text-sm font-medium">  
                    Login
                  </ShinyButton> 
                </Link>

                <Link href="/auth/register">
                  <ShimmerButton className="rounded-full px-6 py-2.5 text-sm font-medium">
                    SIGN UP
                  </ShimmerButton>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
