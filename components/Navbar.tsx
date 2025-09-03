"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { ModeToggle } from "./ModeToggler";
import { BookOpenText } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { name: "Home", href: "/" },
    { name: "Add School", href: "/addSchool" },
  ];

  return (
    <nav className="bg-background border-b shadow-md sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="flex items-center space-x-2">
            <BookOpenText className="h-8 w-8ck text-indigo-600 dark:text-indigo-400" />
            <span className="text-lg font-extrabold text-foreground">
              Schools
            </span>
          </Link>
          <div className="flex space-x-6">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="relative group">
                <span
                  className={`text-gray-700 dark:text-gray-300 font-medium transition-colors duration-200 ${
                    pathname === link.href
                      ? "text-indigo-600 dark:text-indigo-400"
                      : ""
                  }`}
                >
                  {link.name}
                </span>
                <span
                  className={`absolute left-0 -bottom-1 w-0 h-0.5 bg-indigo-600 dark:bg-indigo-400 transition-all duration-300 group-hover:w-full ${
                    pathname === link.href ? "w-full" : ""
                  }`}
                />
              </Link>
            ))}
          </div>
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}
