"use client";

import { useSyncExternalStore } from "react";
import { approxLabel } from "@/lib/currency";
import { getServerSnapshot, getSnapshot, subscribe } from "@/lib/currency-store";
import { cn } from "@/lib/utils";

/**
 * The approximate price in the visitor's currency, beside the rupee figure.
 *
 * Renders nothing for an unset price, and nothing for a visitor in India —
 * the rupee price is already in their currency, and a second copy of it would
 * be noise. That means the line disappears on hydration for Indian visitors,
 * who are most of the audience: a one-off shift of a secondary line, which
 * is cheaper than reserving blank space under every price for everyone.
 *
 * The static HTML carries the dollar figure (see the store's server
 * snapshot), so this degrades to a sensible fixed value without JavaScript.
 */
export function PriceApprox({
  amountInr,
  className,
}: {
  amountInr: number | null;
  className?: string;
}) {
  const code = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const label = approxLabel(amountInr, code);
  if (!label) return null;

  return (
    <span className={cn("tabular text-muted", className)}>{label}</span>
  );
}
