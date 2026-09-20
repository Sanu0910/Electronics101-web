"use client";

import { useState } from "react";
import type { WorkshopDay } from "@/content/types";
import { cn } from "@/lib/utils";

/**
 * The day-by-day curriculum as an expandable timeline.
 *
 * Each day is a real <button> carrying aria-expanded and aria-controls, so it
 * is operable from the keyboard and announced correctly without a library.
 * Day one opens by default so the section never reads as empty.
 *
 * The panel animates on grid-template-rows (0fr to 1fr) rather than on
 * height, which gets a smooth open without measuring anything in JS. Its
 * content is plain text with nothing focusable, so leaving it in the
 * accessibility tree while collapsed costs nothing and keeps it findable.
 */
export function DayTimeline({ days }: { days: WorkshopDay[] }) {
  const [open, setOpen] = useState<number[]>(days.length ? [days[0].day] : []);

  const toggle = (day: number) =>
    setOpen((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day],
    );

  return (
    <ol className="relative space-y-3">
      {/* the rail the day markers sit on */}
      <span
        aria-hidden="true"
        className="absolute bottom-6 left-5 top-6 hidden w-px bg-line sm:block"
      />

      {days.map((d) => {
        const isOpen = open.includes(d.day);
        return (
          <li key={d.day} className="relative">
            <div
              className={cn(
                "overflow-hidden rounded-2xl border bg-elevated transition-colors duration-200",
                isOpen ? "border-accent/50" : "border-line hover:border-accent/30",
              )}
            >
              <h3>
                <button
                  type="button"
                  onClick={() => toggle(d.day)}
                  aria-expanded={isOpen}
                  aria-controls={`day-panel-${d.day}`}
                  id={`day-trigger-${d.day}`}
                  className="flex w-full items-center gap-4 p-4 text-left transition-colors duration-200 hover:bg-subtle sm:p-5"
                >
                  <span
                    className={cn(
                      "grid size-10 shrink-0 place-items-center rounded-full border font-mono text-sm font-bold tabular transition-colors duration-200",
                      isOpen
                        ? "border-accent bg-accent text-accent-fg"
                        : "border-line-strong text-accent",
                    )}
                  >
                    {d.day}
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block text-xs uppercase tracking-[0.18em] text-faint">
                      Day {d.day}
                    </span>
                    <span className="mt-0.5 block font-bold sm:text-lg">
                      {d.title}
                    </span>
                  </span>

                  <svg
                    viewBox="0 0 24 24"
                    className={cn(
                      "size-5 shrink-0 text-accent transition-transform duration-300",
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
                id={`day-panel-${d.day}`}
                role="region"
                aria-labelledby={`day-trigger-${d.day}`}
                className={cn(
                  "grid transition-[grid-template-rows] duration-300 ease-out",
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                )}
              >
                <div className="overflow-hidden">
                  <ul className="grid gap-x-6 gap-y-3 border-t border-line p-4 sm:grid-cols-2 sm:p-5 sm:pl-19">
                    {d.points.map((point) => (
                      <li key={point} className="flex gap-3 text-sm text-muted">
                        <span
                          aria-hidden="true"
                          className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent"
                        />
                        <span className="min-w-0">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
