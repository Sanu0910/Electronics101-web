/**
 * Prefix a path in /public with the deployment's base path.
 *
 * GitHub Pages serves this project from a subpath, and while Next applies
 * `basePath` to routing and <Link>, it does NOT apply it to an image `src`
 * when `images.unoptimized` is set — those are written into the HTML exactly
 * as given. Without this the logo and every photograph 404 in production
 * while working perfectly in local dev, which is a nasty way to find out.
 *
 * Use it for anything that resolves to a file in /public: image sources,
 * download links, favicons referenced by hand.
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const asset = (path?: string | null) => {
  if (!path) return path ?? undefined;
  // leave absolute URLs and data URIs alone
  if (/^([a-z]+:)?\/\//i.test(path) || path.startsWith("data:")) return path;
  return `${basePath}${path.startsWith("/") ? "" : "/"}${path}`;
};
