import {
  detectCurrency,
  FALLBACK_CURRENCY,
  hasRate,
  isCurrencyCode,
  type CurrencyCode,
} from "./currency";

/**
 * The currency every price on the page is shown in.
 *
 * A module-level store read through `useSyncExternalStore`, rather than
 * context: there is no provider to thread through the layout, a server
 * component can render the static fallback without one, and the pattern is
 * already used for the clock in components/home/Countdown.tsx.
 *
 * The server snapshot is deliberately the fallback currency, not the detected
 * one — it is what gets baked into the static HTML, so a visitor with no
 * JavaScript still sees a figure, and React hydrates against a known value
 * before swapping in the detected one.
 */

const KEY = "e101.currency";

/** null until the client has resolved it; the snapshot must then be stable. */
let current: CurrencyCode | null = null;
const listeners = new Set<() => void>();

/**
 * An explicit choice wins over detection, permanently. Someone who corrects
 * the guess should not have to correct it again on the next page.
 *
 * Every localStorage access is guarded: it throws outright in a Safari
 * private window and when site data is blocked, and a throw here would take
 * down the price block it is meant to decorate.
 */
function resolve(): CurrencyCode {
  try {
    const saved = localStorage.getItem(KEY);
    if (isCurrencyCode(saved) && hasRate(saved)) return saved;
  } catch {
    /* no stored preference available — detect instead */
  }
  return detectCurrency();
}

export function subscribe(onChange: () => void) {
  listeners.add(onChange);

  // Keep two open tabs in step. `storage` fires in the OTHER tabs only, which
  // is exactly the case setCurrency cannot notify itself.
  const onStorage = (e: StorageEvent) => {
    if (e.key !== KEY) return;
    current = resolve();
    listeners.forEach((l) => l());
  };
  window.addEventListener("storage", onStorage);

  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onStorage);
  };
}

export function getSnapshot(): CurrencyCode {
  if (current === null) current = resolve();
  return current;
}

export const getServerSnapshot = (): CurrencyCode => FALLBACK_CURRENCY;

export function setCurrency(code: CurrencyCode) {
  current = code;
  try {
    localStorage.setItem(KEY, code);
  } catch {
    /* the choice still applies to this page view, just not the next one */
  }
  listeners.forEach((l) => l());
}
