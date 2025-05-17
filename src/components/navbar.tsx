"use client";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Image from "next/image";
import Link from "next/link";
export default function Navbar() {
  return (
    <NavigationMenu className="!max-w-dvw p-3">
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/" passHref>
            <Image
              src={"/query-docs.png"}
              alt="logo"
              width={160}
              height={160}
            />
          </Link>
        </NavigationMenuItem>
        <div className="md:w-sm lg:w-2xl"></div>
        <NavigationMenuItem className="mx-4">
          <Link
            href="/auth/login"
            className="border px-3 py-2 text-sm font-medium rounded-md"
          >
            Login
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/auth/register">Sign up</Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
