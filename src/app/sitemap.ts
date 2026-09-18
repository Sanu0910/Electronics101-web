import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { series } from "@/content/series";
import { courses } from "@/content/courses";
import { workshops } from "@/content/workshops";
import { blogPosts } from "@/content/misc";

/**
 * Generated from the content layer, so a new course or series appears in the
 * sitemap automatically rather than having to be remembered by hand.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = [
    "",
    "/courses",
    "/workshops",
    "/series",
    "/study-material",
    "/services",
    "/mentorship",
    "/projects",
    "/blog",
    "/about",
    "/contact",
    "/feedback",
    "/links",
    "/legal/terms",
    "/legal/privacy",
    "/legal/refunds",
  ].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const dynamic = [
    ...series.map((s) => `/series/${s.slug}`),
    ...courses.map((c) => `/courses/${c.slug}`),
    ...workshops.map((w) => `/workshops/${w.slug}`),
    ...blogPosts.map((p) => `/blog/${p.slug}`),
  ].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...dynamic];
}
