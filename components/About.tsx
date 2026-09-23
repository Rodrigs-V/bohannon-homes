import Image from "next/image";

import SectionHeading from "@/components/SectionHeading";
import { company, coreValues } from "@/lib/company";

/**
 * WHO THEY ARE — the client's own three paragraphs, plus their four core
 * values numbered down the right.
 *
 * The prose in lib/company.ts is quoted from the client's homepage rather
 * than rewritten, so nothing here claims anything they do not already claim
 * publicly. The values are likewise verbatim and in their own order.
 *
 * The photograph is one of the client's own community grounds shots from
 * their homepage carousel — a 2200×664 banner crop, which is why it is used
 * as a wide letterbox here rather than forced into a portrait frame.
 */
export default function About() {
  return (
    <section id="about" className="bg-surface py-20 md:py-28">
      <div className="shell">
        <div className="grid gap-12 md:grid-cols-[1.15fr_1fr] md:gap-16">
          <div>
            <SectionHeading
              eyebrow="Who we are"
              title={
                <>
                  A development firm that never
                  <br className="hidden lg:block" /> handed off the keys.
                </>
              }
            />

            <div className="t-prose mt-7 space-y-5 text-[1.0625rem] leading-relaxed text-ink-muted">
              <p>{company.summary}</p>
              <p>{company.systems}</p>
              <p className="font-medium text-ink">{company.philosophy}</p>
            </div>
          </div>

          <div className="md:pt-4">
            <p className="t-label text-ink-muted">Our core values</p>
            <ol className="mt-6">
              {coreValues.map((value, i) => (
                <li
                  key={value}
                  className="grid grid-cols-[2.5rem_1fr] items-baseline gap-4 border-t border-hairline py-5 last:border-b"
                >
                  <span className="t-figure text-2xl text-brand">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[0.9375rem] leading-relaxed text-ink">{value}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      {/* Wide letterbox — the source file is a 2200×664 banner, so it is used
          at the ratio it was shot for instead of being cropped to a square. */}
      <div className="shell-wide mt-16 md:mt-20">
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
    </section>
  );
}
