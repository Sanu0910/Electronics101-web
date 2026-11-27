import Link from "next/link";

/**
 * Site-wide strip for the Signals & Systems pre-order (user, 2026-11-25).
 * Remove or reword it on 10 Dec, when the full book launches and the price goes to ₹499.
 */
export function BookBanner() {
  return (
    <div className="bg-accent text-accent-fg">
      <Link
        href="/book"
        className="mx-auto flex max-w-[90rem] flex-wrap items-center justify-center gap-x-2 px-4 py-2 text-center text-sm font-semibold safe-x hover:underline"
      >
        <span>New: Signals &amp; Systems book for GATE</span>
        <span aria-hidden="true">·</span>
        <span>Pre-order ₹249, only 100 copies</span>
        <span aria-hidden="true">·</span>
        <span>Full book 10 Dec &rarr;</span>
      </Link>
    </div>
  );
}
