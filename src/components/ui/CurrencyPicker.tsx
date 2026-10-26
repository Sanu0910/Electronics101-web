"use client";

import { useSyncExternalStore } from "react";
import {
  HOME_CURRENCY,
  isCurrencyCode,
  offeredCurrencies,
  rateSentence,
  RATES_AS_OF,
} from "@/lib/currency";
import { getServerSnapshot, getSnapshot, setCurrency, subscribe } from "@/lib/currency-store";
import { formatDate } from "@/lib/utils";

/**
 * Lets the visitor pick the currency the approximate figures are shown in,
 * and says where those figures come from.
 *
 * One control per registration section, not one per price: the choice is
 * global, so every PriceApprox on the page follows it.
 *
 * The switcher is not a convenience. Detection reads the browser's timezone,
 * which is wrong for anyone on a VPN or a travelling laptop, and a price the
 * visitor cannot correct is worse than no conversion at all.
 */
export function CurrencyPicker() {
  const code = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const rate = rateSentence(code);

  return (
    <div className="mt-8 border-t border-line pt-6">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <label htmlFor="currency" className="text-xs text-faint">
          Show approximate prices in
        </label>
        <select
          id="currency"
          value={code}
          onChange={(e) => {
            if (isCurrencyCode(e.target.value)) setCurrency(e.target.value);
          }}
          // explicit colours: a native select inherits the OS theme otherwise
          style={{ backgroundColor: "var(--bg-elevated)", color: "var(--fg)" }}
          className="rounded-lg border border-line px-3 py-1.5 text-xs outline-none transition-colors duration-200 focus:border-accent"
        >
          {offeredCurrencies().map((c) => (
            <option key={c.code} value={c.code}>
              {c.label}
            </option>
          ))}
        </select>
      </div>

      <p className="mt-3 max-w-prose text-xs text-faint">
        {code === HOME_CURRENCY ? (
          <>Every price on this page is in rupees, which is what you are charged.</>
        ) : (
          <>
            {rate ? `Converted at ${rate}, ` : "Converted at a "}
            mid-market reference rate from{" "}
            <time dateTime={RATES_AS_OF}>{formatDate(RATES_AS_OF)}</time>, so
            treat it as a rough guide. Every seat is charged in rupees — your
            bank or card issuer sets the rate you actually pay and usually adds
            a fee on top.
          </>
        )}
      </p>
    </div>
  );
}
