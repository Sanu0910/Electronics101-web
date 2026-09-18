"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type AccordionItem = {
  id: string;
  title: string;
  meta?: string;
  body: ReactNode;
};

/**
 * An accordion built on real buttons with aria-expanded and aria-controls,
 * so it is operable and announced correctly without a library.
 *
 * Panels stay in the DOM and are hidden with `hidden` rather than unmounted,
 * which keeps in-page search (Ctrl+F) able to find closed content — and the
 * first item opens by default so the section never reads as empty.
 */
export function Accordion({ items }: { items: AccordionItem[] }) {
  const [open, setOpen] = useState<string[]>(items.length ? [items[0].id] : []);

  const toggle = (id: string) =>
    setOpen((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );

  return (
    <div className="divide-y divide-line overflow-hidden rounded-2xl border border-line">
      {items.map((item) => {
        const isOpen = open.includes(item.id);
        return (
          <div key={item.id}>
            <h3>
              <button
                type="button"
                onClick={() => toggle(item.id)}
                aria-expanded={isOpen}
                aria-controls={`panel-${item.id}`}
                id={`trigger-${item.id}`}
                className="flex w-full items-center gap-4 bg-elevated px-5 py-4 text-left transition-colors duration-200 hover:bg-subtle"
              >
                <span className="min-w-0 flex-1 font-semibold">{item.title}</span>
                {item.meta ? (
                  <span className="shrink-0 text-xs text-faint">{item.meta}</span>
                ) : null}
                <svg
                  viewBox="0 0 24 24"
                  className={cn(
                    "size-5 shrink-0 text-accent transition-transform duration-200",
                    isOpen && "rotate-180",
                  )}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </h3>
            <div
              id={`panel-${item.id}`}
              role="region"
              aria-labelledby={`trigger-${item.id}`}
              hidden={!isOpen}
              className="bg-bg px-5 py-5"
            >
              {item.body}
            </div>
          </div>
        );
      })}
    </div>
  );
}
