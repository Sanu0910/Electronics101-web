"use client";

import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import { cn, matchesQuery } from "@/lib/utils";
import { EmptyState, Button } from "./primitives";

export type FilterGroup = {
  id: string;
  label: string;
  options: readonly string[];
};

/**
 * One filterable row: plain data plus an already-rendered card.
 *
 * The card arrives as a ReactNode rather than as a render function on
 * purpose. Functions cannot cross the server/client boundary, but elements
 * can — so the cards are still rendered on the server and this component only
 * decides which of them to show.
 */
export type FilterEntry = {
  id: string;
  /** Everything the search box should match against, pre-joined. */
  search: string;
  /** groupId → the values this entry has. */
  facets: Record<string, string[]>;
  node: ReactNode;
};

/**
 * Search + multi-select filters over any list.
 *
 * State is local rather than in the URL. That is a deliberate trade: the
 * interface guidelines say to deep-link stateful UI, and these lists are
 * short enough that a shareable filtered view is not yet worth the moving
 * parts. When the catalogue grows, lift this into query params — the
 * component boundary is already in the right place for that.
 */
export function Filterable({
  entries,
  groups,
  placeholder,
  emptyTitle = "Nothing matches those filters",
  emptyBody = "Try removing a filter, or searching for something broader.",
  columns = 3,
}: {
  entries: FilterEntry[];
  groups: FilterGroup[];
  placeholder: string;
  emptyTitle?: string;
  emptyBody?: string;
  columns?: 2 | 3;
}) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<Record<string, string[]>>({});

  const toggle = (groupId: string, value: string) =>
    setActive((prev) => {
      const current = prev[groupId] ?? [];
      return {
        ...prev,
        [groupId]: current.includes(value)
          ? current.filter((v) => v !== value)
          : [...current, value],
      };
    });

  const activeCount = Object.values(active).flat().length;

  const filtered = useMemo(
    () =>
      entries.filter((entry) => {
        if (!matchesQuery(entry.search, query)) return false;
        return Object.entries(active).every(([groupId, values]) => {
          if (!values.length) return true;
          const has = entry.facets[groupId] ?? [];
          return values.some((v) => has.includes(v));
        });
      }),
    [entries, query, active],
  );

  return (
    <div>
      <div className="flex flex-col gap-5">
        <div className="relative max-w-md">
          <label htmlFor="filter-search" className="sr-only">
            Search
          </label>
          <input
            id="filter-search"
            type="search"
            name="q"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            autoComplete="off"
            spellCheck={false}
            className="h-11 w-full rounded-full border border-line bg-elevated pl-11 pr-4 text-sm outline-none transition-colors duration-200 placeholder:text-faint focus:border-accent"
          />
          <svg
            viewBox="0 0 24 24"
            className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-faint"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" strokeLinecap="round" />
          </svg>
        </div>

        {groups.map((group) => (
          <fieldset key={group.id} className="flex flex-wrap items-center gap-2">
            <legend className="sr-only">{group.label}</legend>
            <span className="mr-1 text-xs font-semibold uppercase tracking-wider text-faint">
              {group.label}
            </span>
            {group.options.map((option) => {
              const on = (active[group.id] ?? []).includes(option);
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => toggle(group.id, option)}
                  aria-pressed={on}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors duration-200",
                    on
                      ? "border-accent bg-accent/15 text-accent"
                      : "border-line text-muted hover:border-accent/50 hover:text-fg",
                  )}
                >
                  {option}
                </button>
              );
            })}
          </fieldset>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between gap-4">
        <p className="text-sm text-faint tabular" aria-live="polite">
          Showing {filtered.length} of {entries.length}
        </p>
        {activeCount || query ? (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setActive({});
              setQuery("");
            }}
          >
            Clear Filters
          </Button>
        ) : null}
      </div>

      <div className="mt-6">
        {filtered.length ? (
          <div
            className={cn(
              "grid gap-6",
              columns === 3 ? "sm:grid-cols-2 lg:grid-cols-3" : "lg:grid-cols-2",
            )}
          >
            {filtered.map((entry) => (
              <div key={entry.id}>{entry.node}</div>
            ))}
          </div>
        ) : (
          <EmptyState title={emptyTitle} body={emptyBody} />
        )}
      </div>
    </div>
  );
}
