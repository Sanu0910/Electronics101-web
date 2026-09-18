"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * next/image with a graceful fallback.
 *
 * Content files name the image each entry SHOULD have, and those files land
 * over time. A missing one makes the image optimizer return 400 and the card
 * shows a broken box — so on error this swaps to the drawn grid motif, which
 * is the same thing the card uses when it has no image at all.
 *
 * Client-side on purpose: checking the filesystem instead would make every
 * card server-only, and cards are rendered inside the client-side filter UI.
 */
export function SafeImage({
  src,
  sizes,
  className,
  priority,
  alt = "",
  /**
   * `cover` crops to fill — right for decorative backgrounds. `contain` shows
   * the whole image — right for a poster, where cropping would cut off the
   * information it exists to convey.
   */
  fit = "cover",
}: {
  src?: string | null;
  sizes: string;
  className?: string;
  priority?: boolean;
  alt?: string;
  fit?: "cover" | "contain";
}) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return <div className="absolute inset-0 bg-grid" aria-hidden="true" />;
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      onError={() => setFailed(true)}
      className={cn(fit === "cover" ? "object-cover" : "object-contain", className)}
    />
  );
}
