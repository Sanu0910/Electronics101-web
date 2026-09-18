"use client";

import { useState } from "react";
import { Field, inputClass } from "./Field";
import { Button } from "@/components/ui/primitives";
import { cn } from "@/lib/utils";

type Errors = Partial<Record<"name" | "programme" | "rating" | "feedback", string>>;

/**
 * Feedback submission.
 *
 * The rating is a radio group, not a row of clickable spans — so it is
 * keyboard-operable and announced as "3 of 5" by a screen reader. The stars
 * are the visual layer on top of real inputs.
 *
 * NO BACKEND YET: nothing is stored. Said plainly on success rather than
 * pretending a review was received.
 */
export function FeedbackForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [rating, setRating] = useState(0);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const next: Errors = {};
    if (String(data.get("name") ?? "").trim().length < 2)
      next.name = "Please enter your name.";
    if (!String(data.get("programme") ?? "").trim())
      next.programme = "Which course or workshop was this?";
    if (!rating) next.rating = "Please choose a rating.";
    if (String(data.get("feedback") ?? "").trim().length < 20)
      next.feedback = "A couple of sentences at least, so it is useful.";

    setErrors(next);
    if (Object.keys(next).length) {
      const firstId = Object.keys(next)[0];
      form.querySelector<HTMLElement>(`#${firstId}`)?.focus();
      return;
    }

    setSending(true);
    // TODO: POST to /api/feedback; entries arrive with published = false.
    await new Promise((r) => setTimeout(r, 600));
    setSending(false);
    setSent(true);
    form.reset();
    setRating(0);
  };

  if (sent) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-2xl border border-accent/40 bg-accent/10 p-8"
      >
        <h2 className="text-xl font-bold">Thank you</h2>
        <p className="mt-3 text-muted">
          To be straight with you: submissions are not stored yet, because the
          backend is not connected. Once it is, feedback will go into a review
          queue and appear here only after approval.
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
            className={inputClass(Boolean(errors.name))}
          />
        </Field>

        <Field id="role" label="You are a">
          <select
            id="role"
            name="role"
            defaultValue="Student"
            style={{ backgroundColor: "var(--bg-elevated)", color: "var(--fg)" }}
            className={inputClass()}
          >
            <option>Student</option>
            <option>Professional</option>
          </select>
        </Field>
      </div>

      <Field id="programme" label="Programme" required error={errors.programme}>
        <input
          id="programme"
          name="programme"
          type="text"
          placeholder="e.g. RF & Microwave Antenna Design workshop"
          aria-invalid={Boolean(errors.programme)}
          className={inputClass(Boolean(errors.programme))}
        />
      </Field>

      <fieldset>
        <legend className="block text-sm font-medium">
          Rating
          <span className="ml-1 text-accent" aria-hidden="true">
            *
          </span>
        </legend>
        <div className="mt-2 flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <label
              key={n}
              className="cursor-pointer p-1 text-2xl leading-none"
              title={`${n} out of 5`}
            >
              <input
                type="radio"
                name="rating"
                value={n}
                checked={rating === n}
                onChange={() => setRating(n)}
                className="sr-only"
              />
              <span
                aria-hidden="true"
                className={cn(
                  "transition-colors duration-150",
                  n <= rating ? "text-accent" : "text-faint opacity-40",
                )}
              >
                ★
              </span>
              <span className="sr-only">{n} out of 5</span>
            </label>
          ))}
        </div>
        {errors.rating ? (
          <p className="mt-1.5 text-xs font-medium text-stop-400">{errors.rating}</p>
        ) : null}
      </fieldset>

      <Field id="feedback" label="Feedback" required error={errors.feedback}>
        <textarea
          id="feedback"
          name="feedback"
          rows={5}
          placeholder="What worked, and what did not…"
          aria-invalid={Boolean(errors.feedback)}
          className={inputClass(Boolean(errors.feedback))}
        />
      </Field>

      <label className="flex items-start gap-3 rounded-xl border border-line p-4">
        <input
          type="checkbox"
          name="permission"
          className="mt-0.5 size-4 shrink-0 accent-[var(--accent)]"
        />
        <span className="text-sm text-muted">
          You may publish this feedback, with my name and programme, on the site.
        </span>
      </label>

      <Button type="submit" size="lg" disabled={sending}>
        {sending ? "Submitting…" : "Submit Feedback"}
      </Button>
    </form>
  );
}
