"use client";

import { useId, useState, type FormEvent } from "react";

import { company } from "@/lib/company";
import { services } from "@/lib/services";

type Status = { tone: "ok" | "info"; text: string } | null;

/**
 * QUOTE / INQUIRY FORM.
 *
 * NOT CONNECTED YET — DELIBERATELY. The client has no general inbox and no
 * form service, so there is nowhere real to send this. `company.inquiryEmail`
 * in lib/company.ts is null until they choose one. While it is null the form
 * says so, visibly, beside the button, and a submit tells the visitor to call
 * instead. It never claims a message was sent.
 *
 * Once `inquiryEmail` is set, a submit opens the visitor's own email app with
 * the message filled in (a `mailto:`). That still needs no backend. To take
 * submissions directly instead, point `handleSubmit` at a form service or a
 * route handler; the fields don't need to change.
 *
 * The inquiry types are the three divisions from lib/services.ts plus
 * "Something else", so the form can't offer a service the client doesn't.
 */
export default function ContactForm() {
  const id = useId();
  const [status, setStatus] = useState<Status>(null);
  const connected = company.inquiryEmail !== null;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const get = (k: string) => String(data.get(k) ?? "").trim();

    if (!company.inquiryEmail) {
      setStatus({
        tone: "info",
        text: `Online inquiries aren't switched on yet. Please call the office at ${company.phone}. Your message is still in the form, so you can copy it.`,
      });
      return;
    }

    const topic = get("topic");
    const subject = `Website inquiry: ${topic}`;
    const body = [
      get("message"),
      "",
      "—",
      `Name: ${get("name")}`,
      `Email: ${get("email")}`,
      get("phone") ? `Phone: ${get("phone")}` : "",
      get("company") ? `Company: ${get("company")}` : "",
    ]
      .filter((line, i, arr) => line !== "" || arr[i - 1] !== "")
      .join("\n");

    window.location.href = `mailto:${company.inquiryEmail}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    setStatus({
      tone: "ok",
      text: `Your email app should open with this message ready to send. If it didn't, email ${company.inquiryEmail} or call ${company.phone}.`,
    });
  };

  const field =
    "mt-2 block w-full rounded-[var(--radius-card)] border border-white/20 bg-white/[0.04] px-3.5 py-3 text-[0.9375rem] text-ink-inverse placeholder:text-ink-inverse-muted/60 transition-colors focus:border-white/60 focus:outline-none";

  return (
    <form onSubmit={handleSubmit} className="grid gap-5">
      <div>
        <p className="t-label text-ink-inverse-muted">Start a quote or inquiry</p>
        <p className="mt-2 text-[0.9375rem] text-ink-inverse-muted">
          Tell us about the site, the project, or the property.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label htmlFor={`${id}-name`} className="text-[0.8125rem] text-ink-inverse">
          Name
          <input id={`${id}-name`} name="name" required autoComplete="name" className={field} />
        </label>
        <label htmlFor={`${id}-email`} className="text-[0.8125rem] text-ink-inverse">
          Email
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            required
            autoComplete="email"
            className={field}
          />
        </label>
        <label htmlFor={`${id}-phone`} className="text-[0.8125rem] text-ink-inverse">
          Phone <span className="text-ink-inverse-muted">(optional)</span>
          <input
            id={`${id}-phone`}
            name="phone"
            type="tel"
            autoComplete="tel"
            className={field}
          />
        </label>
        <label htmlFor={`${id}-company`} className="text-[0.8125rem] text-ink-inverse">
          Company <span className="text-ink-inverse-muted">(optional)</span>
          <input
            id={`${id}-company`}
            name="company"
            autoComplete="organization"
            className={field}
          />
        </label>
      </div>

      <label htmlFor={`${id}-topic`} className="text-[0.8125rem] text-ink-inverse">
        What it&rsquo;s about
        <span className="relative block">
          <select id={`${id}-topic`} name="topic" required defaultValue="" className={`${field} appearance-none pr-10`}>
            <option value="" disabled className="text-ink">
              Choose one
            </option>
            {services.map((s) => (
              <option key={s.id} value={s.name} className="text-ink">
                {s.name}
              </option>
            ))}
            <option value="Something else" className="text-ink">
              Something else
            </option>
          </select>
          <svg
            aria-hidden="true"
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            className="pointer-events-none absolute right-3.5 top-1/2 mt-1 -translate-y-1/2 text-ink-inverse-muted"
          >
            <path d="M3 6l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </label>

      <label htmlFor={`${id}-message`} className="text-[0.8125rem] text-ink-inverse">
        Message
        <textarea
          id={`${id}-message`}
          name="message"
          required
          rows={6}
          placeholder="Location, size, timeline, and anything else that helps us quote."
          className={`${field} resize-y`}
        />
      </label>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
        <button type="submit" className="btn btn-brand">
          Send inquiry
        </button>
        {!connected ? (
          <p className="unconfirmed unconfirmed-on-dark text-[0.75rem]">
            {company.inquiryEmailNote} — this form isn&rsquo;t connected yet.
          </p>
        ) : null}
      </div>

      <p
        aria-live="polite"
        className={`text-[0.875rem] ${status?.tone === "ok" ? "text-ink-inverse" : "text-ink-inverse-muted"}`}
      >
        {status?.text}
      </p>
    </form>
  );
}
