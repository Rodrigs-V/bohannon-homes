import Image from "next/image";

import type { Community } from "@/lib/communities";

/**
 * One community. The photograph is the client's own hero shot for that
 * community; the figures underneath are whatever the client actually
 * publishes for it.
 *
 * NOT INVENTED. Two of the eight communities do not publish a unit count, so
 * `units` is null for them and the card falls back to the floor-plan count
 * rather than printing a guessed number. Nothing renders an em-dash into a
 * slot that looks like it should hold a figure.
 *
 * The whole card is a link to that community's own leasing site, which is
 * where a prospective resident actually needs to end up.
 */
export default function CommunityCard({ community }: { community: Community }) {
  const { name, city, state, type, units, floorPlans, description, photo, website } = community;

  return (
    <a
      href={website}
      target="_blank"
      rel="noreferrer"
      className="card group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
    >
      <div className="card-frame rounded-[var(--radius-card)]">
        <Image
          src={photo}
          alt={`${name} in ${city}, ${state}`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
        <span className="absolute left-3 top-3 rounded-[var(--radius-card)] bg-night/75 px-2.5 py-1 text-[0.6875rem] font-medium tracking-wide text-ink-inverse backdrop-blur-sm">
          {city}, {state}
        </span>
      </div>

      <div className="pt-5">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="t-display-md text-2xl text-ink group-hover:text-brand">{name}</h3>
          <span
            aria-hidden="true"
            className="translate-x-0 text-ink-muted transition-transform duration-300 group-hover:translate-x-1 group-hover:text-brand"
          >
            ↗
          </span>
        </div>

        <p className="t-label mt-2 text-ink-muted">{type}</p>

        <p className="mt-3 line-clamp-3 text-[0.9375rem] leading-relaxed text-ink-muted">
          {description}
        </p>

        <dl className="mt-4 flex flex-wrap items-baseline gap-x-6 gap-y-1 border-t border-hairline pt-4 text-[0.8125rem]">
          {units !== null ? (
            <div className="flex items-baseline gap-1.5">
              <dt className="sr-only">Units</dt>
              <dd className="font-medium text-ink">{units}</dd>
              <span className="text-ink-muted">units</span>
            </div>
          ) : null}
          {floorPlans !== null ? (
            <div className="flex items-baseline gap-1.5">
              <dt className="sr-only">Floor plans</dt>
              <dd className="font-medium text-ink">{floorPlans}</dd>
              <span className="text-ink-muted">floor plans</span>
            </div>
          ) : null}
        </dl>
      </div>
    </a>
  );
}
