import NavLink from "@/components/nav-link";
import { Suspense } from "react";

type NavLink = {
  href: string;
  label: string;
};

const navLinks: NavLink[] = [
  { href: "/meetings", label: "Meetings" },
  { href: "/meetings/current", label: "Current Sunday" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex flex-1 flex-col">
      <div className="mx-auto my-3 flex w-full max-w-7xl flex-1 flex-col md:my-12 md:flex-row">
        <nav className="md:border-border w-full shrink-0 p-6 md:w-56 md:border-r" aria-label="Meetings Navigation">
          <ul className="flex gap-3 md:flex-col">
            <Suspense fallback={<div>Loading...</div>}>
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <NavLink href={href} activeStyle="font-bold">
                    {label}
                  </NavLink>
                </li>
              ))}
            </Suspense>
          </ul>
        </nav>
        <div className="flex-1">{children}</div>
      </div>
    </section>
  );
}
