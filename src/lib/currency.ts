import { INR_PER_UNIT, RATES_AS_OF } from "./rates.generated";

export { RATES_AS_OF };

/**
 * Currency display for an international audience, on a site that charges in
 * rupees only.
 *
 * Every seat is priced, invoiced and charged in INR through Razorpay. The
 * figures here are a sighting shot so an overseas reader can size up a price
 * without leaving the page — never a quote. Their bank picks the rate they
 * actually pay, and adds a fee on top, so the UI says so wherever one appears
 * and INR stays the primary number.
 *
 * Three consequences worth knowing before changing anything here:
 *
 * 1. Rates come from a build-time snapshot (rates.generated.ts), because a
 *    static export has no server to ask at request time. They are therefore
 *    days old by construction, which is why everything is rounded and
 *    labelled "approx".
 * 2. Detection is a guess from the browser's timezone. It is right for most
 *    visitors and wrong for anyone on a VPN, so the switcher is not optional.
 * 3. Structured data and the order itself stay INR. A converted figure in
 *    schema.org markup would misrepresent what is charged.
 */

export const CURRENCIES = [
  { code: "INR", label: "India (₹)" },
  { code: "USD", label: "United States ($)" },
  { code: "EUR", label: "Euro (€)" },
  { code: "GBP", label: "United Kingdom (£)" },
  { code: "AED", label: "UAE (AED)" },
  { code: "SGD", label: "Singapore (S$)" },
  { code: "AUD", label: "Australia (A$)" },
  { code: "CAD", label: "Canada (C$)" },
  { code: "JPY", label: "Japan (¥)" },
] as const;

export type CurrencyCode = (typeof CURRENCIES)[number]["code"];

/**
 * The currency shown when nothing is known about the visitor: during the
 * static render, for an unmapped timezone, and with JavaScript off. The
 * dollar is the least-surprising default for an international reader and the
 * one figure that is always in the prerendered HTML.
 */
export const FALLBACK_CURRENCY: CurrencyCode = "USD";

/** India sees rupees alone — the price is already in their currency. */
export const HOME_CURRENCY: CurrencyCode = "INR";

export const isCurrencyCode = (value: unknown): value is CurrencyCode =>
  typeof value === "string" && CURRENCIES.some((c) => c.code === value);

/** A currency is only offered if the build actually has a rate for it. */
export const hasRate = (code: CurrencyCode) =>
  code === HOME_CURRENCY || typeof INR_PER_UNIT[code] === "number";

export const offeredCurrencies = () => CURRENCIES.filter((c) => hasRate(c.code));

/**
 * IANA timezone to currency.
 *
 * Written out rather than derived, because the mapping genuinely is a list:
 * `Europe/*` spans the euro, the pound, the franc, the forint and more, and
 * `America/*` spans the US and Canada. Guessing by prefix would put a Warsaw
 * visitor in euros and a Toronto visitor in dollars.
 *
 * Only zones whose currency this site offers are listed. Anything missing
 * falls back to the dollar, which is a wrong-but-recognisable number rather
 * than a confidently wrong one, and the switcher is right there.
 */
const ZONE_CURRENCY: Record<string, CurrencyCode> = {
  /* India — rupees, no conversion shown */
  "Asia/Kolkata": "INR",
  "Asia/Calcutta": "INR",

  /* Eurozone, including the microstates that use the euro by agreement */
  "Europe/Amsterdam": "EUR",
  "Europe/Andorra": "EUR",
  "Europe/Athens": "EUR",
  "Europe/Berlin": "EUR",
  "Europe/Bratislava": "EUR",
  "Europe/Brussels": "EUR",
  "Europe/Dublin": "EUR",
  "Europe/Helsinki": "EUR",
  "Europe/Lisbon": "EUR",
  "Europe/Ljubljana": "EUR",
  "Europe/Luxembourg": "EUR",
  "Europe/Madrid": "EUR",
  "Europe/Malta": "EUR",
  "Europe/Mariehamn": "EUR",
  "Europe/Monaco": "EUR",
  "Europe/Paris": "EUR",
  "Europe/Podgorica": "EUR",
  "Europe/Riga": "EUR",
  "Europe/Rome": "EUR",
  "Europe/San_Marino": "EUR",
  "Europe/Sarajevo": "EUR",
  "Europe/Tallinn": "EUR",
  "Europe/Vatican": "EUR",
  "Europe/Vienna": "EUR",
  "Europe/Vilnius": "EUR",
  "Europe/Zagreb": "EUR",
  "Atlantic/Azores": "EUR",
  "Atlantic/Canary": "EUR",
  "Atlantic/Madeira": "EUR",
  "Asia/Famagusta": "EUR",
  "Asia/Nicosia": "EUR",

  /* United Kingdom and the crown dependencies */
  "Europe/London": "GBP",
  "Europe/Belfast": "GBP",
  "Europe/Guernsey": "GBP",
  "Europe/Isle_of_Man": "GBP",
  "Europe/Jersey": "GBP",
  "Europe/Gibraltar": "GBP",

  /* Gulf — the dirham is pegged to the dollar, see rates script */
  "Asia/Dubai": "AED",

  "Asia/Singapore": "SGD",
  "Asia/Tokyo": "JPY",

  /* Australia */
  "Australia/Adelaide": "AUD",
  "Australia/Brisbane": "AUD",
  "Australia/Broken_Hill": "AUD",
  "Australia/Darwin": "AUD",
  "Australia/Hobart": "AUD",
  "Australia/Lindeman": "AUD",
  "Australia/Lord_Howe": "AUD",
  "Australia/Melbourne": "AUD",
  "Australia/Perth": "AUD",
  "Australia/Sydney": "AUD",

  /* Canada */
  "America/Atikokan": "CAD",
  "America/Blanc-Sablon": "CAD",
  "America/Cambridge_Bay": "CAD",
  "America/Dawson": "CAD",
  "America/Dawson_Creek": "CAD",
  "America/Edmonton": "CAD",
  "America/Fort_Nelson": "CAD",
  "America/Glace_Bay": "CAD",
  "America/Goose_Bay": "CAD",
  "America/Halifax": "CAD",
  "America/Inuvik": "CAD",
  "America/Iqaluit": "CAD",
  "America/Moncton": "CAD",
  "America/Montreal": "CAD",
  "America/Rankin_Inlet": "CAD",
  "America/Regina": "CAD",
  "America/Resolute": "CAD",
  "America/St_Johns": "CAD",
  "America/Swift_Current": "CAD",
  "America/Toronto": "CAD",
  "America/Vancouver": "CAD",
  "America/Whitehorse": "CAD",
  "America/Winnipeg": "CAD",
  "America/Yellowknife": "CAD",
};

