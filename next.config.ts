import type { NextConfig } from "next";

/**
 * Built as a fully static site so it can be served from GitHub Pages.
 *
 * GitHub Pages serves a project site from a subpath —
 * https://<user>.github.io/Electronics101-web — so `basePath` and
 * `assetPrefix` must match the repository name or every link and asset 404s.
 * Both come from one env var set in the deploy workflow, so a local
 * `npm run dev` still serves from "/" with no special handling.
 *
 * When a custom domain is connected, drop BASE_PATH and update `site.url` in
 * src/config/site.ts.
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
