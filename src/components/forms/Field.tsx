"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * One labelled field with inline error text.
 *
 * The label is a real <label htmlFor>, so tapping it focuses the control —
 * and the error is tied to the input with aria-describedby and aria-invalid
 * so it is announced, not merely coloured red.
 */
export function Field({
  id,
  label,
  error,
  hint,
  required,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium">
        {label}
        {required ? (
          <span className="ml-1 text-accent" aria-hidden="true">
            *
          </span>
        ) : (
          <span className="ml-2 text-xs font-normal text-faint">Optional</span>
        )}
      </label>
      {hint ? (
        <p id={`${id}-hint`} className="mt-1 text-xs text-faint">
          {hint}
        </p>
      ) : null}
      <div className="mt-2">{children}</div>
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-xs font-medium text-stop-400">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export const inputClass = (invalid?: boolean) =>
  cn(
    "w-full rounded-xl border bg-elevated px-4 py-3 text-sm outline-none",
    "transition-colors duration-200 placeholder:text-faint",
    invalid ? "border-stop-400" : "border-line focus:border-accent",
  );
