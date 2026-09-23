import CommunityCard from "@/components/CommunityCard";
import SectionHeading from "@/components/SectionHeading";
import { communities, markets } from "@/lib/communities";

/**
 * THE COMMUNITIES — all eight, with the client's own photography.
 *
 * The client's live site renders this list from an Apartments247 API at
 * runtime, which means it is invisible to crawlers and blank without
 * JavaScript. Here the same eight records are baked into lib/communities.ts
 * and server-rendered, so the communities are in the HTML.
 *
 * `markets` is derived from the list rather than typed out, so it cannot
 * disagree with the cards beneath it.
 */
export default function Communities() {
  return (
    <section id="communities" className="bg-surface py-20 md:py-28">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading
            eyebrow="Our communities"
            title="Where people live with us now."
            intro="Eight apartment communities under Bohannon management. Each one links through to its own leasing office."
          />

          <ul className="flex flex-wrap gap-x-2 gap-y-2">
            {markets.map((m) => (
              <li
                key={m}
                className="rounded-[var(--radius-card)] border border-hairline px-3 py-1.5 text-[0.8125rem] text-ink-muted"
              >
                {m}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {communities.map((c) => (
            <CommunityCard key={c.slug} community={c} />
          ))}
        </div>
      </div>
    </section>
  );
}
