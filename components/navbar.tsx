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
import { LoaderCircle, Menu } from "lucide-react";
import { useAuthActions } from "@convex-dev/auth/react";
import { Button, buttonVariants } from "./ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useState } from "react";
import { toast } from "sonner";

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
  let [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="w-screen fixed left-0 top-0 bg-background border-b border-b-border flex gap-2 p-2 px-6 flex-row items-center z-20">
      <Link href="/">Aranda Music and Arts</Link>
      <NavigationMenu className="md:block hidden">
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
      <NavigationMenu className="md:block hidden">
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
              <NavigationMenuLink
                onClick={() => {
                  toast.success("Signed out successfully");
                  signOut();
                }}
                className="cursor-pointer"
              >
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
      <Drawer
        direction="right"
        open={mobileMenuOpen}
        onOpenChange={setMobileMenuOpen}
      >
        <DrawerTrigger
          className={buttonVariants({
            variant: "outline",
            size: "icon",
            className: "md:hidden",
          })}
        >
          <Menu />
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Aranda Music and Arts</DrawerTitle>
          </DrawerHeader>
          <div className="flex flex-col gap-3 px-3">
            {menu.map((item) => (
              <Button
                variant="ghost"
                key={item.href}
                className="justify-start"
                asChild
              >
                <Link onClick={() => setMobileMenuOpen(false)} href={item.href}>
                  {item.name}
                </Link>
              </Button>
            ))}

            <AuthLoading>
              <LoaderCircle className="w-4 h-4 animate-spin" />
            </AuthLoading>
            <Authenticated>
              <Button variant="ghost" className="justify-start" asChild>
                <Link
                  onClick={() => setMobileMenuOpen(false)}
                  href="/dashboard"
                >
                  Dashboard
                </Link>
              </Button>
              <Button
                onClick={() => {
                  signOut();
                  setMobileMenuOpen(false);
                }}
                variant="outline"
                className="cursor-pointer"
              >
                Sign Out
              </Button>
            </Authenticated>
            <Unauthenticated>
              <Button variant="outline" asChild>
                <Link onClick={() => setMobileMenuOpen(false)} href="/login">
                  Login
                </Link>
              </Button>
            </Unauthenticated>
            <Button variant="default" asChild>
              <Link onClick={() => setMobileMenuOpen(false)} href="/join">
                Join Now
              </Link>
            </Button>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
