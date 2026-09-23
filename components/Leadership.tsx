import SectionHeading from "@/components/SectionHeading";
import { initials, leaders } from "@/lib/leadership";

/**
 * LEADERSHIP — six real people, with the client's own biographies.
 *
 * NO HEADSHOTS EXIST. The client publishes none anywhere on their site, so
 * none are shown. Each card carries a typographic monogram instead of a stock
 * portrait standing in for a real person — inventing a face for a named
 * executive is the single worst thing this page could do. When the client
 * supplies real headshots, `photo` in lib/leadership.ts is where they go.
 *
 * Bios are quoted and trimmed, never embellished: every credential, date and
 * award below appears on bohannondevelopment.com/aboutus/.
 */
export default function Leadership() {
  return (
    <section id="leadership" className="bg-surface-alt py-20 md:py-28">
      <div className="shell">
        <SectionHeading
          eyebrow="Leadership"
          title="The people who sign the drawings."
          intro="The executive team takes part in pre-construction planning and in day-to-day property management — the same people, on both ends of a building's life."
        />

        <div className="mt-14 grid gap-x-10 gap-y-12 md:grid-cols-2 md:mt-20">
          {leaders.map((leader) => (
            <article key={leader.name} className="border-t border-hairline pt-7">
              <div className="flex items-start gap-5">
                {/* Monogram, not a portrait. See the note at the top of this
                    file — there are no real headshots to use. */}
                <span
                  aria-hidden="true"
                  className="t-figure grid h-14 w-14 shrink-0 place-items-center rounded-[var(--radius-card)] bg-brand text-xl text-ink-inverse"
                >
                  {initials(leader.name)}
                </span>

                <div className="min-w-0">
                  <h3 className="t-display-md text-2xl text-ink">{leader.name}</h3>
                  <p className="t-label mt-1.5 text-brand">{leader.title}</p>
                </div>
              </div>

              <p className="mt-5 text-[0.9375rem] leading-relaxed text-ink-muted">
                {leader.bio}
              </p>

              {leader.email ? (
                <a
                  href={`mailto:${leader.email}`}
                  className="mt-4 inline-block break-all text-[0.875rem] font-medium text-brand underline-offset-4 hover:underline"
                >
                  {leader.email}
                </a>
              ) : null}
            </article>
          ))}
        </div>

        <p className="mt-12 text-[0.8125rem] text-ink-muted">
          Headshots are not published by the company; these cards use initials
          until real photographs are supplied.
        </p>
      </div>
    </section>
  );
}
