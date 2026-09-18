"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { mainNav, site } from "@/config/site";
import { buttonClass } from "@/components/ui/primitives";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";
import { asset } from "@/lib/paths";

export function Navbar() {
  const pathname = usePathname();
  /*
   * The menu remembers WHICH path it was opened on, so a navigation closes it
   * derivationally — `open` simply stops matching. No effect, and no risk of
   * the menu surviving a route change because a cleanup did not run.
   */
  const [openedOn, setOpenedOn] = useState<string | null>(null);
  const open = openedOn === pathname;
  const setOpen = (next: boolean) => setOpenedOn(next ? pathname : null);

  /* a full-screen menu that scrolls the page behind it is a bug */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  /* Escape closes it — expected of anything modal */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenedOn(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-50 border-b border-line glass">
      {/* keyboard users should not have to tab the whole nav to reach content */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-accent-fg"
      >
        Skip to content
      </a>

      <nav
        aria-label="Main"
        className="mx-auto flex h-16 w-full max-w-[90rem] items-center gap-4 safe-x"
      >
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5"
          aria-label={`${site.name} — home`}
        >
          <Image
            src={asset("/brand/logomark.svg")!}
            alt=""
            width={30}
            height={27}
            priority
            aria-hidden="true"
          />
          <span className="text-base font-bold tracking-tight" translate="no">
            Electronics&nbsp;101
          </span>
        </Link>

        {/* desktop */}
        <ul className="ml-auto hidden items-center gap-1 xl:flex">
          {mainNav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "rounded-full px-3 py-2 text-sm font-medium transition-colors duration-200",
                  isActive(item.href)
                    ? "text-accent"
                    : "text-muted hover:text-fg",
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="ml-auto flex items-center gap-2 xl:ml-0">
          <ThemeToggle />
          <Link href="/contact" className={buttonClass("primary", "sm", "hidden sm:inline-flex")}>
            Join Electronics 101
          </Link>

          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="grid size-10 place-items-center rounded-full border border-line text-muted transition-colors duration-200 hover:border-accent hover:text-accent xl:hidden"
          >
            <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              {open ? (
                <path d="m6 6 12 12M18 6 6 18" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* mobile */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="border-t border-line bg-bg xl:hidden"
        style={{ overscrollBehavior: "contain" }}
      >
        <ul className="max-h-[calc(100dvh-4rem)] overflow-y-auto px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          {mainNav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className="flex flex-col gap-0.5 rounded-xl px-3 py-3 transition-colors duration-200 hover:bg-elevated"
              >
                <span
                  className={cn(
                    "font-semibold",
                    isActive(item.href) && "text-accent",
                  )}
                >
                  {item.label}
                </span>
                {item.blurb ? (
                  <span className="text-sm text-faint">{item.blurb}</span>
                ) : null}
              </Link>
            </li>
          ))}
          <li className="mt-3 px-3">
            <Link href="/contact" className={buttonClass("primary", "md", "w-full")}>
              Join Electronics 101
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
