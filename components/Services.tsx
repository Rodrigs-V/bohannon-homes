"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";

import SectionHeading from "@/components/SectionHeading";
import { services } from "@/lib/services";

/**
 * WHAT WE DO — three full-width photographs stacked as a vertical
 * accordion; hovering, focusing, or tapping one division grows its row and
 * reveals its own description and capability list, while the other two
 * compress to a title strip. The same idea as Bozzuto's "Our Companies"
 * hover row, turned on its side, in this site's own type and colour.
 *
 * Copy is the client's own (lib/services.ts) — lede and capability chips
 * are their own sentences, split into their parts, never expanded into
 * services they have not advertised. See lib/services.ts for the note on
 * why the photographs are real community shots rather than stock or
 * invented staff/job-site imagery.
 *
 * One row is always open (the first, until the visitor picks another), and
 * leaving the section keeps the last choice rather than snapping back —
 * the grid has a fixed height and rows only trade space, so nothing below
 * the section moves. See .services-grid in globals.css.
 */
export default function Services() {
  const [activeIndex, setActiveIndex] = useState(0);

  const gridStyle: CSSProperties & Record<"--services-rows", string> = {
    "--services-rows": services
      .map((_, i) => (i === activeIndex ? "minmax(0, 3.4fr)" : "minmax(0, 1fr)"))
      .join(" "),
  };

  return (
    <section id="what-we-do" className="bg-surface-alt py-20 md:py-28">
      <div className="shell">
        <SectionHeading
          eyebrow="What we do"
          title="Three divisions, one company."
          intro="The same team plans a site, builds it, and then runs it for the next twenty years — which is why the construction division and the management division actually talk to each other."
        />
      </div>

      <div className="shell-wide mt-14 md:mt-20">
        <div className="services-grid" style={gridStyle}>
          {services.map((s, i) => {
            const active = activeIndex === i;

            return (
              <button
                key={s.id}
                type="button"
                onMouseEnter={() => setActiveIndex(i)}
                onFocus={() => setActiveIndex(i)}
                onClick={() => setActiveIndex(i)}
                aria-expanded={active}
                data-active={active}
                className="services-card relative h-full min-h-0 w-full overflow-hidden rounded-[var(--radius-card)] bg-night text-left"
              >
                <Image
                  src={s.photo}
                  alt={s.photoAlt}
                  fill
                  sizes="(min-width: 90rem) 88rem, 100vw"
                  className="object-cover"
                />

                <div
                  aria-hidden="true"
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(0deg, rgba(20,17,14,0.82) 0%, rgba(20,17,14,0.35) 45%, rgba(20,17,14,0) 75%), linear-gradient(90deg, rgba(20,17,14,0.5) 0%, rgba(20,17,14,0.1) 60%)",
                  }}
                />

                <div className="relative flex h-full flex-col justify-end gap-4 px-5 py-4 md:flex-row md:items-end md:justify-between md:gap-10 md:px-9 md:py-6">
                  <div className="flex items-baseline gap-4 md:gap-6">
                    <p className="t-figure text-2xl text-white/70 md:text-4xl">{s.number}</p>
                    <h3 className="t-display-md text-[clamp(1.375rem,3vw,2.25rem)] text-ink-inverse">
                      {s.name}
                    </h3>
                    <span
                      aria-hidden="true"
                      className={`text-ink-inverse transition-all duration-300 ${
                        active ? "translate-x-0 opacity-100" : "-translate-x-1 opacity-0"
                      }`}
                    >
                      ↗
                    </span>
                  </div>

                  <div className="services-detail md:max-w-xl">
                    <div>
                      <p className="text-[0.9375rem] leading-relaxed text-ink-inverse-muted">
                        {s.lede}
                      </p>
                      <ul className="mt-4 flex flex-wrap gap-x-2 gap-y-2">
                        {s.capabilities.map((c) => (
                          <li
                            key={c}
                            className="rounded-[var(--radius-card)] border border-white/25 bg-white/10 px-2.5 py-1 text-[0.75rem] text-ink-inverse-muted backdrop-blur-sm"
                          >
                            {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
