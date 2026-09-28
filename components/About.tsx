import Image from "next/image";

import SectionHeading from "@/components/SectionHeading";
import { company, coreValues, states } from "@/lib/company";
import { communities } from "@/lib/communities";

/**
 * WHO WE ARE + THE PORTFOLIO — one split band. From `lg` up the section is
 * divided exactly down the middle of the viewport: the left half white, with
 * the client's own three paragraphs and their four core values beneath; the
 * right half night, carrying the portfolio figures in the same editorial
 * stat-stack style the standalone Portfolio section used. Below `lg` the two
 * halves stack, white then night, each running edge to edge. See
 * `.split-band` in globals.css for how the divide lines up with the page grid.
 *
 * The prose and values in lib/company.ts are quoted from the client's
 * homepage rather than rewritten, and the values keep their own order.
 *
 * EVERY FIGURE IS SOURCED. 1980, 14,000+ and the nine states are the client's
 * own homepage claims (lib/company.ts). The community count is derived from
 * lib/communities.ts — `communities.length`, not a typed-in number — so it
 * cannot fall out of step with the carousel further down the page.
 *
 * The photograph is one of the client's own community grounds shots from
 * their homepage carousel — a 2200×664 banner crop, so it runs as a wide
 * letterbox under the band rather than being forced into a portrait frame.
 */

type Figure = {
  value: string;
  label: string;
  note: string;
};

const figures: Figure[] = [
  {
    value: String(company.founded),
    label: "Founded",
    note: `Started in El Paso by ${company.founder}, and still run by the family.`,
  },
  {
    value: "14,000+",
    label: "Multi-family units",
    note: "Developed, constructed and/or managed since the company began.",
  },
  {
    value: String(states.length),
    label: "States",
    note: states.join(" · "),
  },
  {
    value: String(communities.length),
    label: "Communities today",
    note: "Under Bohannon management right now, across three markets.",
  },
];

export default function About() {
  return (
    <section id="about" className="split-band">
      <div className="shell grid lg:grid-cols-2">
        {/* ── Left: who we are ──────────────────────────────────────────── */}
        <div className="py-14 md:py-16 lg:pr-14 xl:pr-20">
          <SectionHeading
            eyebrow="Who we are"
            title="A development firm that never handed off the keys."
          />

          <div className="t-prose mt-7 space-y-5 text-[1.0625rem] leading-relaxed text-ink-muted">
            <p>{company.summary}</p>
            <p>{company.systems}</p>
            <p className="font-medium text-ink">{company.philosophy}</p>
          </div>

          <p className="t-label mt-10 text-ink-muted">Our core values</p>
          <ol className="mt-5 grid gap-x-8 sm:grid-cols-2">
            {coreValues.map((value, i) => (
              <li
                key={value}
                className="grid grid-cols-[2.25rem_1fr] items-baseline gap-3 border-t border-hairline py-5"
              >
                <span className="t-figure text-2xl text-brand">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[0.9375rem] leading-relaxed text-ink">{value}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* ── Right: the portfolio ──────────────────────────────────────── */}
        <div
          id="portfolio"
          className="split-band-dark on-dark py-14 text-ink-inverse md:py-16 lg:pl-14 xl:pl-20"
        >
          <SectionHeading
            tone="light"
            eyebrow="The portfolio"
            // No year count in this headline on purpose: the hero already
            // derives one from lib/company.ts, and a second, hand-typed one
            // here would silently disagree with it every January.
            title="The record, counted plainly."
            intro="Single family, commercial, retail and land development alongside the apartment communities — across nine states."
          />

          <dl className="mt-8">
            {figures.map((f) => (
              <div key={f.label} className="figure-row grid gap-y-2 py-6 md:py-7">
                <dt className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
                  <span className="t-figure text-[clamp(3rem,6.5vw,5.25rem)]">{f.value}</span>
                  <span className="t-label text-ink-inverse-muted">{f.label}</span>
                </dt>
                <dd className="max-w-[44ch] text-[0.9375rem] leading-relaxed text-ink-inverse-muted">
                  {f.note}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Wide letterbox — the source file is a 2200×664 banner, so it is used
          at the ratio it was shot for instead of being cropped to a square. */}
      <div className="bg-surface pb-14 md:pb-16">
        <div className="shell-wide pt-10 md:pt-12">
          <div className="relative aspect-[2200/664] w-full overflow-hidden rounded-[var(--radius-card)] bg-surface-alt">
            <Image
              src="/images/site/grounds-1.jpg"
              alt="Landscaped grounds and walkways at a Bohannon Development community"
              fill
              sizes="(min-width: 1536px) 96rem, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
