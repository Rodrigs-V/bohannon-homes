import SectionHeading from "@/components/SectionHeading";
import { company, states } from "@/lib/company";
import { communities } from "@/lib/communities";

/**
 * THE FIGURES — a night band of hairline-separated rows, each figure set
 * enormous in the display serif with its gloss sitting to the right.
 *
 * Deliberately NOT the four-across "icon above a number" card row that every
 * corporate site in this vertical uses; an editorial stat stack lets 14,000
 * actually be big, which is the only reason the number is worth printing.
 *
 * EVERY FIGURE IS SOURCED. 1980, 14,000+ and the nine states are the client's
 * own homepage claims (lib/company.ts). The community count is derived from
 * lib/communities.ts — it is `communities.length`, not a typed-in number, so
 * it cannot fall out of step with the grid further down the page.
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

export default function Portfolio() {
  return (
    <section id="portfolio" className="on-dark bg-night py-20 text-ink-inverse md:py-28">
      <div className="shell">
        <SectionHeading
          tone="light"
          eyebrow="The portfolio"
          // No year count in this headline on purpose: the hero already
          // derives one from lib/company.ts, and a second, hand-typed one
          // here would silently disagree with it every January.
          title="The record, counted plainly."
          intro="Single family, commercial, retail and land development alongside the apartment communities — across nine states."
        />

        <dl className="mt-14 md:mt-20">
          {figures.map((f) => (
            <div
              key={f.label}
              className="figure-row grid items-baseline gap-x-8 gap-y-2 py-7 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:py-9"
            >
              <dt className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
                <span className="t-figure text-[clamp(3.25rem,10vw,7rem)]">{f.value}</span>
                <span className="t-label text-ink-inverse-muted">{f.label}</span>
              </dt>
              <dd className="text-[0.9375rem] leading-relaxed text-ink-inverse-muted md:text-base">
                {f.note}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
