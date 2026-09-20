/**
 * Electronics 101 — one place for everything that is not page content.
 *
 * Brand strings, the canonical URL, navigation and social links all live
 * here. Nothing below is repeated in a component: change a handle once and
 * it changes in the navbar, the footer, the social hub and the JSON-LD.
 *
 * SOCIAL URLS ARE DELIBERATELY EMPTY WHERE UNKNOWN. Inventing a plausible
 * URL is worse than shipping none — a dead link that looks real gets clicked
 * and loses the visitor. `href: null` renders the card with a "Link coming
 * soon" state instead of an anchor. Fill these in and they light up.
 */

export const site = {
  name: "Electronics 101",
  tagline: "Learn. Build. Simulate. Innovate.",
  description:
    "An independent technical education platform for practical electronics, RF and microwave engineering, antenna design, PCB and EMI/EMC, semiconductor technology and simulation.",
  /**
   * Where the site actually lives. Feeds canonical URLs, Open Graph tags and
   * the sitemap, so it must match reality or search engines are told the
   * wrong address.
   *
   * This is the GitHub Pages project URL. When a custom domain is connected,
   * change this AND drop BASE_PATH from .github/workflows/deploy.yml.
   */
  url: "https://sanu0910.github.io/Electronics101-web",
  locale: "en_IN",
  /** Published on the contact page beside the form, for people who prefer email. */
  email: "rf101.sanu@gmail.com",
} as const;

export type NavItem = {
  label: string;
  href: string;
  /** Shown in the mobile menu under the label. */
  blurb?: string;
};

export const mainNav: NavItem[] = [
  { label: "Courses", href: "/courses", blurb: "Structured, tool-based programmes" },
  { label: "Workshops", href: "/workshops", blurb: "Live, hands-on sessions" },
  { label: "Series", href: "/series", blurb: "Free learning tracks, episode by episode" },
  { label: "Study Material", href: "/study-material", blurb: "Notes, formula sheets, guides" },
  { label: "Services", href: "/services", blurb: "Design, simulation and training" },
  { label: "Mentorship", href: "/mentorship", blurb: "One-to-one and project guidance" },
  { label: "Projects", href: "/projects", blurb: "What has been built and measured" },
  { label: "Blog", href: "/blog", blurb: "Technical articles" },
  { label: "About", href: "/about", blurb: "What this platform is" },
];

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Learn",
    items: [
      { label: "Courses", href: "/courses" },
      { label: "Workshops", href: "/workshops" },
      { label: "Series", href: "/series" },
      { label: "Study Material", href: "/study-material" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Work With Us",
    items: [
      { label: "Services", href: "/services" },
      { label: "Mentorship", href: "/mentorship" },
      { label: "Projects", href: "/projects" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Platform",
    items: [
      { label: "About", href: "/about" },
      { label: "Feedback", href: "/feedback" },
      { label: "Useful Links", href: "/links" },
    ],
  },
  {
    title: "Legal",
    items: [
      { label: "Terms & Conditions", href: "/legal/terms" },
      { label: "Privacy Policy", href: "/legal/privacy" },
      { label: "Refund Policy", href: "/legal/refunds" },
    ],
  },
];

export type SocialPlatform =
  | "youtube"
  | "instagram"
  | "linkedin"
  | "facebook"
  | "whatsapp";

export type SocialLink = {
  id: SocialPlatform;
  label: string;
  handle: string | null;
  /** null → the card renders as "coming soon" rather than a dead anchor. */
  href: string | null;
  blurb: string;
  cta: string;
};

export const socials: SocialLink[] = [
  {
    id: "youtube",
    label: "YouTube",
    handle: "@electroniz101",
    href: "https://www.youtube.com/@electroniz101",
    blurb: "Full episodes and short explainers — the series, free to watch.",
    cta: "Subscribe",
  },
  {
    id: "instagram",
    label: "Instagram",
    handle: "@electroniz101",
    href: "https://www.instagram.com/electroniz101/",
    blurb: "Short-form concepts, build photos and workshop announcements.",
    cta: "Follow",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    handle: "electronics-101",
    href: "https://www.linkedin.com/company/electronics-101/",
    blurb: "Technical articles, industry notes and programme updates.",
    cta: "Connect",
  },
  {
    id: "facebook",
    label: "Facebook",
    handle: "Electronics 101 By Sanu",
    href: "https://www.facebook.com/people/Electronics-101-By-Sanu/61593581800113/",
    blurb: "Community posts and event listings.",
    cta: "Follow",
  },
  {
    id: "whatsapp",
    label: "WhatsApp Community",
    handle: null,
    href: null,
    blurb: "Doubt-solving, resource drops and workshop reminders.",
    cta: "Join",
  },
];

/** Shown wherever a claim about affiliation could otherwise be inferred. */
export const affiliationNotice =
  "Electronics 101 is an independent technical learning platform. Programmes are conducted independently and are not affiliated with any government organisation, university or statutory authority unless explicitly stated for a specific programme.";
