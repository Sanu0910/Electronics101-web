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
