"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import { LoaderCircle } from "lucide-react";
import { useAuthActions } from "@convex-dev/auth/react";
import { Button } from "./ui/button";

const menu = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "About",
    href: "/about",
  },
  {
    name: "Contact",
    href: "/contact",
  },
];

export default function Navbar() {
  const { signOut } = useAuthActions();

  return (
    <div className="w-screen fixed left-0 top-0 bg-background border-b border-b-border flex gap-2 p-2 px-6 flex-row items-center">
      <Link href="/">Aranda Music and Arts</Link>
      <NavigationMenu>
        <NavigationMenuList>
          {menu.map((item) => (
            <NavigationMenuItem key={item.href}>
              <NavigationMenuLink asChild>
                <Link href={item.href}>{item.name}</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
      <div className="grow"></div>
      <NavigationMenu>
        <NavigationMenuList>
          <AuthLoading>
            <LoaderCircle className="w-4 h-4 animate-spin" />
          </AuthLoading>
          <Authenticated>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/dashboard">Dashboard</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink onClick={signOut} className="cursor-pointer">
                Sign Out
              </NavigationMenuLink>
            </NavigationMenuItem>
          </Authenticated>
          <Unauthenticated>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/login">Login</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </Unauthenticated>
          <Button asChild>
            <Link href="/join">Join Now</Link>
          </Button>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