/**
 * The visitor's likely currency, from the browser's own timezone.
 *
 * Timezone rather than a geo-IP service on purpose: it needs no network
 * request, no third party, and no visitor IP leaves the browser, so there is
 * nothing for an ad blocker to break and nothing to disclose in a privacy
 * policy. The cost is being wrong behind a VPN, which the switcher covers.
 *
 * Returns the fallback on anything unexpected: `Intl` is guarded because a
 * hostile or ancient environment can throw, and a thrown error here would
 * take the whole price block down with it.
 */
export function detectCurrency(): CurrencyCode {
  try {
    const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const fromZone = zone ? ZONE_CURRENCY[zone] : undefined;
    if (fromZone && hasRate(fromZone)) return fromZone;
  } catch {
    /* fall through to the locale */
  }

  // A weaker signal, used only when the timezone said nothing: a locale is a
  // formatting preference, not a location, and plenty of people abroad run
  // en-US. It still beats the fallback for someone with en-GB set.
  try {
    const region = new Intl.Locale(navigator.language).region;
    const fromLocale = region ? REGION_CURRENCY[region] : undefined;
    if (fromLocale && hasRate(fromLocale)) return fromLocale;
  } catch {
    /* fall through to the fallback */
  }

  return FALLBACK_CURRENCY;
}

/** Only the regions whose currency this site offers; see detectCurrency. */
const REGION_CURRENCY: Record<string, CurrencyCode> = {
  IN: "INR",
  US: "USD",
  GB: "GBP",
  AE: "AED",
  SG: "SGD",
  AU: "AUD",
  CA: "CAD",
  JP: "JPY",
  AT: "EUR",
  BE: "EUR",
  CY: "EUR",
  DE: "EUR",
  EE: "EUR",
  ES: "EUR",
  FI: "EUR",
  FR: "EUR",
  GR: "EUR",
  HR: "EUR",
  IE: "EUR",
  IT: "EUR",
  LT: "EUR",
  LU: "EUR",
  LV: "EUR",
  MT: "EUR",
  NL: "EUR",
  PT: "EUR",
  SI: "EUR",
  SK: "EUR",
};

/**
 * Round hard, so the number reads as the estimate it is. A figure converted
 * from a days-old rate and then shown to the rupee would be dressing up a
 * guess: ¥4,124 claims a precision that ¥4,100 does not.
 */
const roundApprox = (value: number) => {
  if (value < 100) return Math.round(value);
  if (value < 1000) return Math.round(value / 5) * 5;
  return Math.round(value / 50) * 50;
};

const formatMoney = (value: number, code: CurrencyCode) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: code,
    maximumFractionDigits: 0,
  }).format(value);

/**
 * The approximate figure for an INR amount, as "approx $26" — or null when
 * there is nothing worth showing: no price yet, rupees (already the price),
 * or a currency this build has no rate for. Returning null lets a caller drop
 * the element rather than render an empty label.
 */
export function approxLabel(
  amountInr: number | null,
  code: CurrencyCode,
): string | null {
  if (amountInr === null) return null;
  if (code === HOME_CURRENCY) return null;

  const rate = INR_PER_UNIT[code];
  if (typeof rate !== "number" || rate <= 0) return null;

  const value = amountInr / rate;
  // Under one unit, rounding would print "approx $0" for a real price.
  if (value < 1) return `approx under ${formatMoney(1, code)}`;
  return `approx ${formatMoney(roundApprox(value), code)}`;
}

/** "about ₹95.05 to $1", for the note that explains where a figure came from. */
export function rateSentence(code: CurrencyCode): string | null {
  if (code === HOME_CURRENCY) return null;
  const rate = INR_PER_UNIT[code];
  if (typeof rate !== "number" || rate <= 0) return null;

  const inr = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(rate);

  return `about ${inr} to ${formatMoney(1, code)}`;
}
