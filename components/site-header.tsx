"use client";

import Link from "next/link";
import { Logo } from "./logo";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/course", label: "Course" },
  { href: "/consultation", label: "1:1 sessions" },
  { href: "/redroot", label: "Framework" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-ink-line bg-ink/95 text-white backdrop-blur">
      <div className="wrap flex h-16 items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-2.5" aria-label="RedRoot home">
          <Logo size={30} />
          <span className="display-md text-[1.2rem] tracking-tight">RedRoot</span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={`relative px-3 py-2 text-[0.95rem] transition-colors ${
                  active ? "text-white" : "text-mist hover:text-white"
                }`}
              >
                {l.label}
                {active && <span className="absolute inset-x-3 -bottom-[13px] h-[2px] bg-red" />}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/course#enroll" className="btn btn-red hidden !min-h-10 !py-2 sm:inline-flex">
            Enroll now
          </Link>
          <button
            type="button"
            className="-mr-2 p-2 lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-ink-line lg:hidden">
          <div className="wrap flex flex-col py-3">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`border-b border-ink-line/60 py-3.5 text-lg ${
                  pathname === l.href ? "text-white" : "text-mist"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <Link href="/course#enroll" className="btn btn-red mt-4 mb-2">
              Enroll now
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
