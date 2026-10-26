/** Join class names, dropping falsey ones. Small enough not to need clsx. */
export const cn = (...parts: Array<string | false | null | undefined>) =>
  parts.filter(Boolean).join(" ");

/**
 * Dates and numbers go through Intl, never a hardcoded format — the audience
 * is international and "10/12/26" means two different days depending on who
 * is reading it.
 */
const DATE_LOCALE = "en-IN";

export const formatDate = (iso: string, opts?: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat(DATE_LOCALE, {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Kolkata",
    ...opts,
  }).format(new Date(iso));

export const formatDateTime = (iso: string) =>
  new Intl.DateTimeFormat(DATE_LOCALE, {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "Asia/Kolkata",
    timeZoneName: "short",
  }).format(new Date(iso));

export const formatInr = (amount: number) =>
  new Intl.NumberFormat(DATE_LOCALE, {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

/** "Pricing on the registration page" is honest; a made-up number is not. */
export const priceLabel = (amount: number | null) =>
  amount === null ? "Pricing on registration" : formatInr(amount);

/**
 * Rupees per US dollar, for the indicative USD figure shown beside a price.
 *
 * Every seat is charged in INR through Razorpay, so this never decides what
 * anyone pays — it only helps an overseas reader size up a number. It is a
 * hardcoded mid-market rate because the site is a static export with no
 * server to call a rates API from, and a stale number read from a build
 * artefact would be worse than one that is openly approximate.
 *
 * Set from the FBIL reference rate and XE's mid-market rate on 26 Oct 2026
 * (both ≈95), which sat inside a 94.3–96.9 band over the preceding month.
 * A few rupees of drift moves these figures by well under a dollar at the
 * prices below, which is why they are rounded and marked "approx". Revisit
 * if the rupee moves more than ~5% from this.
 */
export const USD_INR_RATE = 95;

/**
 * The indicative dollar figure for an INR amount, as "approx $26".
 *
 * Rounded to whole dollars: the input is already an approximation, so
 * cents would dress it up as a precision it does not have. Amounts under a
 * dollar would round to "approx $0", so they floor at "under $1" instead.
 */
export const formatUsdApprox = (amountInr: number) => {
  const usd = Math.round(amountInr / USD_INR_RATE);
  if (usd < 1) return "approx under $1";
  return `approx $${new Intl.NumberFormat("en-US").format(usd)}`;
};

/**
 * The same figure for a price that may not be set yet. Returns null rather
 * than a placeholder string, so a caller can drop the element entirely
 * instead of rendering "approx" next to "Pricing on registration".
 */
export const usdApproxLabel = (amountInr: number | null) =>
  amountInr === null ? null : formatUsdApprox(amountInr);

export const readingTime = (minutes: number) => `${minutes} min read`;

/** Strip diacritics and punctuation for search matching. */
export const normalise = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

/** Does `haystack` contain every word of `needle`? Order-independent. */
export const matchesQuery = (haystack: string, needle: string) => {
  const q = normalise(needle);
  if (!q) return true;
  const h = normalise(haystack);
  return q.split(" ").every((word) => h.includes(word));
};

/**
 * Serialise data for embedding inside a <script> tag.
 *
 * JSON.stringify alone is not enough: a "</script>" sequence anywhere in the
 * data ends the tag early, and everything after it is parsed as HTML. Escaping
 * "<" removes that possibility, and the escape is still valid JSON, so anything
 * reading the block parses it unchanged.
 *
 * Nothing on this site takes user input today, so this is defence in depth —
 * it means a future CMS or form-fed field cannot turn a content string into
 * markup.
 */
export const jsonLdScript = (data: unknown) =>
  JSON.stringify(data).replace(/</g, "\\u003c");
