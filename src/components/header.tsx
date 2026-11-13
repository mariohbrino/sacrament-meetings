"use client";

import { Suspense, useSyncExternalStore } from "react";

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

const emptySubscribe = () => () => {};

const getCurrentDate = () =>
  new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

const getServerDate = () => "";

export default function Header({ wardName }: { wardName: string }) {
  const currentDate: string = useSyncExternalStore(emptySubscribe, getCurrentDate, getServerDate);

  return (
    <header className="border-border bg-secondary sticky top-0 z-50 border-b">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">
        <div className="text-foreground flex flex-col text-xl font-bold">
          <span>{wardName}</span>
          <span className="text-sm font-normal">{currentDate || "\u00A0"}</span>
        </div>
        <div className="flex items-center space-x-4">
          <nav className="space-x-4" aria-label="Main Navigation">
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
