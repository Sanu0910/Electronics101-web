"use client";

import { useState } from "react";
import { site } from "@/config/site";

/**
 * Copy a canonical link to the clipboard.
 *
 * The confirmation is announced with aria-live so it is not a purely visual
 * change, and it reverts after a moment. Clipboard access can be refused
 * (permissions, insecure context) — that path says so rather than silently
 * appearing to succeed.
 */
export function CopyLink({ path }: { path: string }) {
  const [state, setState] = useState<"idle" | "done" | "failed">("idle");

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(`${site.url}${path}`);
      setState("done");
    } catch {
      setState("failed");
    }
    setTimeout(() => setState("idle"), 2400);
  };

  return (
    <>
      <button
        type="button"
        onClick={copy}
        className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1 text-xs font-medium text-muted transition-colors duration-200 hover:border-accent hover:text-accent"
      >
        <svg
          viewBox="0 0 24 24"
          className="size-3.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <rect x="9" y="9" width="12" height="12" rx="2" />
          <path d="M5 15V5a2 2 0 0 1 2-2h10" strokeLinecap="round" />
        </svg>
        Copy link
      </button>
      <span role="status" aria-live="polite" className="text-xs text-accent">
        {state === "done" ? "Link copied" : state === "failed" ? "Could not copy — select the address bar instead" : ""}
      </span>
    </>
  );
}
