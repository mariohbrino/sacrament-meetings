"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({
  href,
  activeStyle,
  className,
  children,
}: {
  href: string;
  activeStyle: string;
  className?: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      className={clsx(pathname === href && activeStyle, className)}
      aria-current={pathname === href ? "page" : undefined}
    >
      {children}
    </Link>
  );
}
