"use client";

import { useState } from "react";
import type { Testimonial } from "@/content/types";
import { TestimonialCard } from "@/components/cards";
import { EmptyState } from "@/components/ui/primitives";
import { cn } from "@/lib/utils";

/**
 * A testimonial carousel that is a scroller, not a hijacked slideshow.
 *
 * It uses native scroll-snap, so it works with a trackpad, a touch swipe, the
 * keyboard and a screen reader without any of that being reimplemented. The
 * arrows scroll it; they are a convenience over the native behaviour rather
 * than the only way to move. There is no autoplay — content that moves on its
 * own while you are reading it is hostile.
 */
export function TestimonialCarousel({ items }: { items: Testimonial[] }) {
  const [node, setNode] = useState<HTMLUListElement | null>(null);

  if (!items.length) {
    return (
      <EmptyState
        title="No published feedback yet"
        body="Reviews appear here once participants submit them and they are approved."
      />
    );
  }

  const scrollBy = (dir: 1 | -1) => {
    if (!node) return;
    const card = node.firstElementChild as HTMLElement | null;
    const step = card ? card.offsetWidth + 24 : node.clientWidth * 0.8;
    node.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <ul
        ref={setNode}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ overscrollBehaviorX: "contain" }}
      >
        {items.map((t) => (
          <li
            key={t.id}
            className="w-[min(22rem,85vw)] shrink-0 snap-start"
          >
            <TestimonialCard item={t} />
          </li>
        ))}
      </ul>

      {items.length > 1 ? (
        <div className="mt-6 flex justify-center gap-2">
          {([-1, 1] as const).map((dir) => (
            <button
              key={dir}
              type="button"
              onClick={() => scrollBy(dir)}
              aria-label={dir === -1 ? "Previous testimonials" : "Next testimonials"}
              className={cn(
                "grid size-10 place-items-center rounded-full border border-line text-muted",
                "transition-colors duration-200 hover:border-accent hover:text-accent",
              )}
            >
              <svg
                viewBox="0 0 24 24"
                className="size-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path
                  d={dir === -1 ? "m15 5-7 7 7 7" : "m9 5 7 7-7 7"}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
