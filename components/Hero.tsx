"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { company, yearsInBusiness } from "@/lib/company";
import { heroCommunities } from "@/lib/communities";

const INTERVAL_MS = 6500;

/**
 * HERO — full-bleed, everything centred under the centred mark.
 *
 * Every frame is a REAL PHOTOGRAPH OF A REAL BOHANNON COMMUNITY, taken from
 * the client's own community sites (see lib/communities.ts). No stock. The
 * caption at the foot of the frame names the community currently on screen,
 * so no photograph is ever passed off as something it is not.
 *
 * All frames are mounted at once and only opacity changes, so the cross-fade
 * never waits on a network request. The first frame is `priority`; the rest
 * load lazily behind it.
 */
export default function Hero() {
  const [index, setIndex] = useState(0);

  /**
   * Which frames have actually finished decoding. The auto-advance skips to
   * the next LOADED frame rather than the next frame, because the caption
   * underneath names the community on screen: advancing the caption to a
   * photograph that has not arrived yet would label Fox Bridge North's pool
   * as Ridgeline West. Eager loading makes that unlikely; this makes it
   * impossible. A ref, not state — nothing re-renders when a frame lands.
   */
  const loadedRef = useRef<boolean[]>(heroCommunities.map(() => false));

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return; // One photograph, held. No carousel for reduced motion.

    const id = window.setInterval(() => {
      setIndex((i) => {
        const n = heroCommunities.length;
        for (let step = 1; step <= n; step += 1) {
          const candidate = (i + step) % n;
          if (loadedRef.current[candidate]) return candidate;
        }
        return i; // Nothing else is ready — hold this frame and its caption.
      });
    }, INTERVAL_MS);

    return () => window.clearInterval(id);
  }, []);

  const current = heroCommunities[index];

  return (
    <section
      id="top"
      className="on-dark relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-night text-ink-inverse"
    >
      {heroCommunities.map((c, i) => {
        const active = i === index;
        return (
          <div
            key={c.slug}
            aria-hidden={!active}
            className={`hero-frame absolute inset-0 -z-10 ${
              active ? "hero-frame-active opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={c.photo}
              alt={active ? `${c.name} — ${c.city}, ${c.state}` : ""}
              fill
              sizes="100vw"
              priority={i === 0}
              // Every frame loads eagerly, not just the first. The caption
              // below names the community currently on screen, so a frame that
              // has not arrived yet would leave the previous photograph under
              // the NEXT community's name — the one mislabel this section
              // cannot afford. Four images, all above the fold; eager is cheap
              // and it keeps the caption truthful.
              loading="eager"
              onLoad={() => {
                loadedRef.current[i] = true;
              }}
              className="object-cover"
            />
          </div>
        );
      })}

      {/* Scrim. Two jobs: hold the bar's links at the top, and carry the
          headline block at the foot. It lifts through the upper-middle so the
          architecture — the actual subject — still reads, then deepens from
          just below centre. The eyebrow and the rule sit at ~62% down, which
          is why the ramp starts before them rather than at the last quarter:
          bone-coloured 11px type over sunlit stucco needs the density. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(to bottom, rgba(20,17,14,0.62) 0%, rgba(20,17,14,0.26) 22%, rgba(20,17,14,0.46) 48%, rgba(20,17,14,0.72) 72%, rgba(20,17,14,0.92) 100%)",
        }}
      />

      <div className="shell-wide w-full pb-14 pt-[calc(var(--bar)+3rem)] md:pb-20">
        <div className="rise max-w-4xl">
          <span className="rule rule-light" />
          <p className="t-label mt-5 text-ink-inverse-muted">
            El Paso, Texas · Established {company.founded}
          </p>

          <h1 className="t-display mt-5 text-[clamp(2.75rem,8vw,6.5rem)]">
            {yearsInBusiness()} years of building
            <br className="hidden sm:block" />{" "}
            <span className="italic">places people stay.</span>
          </h1>

          <p className="t-prose mt-7 text-[1.0625rem] text-ink-inverse-muted md:text-lg">
            A full service real estate development, construction and property
            management firm — founded in {company.founded} by {company.founder},
            and still run by the family that started it.
          </p>
        </div>

        {/* Caption + frame indicators. The caption is load-bearing: it names
            the community in the photograph rather than letting a reader
            assume the image is generic. */}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-white/18 pt-4">
          <p className="text-xs text-ink-inverse-muted" aria-live="polite">
            Pictured: <span className="text-ink-inverse">{current.name}</span> ·{" "}
            {current.city}, {current.state}
          </p>

          <ul className="flex items-center gap-2" aria-label="Hero photographs">
            {heroCommunities.map((c, i) => (
              <li key={c.slug}>
                <button
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-current={i === index}
                  aria-label={`Show ${c.name}`}
                  className={`block h-[3px] rounded-full transition-all duration-500 ${
                    i === index ? "w-10 bg-ink-inverse" : "w-5 bg-white/35 hover:bg-white/60"
                  }`}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
