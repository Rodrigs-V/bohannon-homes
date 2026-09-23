import SectionHeading from "@/components/SectionHeading";
import { services } from "@/lib/services";

/**
 * WHAT WE DO — the three divisions, as three numbered horizontal bands.
 *
 * Copy is the client's own (lib/services.ts). The capability lists are their
 * own sentences split into their parts, not an expanded menu of services they
 * have never advertised.
 *
 * The layout is a full-width row per division rather than three equal cards,
 * because the three are not equal: Development is the parent discipline and
 * the other two are the arms that execute it. Numbering them 01/02/03 in the
 * display serif says that without a paragraph explaining it.
 */
export default function Services() {
  return (
    <section id="what-we-do" className="bg-surface-alt py-20 md:py-28">
      <div className="shell">
        <SectionHeading
          eyebrow="What we do"
          title="Three divisions, one company."
          intro="The same team plans a site, builds it, and then runs it for the next twenty years — which is why the construction division and the management division actually talk to each other."
        />

        <div className="mt-14 md:mt-20">
          {services.map((s) => (
            <article
              key={s.id}
              id={s.id}
              className="grid gap-6 border-t border-hairline py-10 last:border-b md:grid-cols-[5rem_minmax(0,1.05fr)_minmax(0,1fr)] md:gap-10 md:py-14"
            >
              <p className="t-figure text-4xl text-brand md:text-5xl">{s.number}</p>

              <div>
                <h3 className="t-display-md text-[clamp(1.75rem,3.2vw,2.5rem)] text-ink">
                  {s.name}
                </h3>
                <p className="t-prose-tight mt-4 text-[1.0625rem] leading-relaxed text-ink">
                  {s.lede}
                </p>
              </div>

              <div>
                <div className="space-y-4 text-[0.9375rem] leading-relaxed text-ink-muted">
                  {s.body.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>

                <ul className="mt-6 flex flex-wrap gap-x-2 gap-y-2">
                  {s.capabilities.map((c) => (
                    <li
                      key={c}
                      className="rounded-[var(--radius-card)] border border-hairline bg-surface px-3 py-1.5 text-[0.8125rem] text-ink-muted"
                    >
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
