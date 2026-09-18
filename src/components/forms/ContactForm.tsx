"use client";

import { useState } from "react";
import { Field, inputClass } from "./Field";
import { Button } from "@/components/ui/primitives";

const CATEGORIES = [
  "General enquiry",
  "Course enquiry",
  "Workshop enquiry",
  "Corporate training",
  "Engineering services",
  "Mentorship",
  "Collaboration",
] as const;

type Errors = Partial<Record<"name" | "email" | "category" | "message", string>>;

/**
 * The enquiry form.
 *
 * NO BACKEND YET — submitting stores nothing and sends nothing. That is
 * stated to the user on success rather than faking a confirmation, because a
 * form that silently swallows an enquiry is worse than no form. Wiring it to
 * an API route or a form service is a single change to `submit()`.
 */
export function ContactForm({ defaultTopic }: { defaultTopic?: string }) {
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const validate = (data: FormData): Errors => {
    const next: Errors = {};
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const category = String(data.get("category") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (name.length < 2) next.name = "Please enter your name.";
    // deliberately permissive: the only reliable email test is sending one
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email))
      next.email = "Please enter an email address we can reply to.";
    if (!category) next.category = "Please choose what this is about.";
    if (message.length < 20)
      next.message =
        "Please give us a little more detail — at least a couple of sentences.";
    return next;
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const found = validate(data);
    setErrors(found);

    if (Object.keys(found).length) {
      // move focus to the first problem rather than leaving the user hunting
      const firstId = Object.keys(found)[0];
      form.querySelector<HTMLElement>(`#${firstId}`)?.focus();
      return;
    }

    setSending(true);
    // TODO: POST to /api/contact once a backend or form service is connected.
    await new Promise((r) => setTimeout(r, 600));
    setSending(false);
    setSent(true);
    form.reset();
  };

  if (sent) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-2xl border border-accent/40 bg-accent/10 p-8"
      >
        <h2 className="text-xl font-bold">Thank you — your details were validated</h2>
        <p className="mt-3 text-muted">
          One honest caveat: this form is not connected to a mailbox yet, so
          nothing has actually been sent. Until it is wired up, please reach out
          through the community channels listed in the footer.
        </p>
        <Button variant="secondary" className="mt-6" onClick={() => setSent(false)}>
          Write Another
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="name" label="Name" required error={errors.name}>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Your name…"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={inputClass(Boolean(errors.name))}
          />
        </Field>

        <Field id="email" label="Email" required error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            spellCheck={false}
            placeholder="you@example.com"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={inputClass(Boolean(errors.email))}
          />
        </Field>

        <Field id="whatsapp" label="WhatsApp" hint="Only if you would rather be reached there.">
          <input
            id="whatsapp"
            name="whatsapp"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            spellCheck={false}
            placeholder="+91 98765 43210"
            className={inputClass()}
          />
        </Field>

        <Field id="category" label="What is this about?" required error={errors.category}>
          <select
            id="category"
            name="category"
            defaultValue={defaultTopic && CATEGORIES.includes(defaultTopic as never) ? defaultTopic : ""}
            aria-invalid={Boolean(errors.category)}
            aria-describedby={errors.category ? "category-error" : undefined}
            // explicit colours: a native select inherits the OS theme otherwise
            style={{ backgroundColor: "var(--bg-elevated)", color: "var(--fg)" }}
            className={inputClass(Boolean(errors.category))}
          >
            <option value="">Choose one…</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field
        id="message"
        label="Message"
        required
        error={errors.message}
        hint="What are you trying to do, and where are you stuck?"
      >
        <textarea
          id="message"
          name="message"
          rows={6}
          placeholder="Describe the problem rather than the solution…"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : "message-hint"}
          className={inputClass(Boolean(errors.message))}
        />
      </Field>

      {defaultTopic ? (
        <input type="hidden" name="topic" value={defaultTopic} />
      ) : null}

      <div className="flex flex-wrap items-center gap-4">
        {/* stays enabled until the request actually starts */}
        <Button type="submit" size="lg" disabled={sending}>
          {sending ? "Sending…" : "Send Enquiry"}
        </Button>
        <p className="text-xs text-faint">
          Expect a reply within two working days.
        </p>
      </div>
    </form>
  );
}
