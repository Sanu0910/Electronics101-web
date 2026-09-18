"use client";

import { useCallback, useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";

/**
 * Time remaining until an instant.
 *
 * The clock is external mutable state, so it is read with
 * `useSyncExternalStore` rather than mirrored into an effect. That gets two
 * things for free: React handles the hydration difference properly (the
 * server snapshot is "unknown", so nothing renders until the client knows),
 * and there is no synchronous setState on mount.
 *
 * The snapshot is a NUMBER, not an object — `useSyncExternalStore` compares
 * snapshots by identity, and a fresh object each call would loop forever.
 */
export function Countdown({ iso, className }: { iso: string; className?: string }) {
  const target = new Date(iso).getTime();

  const subscribe = useCallback((onChange: () => void) => {
    const id = setInterval(onChange, 30_000);
    return () => clearInterval(id);
  }, []);

  const minutesLeft = useSyncExternalStore(
    subscribe,
    () => Math.max(0, Math.floor((target - Date.now()) / 60_000)),
    () => -1, // server render: the client has not told us the time yet
  );

  if (minutesLeft < 0) return null;

  if (minutesLeft === 0) {
    return (
      <p className={cn("text-sm font-semibold text-faint", className)}>
        This has started.
      </p>
    );
  }

  const cells: [number, string][] = [
    [Math.floor(minutesLeft / 1440), "days"],
    [Math.floor((minutesLeft % 1440) / 60), "hours"],
    [minutesLeft % 60, "minutes"],
  ];

  return (
    <div className={cn("flex gap-2", className)} aria-live="polite">
      {cells.map(([value, label]) => (
        <div
          key={label}
          className="min-w-16 rounded-xl border border-line bg-bg px-3 py-2 text-center"
        >
          <div className="text-xl font-bold tabular text-accent">{value}</div>
          <div className="text-[0.65rem] uppercase tracking-wider text-faint">
            {value === 1 ? label.slice(0, -1) : label}
          </div>
        </div>
      ))}
    </div>
  );
}
