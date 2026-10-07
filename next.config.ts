import type { NextConfig } from "next";

/**
 * Built as a fully static site so it can be served from GitHub Pages.
 *
 * The site is served from the root of its own domain (public/CNAME), so
 * BASE_PATH is unset and `basePath` is empty.
 *
 * It stays configurable because a GitHub Pages PROJECT site is served from a
 * subpath — https://<user>.github.io/Electronics101-web — where `basePath`
 * and `assetPrefix` must equal the repository name or every link and asset
 * 404s. Setting BASE_PATH in the deploy workflow restores that mode; leaving
 * it unset keeps a local `npm run dev` on "/" either way.
 */
const basePath = process.env.BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath || undefined,
  images: {
    // Pages has no server, so Next's image optimizer cannot run. Images are
    // served as authored, which is why the sources are kept sensibly sized
    // rather than relying on resizing at request time.
    unoptimized: true,
  },
  // every route becomes a folder with an index.html, so URLs resolve without
  // a server rewriting extensionless paths
  trailingSlash: true,
  env: {
    /**
     * `basePath` is applied to <Link> and to routing, but NOT to an image
     * `src` when `unoptimized` is set — those are emitted verbatim. So the
     * same value is exposed to the client and applied by `asset()` in
     * src/lib/paths.ts. One env var, both halves.
     */
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
