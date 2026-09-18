"use client";

import { useSearchParams } from "next/navigation";
import { ContactForm } from "@/components/forms/ContactForm";

/**
 * Reads `?topic=` on the client.
 *
 * The parent page is statically exported, so the query string cannot be read
 * during the build — it only exists in the visitor's browser. Reading it here
 * keeps the page static while still letting "Request Consultation" links from
 * the services page pre-select what the enquiry is about.
 *
 * Must be rendered inside a <Suspense> boundary: useSearchParams suspends
 * during prerender.
 */
export function ContactPageBody() {
  const topic = useSearchParams().get("topic") ?? undefined;
  return <ContactForm defaultTopic={topic} />;
}
