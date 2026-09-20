"use client";

import { useCallback, useState } from "react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Reveals its children the first time they scroll into view.
 *
 * The wrapper renders hidden on the server, which is only safe because there
 * are three ways out of that state: a <noscript> rule in layout.tsx shows
 * everything when scripting is off, a prefers-reduced-motion rule in
 * globals.css shows everything for anyone who asked for less movement, and a
 * browser with no IntersectionObserver is shown the content on mount.
 *
 * Only opacity and transform animate, so nothing reflows.
 */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  /** Stagger in ms. Keep a run under ~400ms total or it reads as lag. */
  delay?: number;
}) {
  const [shown, setShown] = useState(false);

  /**
   * A ref callback rather than an effect: it runs exactly when the node is
   * attached, and React calls the function it returns on detach, so the
   * observer's lifetime matches the element's. useCallback keeps the
   * identity stable, so re-rendering on reveal does not rebuild the observer.
   */
  const observe = useCallback((el: HTMLDivElement | null) => {
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={observe}
      className={cn("reveal-item", shown && "is-shown", className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
