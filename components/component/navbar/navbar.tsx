"use client";

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation/navigation-menu"; // Update this path

import { LogOutButton } from "../auth/auth";

import Link from "next/link";

export default function Navbar() {
  return (
    <div className="flex justify-end bg-indigo-500 p-4">
      <ul className="flex space-x-4">
        <li>
          <Link className="text-white" href="/folders">
            Notes
          </Link>
        </li>
        <li>
          <Link className="text-white" href="/register">
            Register
          </Link>
        </li>
        <li>
          <Link className="text-white" href="/api/auth/signin">
            Login
          </Link>
        </li>

        <li>
          <LogOutButton />
        </li>
      </ul>
    </div>
  );
}
