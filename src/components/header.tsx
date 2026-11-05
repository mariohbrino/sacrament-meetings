"use client";

import { Suspense } from "react";

import NavLink from "@/components/nav-link";
import { ThemeToggle } from "@/components/theme-toggle";

type NavLink = {
  href: string;
  label: string;
};

const navLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/meetings", label: "Meetings" },
];

export default function Header() {
  return (
    <header className="border-border bg-secondary sticky top-0 z-50 border-b">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">
        <div className="text-foreground text-xl font-bold">Sacrament Meeting</div>
        <div className="flex items-center space-x-4">
          <nav className="space-x-4">
            <ul className="flex space-x-4">
              <Suspense fallback={<li>Loading...</li>}>
                {navLinks.map(({ href, label }, index) => (
                  <li key={index}>
                    <NavLink
                      href={href}
                      activeStyle="font-bold"
                      className="text-foreground hover:text-muted-foreground"
                    >
                      {label}
                    </NavLink>
                  </li>
                ))}
              </Suspense>
            </ul>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
