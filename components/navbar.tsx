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
  return (
    <div className="w-screen fixed left-0 top-0 bg-background border-b border-b-border flex gap-2 p-2 px-6 flex-row items-center">
      Aranda Music and Arts
      <NavigationMenu>
        <NavigationMenuList>
          {menu.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={navigationMenuTriggerStyle()}
            >
              {item.name}
            </Link>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
