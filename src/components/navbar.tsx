import Link from "next/link";
import { FolderOpen } from "lucide-react";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { ShinyButton } from "@/components/magicui/shiny-button";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full">
      <div className="w-full bg-white/30 backdrop-blur-md border-b border-gray-200/50">
        <div className="w-full max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="bg-blue-500 p-2 rounded-lg">
              <FolderOpen className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">QueryDocs</span>
          </div>

          <div className="flex items-center gap-6">
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
          </div>
        </div>
      </div>
    </nav>
  );
}
