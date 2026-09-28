import CommunitiesCarousel from "@/components/CommunitiesCarousel";
import SectionHeading from "@/components/SectionHeading";
import { markets } from "@/lib/communities";

/**
 * THE COMMUNITIES — all eight, with the client's own photography, in an
 * auto-advancing carousel (see components/CommunitiesCarousel.tsx for the
 * mechanics and the anti-fabrication note on what's overlaid on each card).
 *
 * The client's live site renders this list from an Apartments247 API at
 * runtime, which means it is invisible to crawlers and blank without
 * JavaScript. Here the same eight records are baked into lib/communities.ts
 * and server-rendered, so the communities are in the HTML.
 *
 * `markets` is derived from the list rather than typed out, so it cannot
 * disagree with the carousel beneath it. The carousel itself is edge-to-edge
 * (outside `.shell`) so its peek cards can bleed to the viewport edge; the
 * heading above and the controls below stay on the page grid.
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
      </div>

      <div className="mt-14">
        <CommunitiesCarousel />
      </div>
    </section>
  );
}
