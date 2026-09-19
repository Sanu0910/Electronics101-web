import type { Metadata, Viewport } from "next";
import { Sora, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { site, socials } from "@/config/site";

/**
 * Sora for headings and UI — geometric and technical, and it sets numerals
 * cleanly, which matters on a site full of frequencies and impedances.
 * JetBrains Mono for anything that is a value rather than prose.
 */
const sans = Sora({
  variable: "--font-sans-stack",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono-stack",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [
    "Electronics 101",
    "RF engineering",
    "RF microwave course",
    "antenna design course",
    "HFSS course",
    "RF workshop",
    "antenna design workshop",
    "electronics courses",
    "RF simulation",
    "microwave engineering",
    "RFIC",
    "MMIC",
    "PCB EMI EMC",
    "semiconductor technology",
  ],
  authors: [{ name: site.name }],
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    images: ["/images/og-default.jpg"],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#070b14" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
  // zoom is never disabled — that locks out anyone who needs to magnify
  width: "device-width",
  initialScale: 1,
};

/**
 * Applied before first paint so a stored theme does not flash. It has to run
 * ahead of hydration, which is why <html> carries suppressHydrationWarning:
 * the server cannot know which theme this particular browser chose.
 */
const themeScript = `try{var t=localStorage.getItem('e101-theme');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: site.name,
    description: site.description,
    url: site.url,
    slogan: site.tagline,
    logo: `${site.url}/brand/icon-512.png`,
    // Social profiles, so search engines can tie the site to its accounts.
    // Derived from the socials config, so it only ever lists live links.
    sameAs: socials
      .map((s) => s.href)
      .filter((href): href is string => href !== null),
  };

  return (
    <html
      lang="en"
      className={`${sans.variable} ${mono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </head>
      <body className="flex min-h-full flex-col font-sans">
        <Navbar />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
