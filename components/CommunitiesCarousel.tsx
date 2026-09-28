"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type TransitionEvent as ReactTransitionEvent,
} from "react";

import { communities } from "@/lib/communities";

const COUNT = communities.length;
const DRAG_THRESHOLD_PX = 50;

/**
 * THREE COPIES OF THE LIST, BACK TO BACK. The strip only ever needs to move
 * one direction per step and never visibly snaps backwards. Render the list
 * three times (so consecutive DOM slides are always the correct neighbours,
 * wrapping included), slide to whichever DOM slide is next, and once that
 * slide lands in one of the outer copies, re-point `pos` at the matching
 * slide in the middle copy with every transition switched off for a frame —
 * it looks identical, so the jump is invisible.
 */
const TRIPLED = [...communities, ...communities, ...communities];

/**
 * THE CAROUSEL — one community centred and enlarged at a time, the next and
 * previous ones peeking at the edges, advancing every six seconds. Modelled
 * on Bozzuto's community carousel, adapted to this site's own type and
 * colour: Instrument Serif title, crimson progress fill.
 *
 * MOTION. The strip moves with a CSS `transform` transition (compositor-only,
 * so it stays smooth), not by animating `scrollLeft` — which fought native
 * scroll-snap every frame and stuttered. Everything that marks a card as
 * "active" — its scale, the blur on its photo, the caption over it — is a
 * transition on the same clock, and the caption fades in only after the card
 * has mostly arrived, so a new card is brought forward rather than cut to.
 * See the `.communities-*` rules in globals.css.
 *
 * TIMING. Autoplay is driven by the progress bar itself: when its fill
 * animation ends, the carousel advances. Pausing freezes the bar and the
 * timer together, and any manual move restarts both from zero.
 *
 * ESSENTIAL INFO, NOT INVENTED. The two facts overlaid are `units` and
 * `floorPlans` from lib/communities.ts. Where `units` is null (two
 * communities do not publish a count) that slot is simply omitted, never
 * guessed.
 */
export default function CommunitiesCarousel() {
  const [pos, setPos] = useState(COUNT); // DOM index into TRIPLED — starts at the middle copy's first slide.
  const [instant, setInstant] = useState(true); // true → all transitions off (first paint, loop correction).
  const [playing, setPlaying] = useState(true);
  const [cycle, setCycle] = useState(0); // bumps to restart the progress bar.

  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const drag = useRef<{ id: number; startX: number; dx: number; moved: boolean } | null>(null);
  const suppressClick = useRef(false);

  const realIndex = ((pos % COUNT) + COUNT) % COUNT;
  const current = communities[realIndex];

  const offsetFor = useCallback((i: number) => {
    const el = slideRefs.current[i];
    const viewport = viewportRef.current;
    if (!el || !viewport) return 0;
    return viewport.clientWidth / 2 - (el.offsetLeft + el.offsetWidth / 2);
  }, []);

  const applyTransform = useCallback(
    (extra = 0) => {
      const track = trackRef.current;
      if (track) track.style.transform = `translate3d(${offsetFor(pos) + extra}px,0,0)`;
    },
    [offsetFor, pos],
  );

  useLayoutEffect(() => {
    applyTransform();
  }, [applyTransform]);

  // Re-enable transitions two frames after an instant jump has painted.
  useEffect(() => {
    if (!instant) return;
    let inner = 0;
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => setInstant(false));
    });
    return () => {
      cancelAnimationFrame(outer);
      cancelAnimationFrame(inner);
    };
  }, [instant]);

  // Keep the active card centred when the viewport resizes.
  useEffect(() => {
    const onResize = () => {
      setInstant(true);
      applyTransform();
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [applyTransform]);

  const goToPos = useCallback((newPos: number) => {
    // Stay inside the three copies even under rapid clicking; the loop
    // correction pulls `pos` back to the middle copy once motion settles.
    const clamped = Math.max(1, Math.min(TRIPLED.length - 2, newPos));
    setPos(clamped);
    setCycle((c) => c + 1);
  }, []);

  const goNext = useCallback(() => goToPos(pos + 1), [goToPos, pos]);
  const goPrev = useCallback(() => goToPos(pos - 1), [goToPos, pos]);

  const handleTransitionEnd = (e: ReactTransitionEvent<HTMLDivElement>) => {
    if (e.target !== trackRef.current || e.propertyName !== "transform") return;
    let corrected = pos;
    if (pos < COUNT) corrected = pos + COUNT;
    else if (pos >= COUNT * 2) corrected = pos - COUNT;
    if (corrected !== pos) {
      setInstant(true);
      setPos(corrected);
    }
  };

  const handleProgressEnd = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    goNext();
  };

  // ── Drag / swipe ─────────────────────────────────────────────────────────
  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    drag.current = { id: e.pointerId, startX: e.clientX, dx: 0, moved: false };
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    d.dx = e.clientX - d.startX;
    if (!d.moved && Math.abs(d.dx) > 6) {
      d.moved = true;
      viewportRef.current?.setPointerCapture(e.pointerId);
      if (trackRef.current) trackRef.current.style.transition = "none";
    }
    if (d.moved) applyTransform(d.dx);
  };

  const endDrag = (e: ReactPointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    drag.current = null;
    if (!d.moved) return;
    suppressClick.current = true;
    if (trackRef.current) trackRef.current.style.transition = "";
    if (d.dx <= -DRAG_THRESHOLD_PX) goNext();
    else if (d.dx >= DRAG_THRESHOLD_PX) goPrev();
    else applyTransform();
  };

  return (
    <div>
      <div
        ref={viewportRef}
        className="communities-viewport"
        data-instant={instant}
        role="region"
        aria-roledescription="carousel"
        aria-label="Our communities"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={(e) => {
          if (suppressClick.current) {
            suppressClick.current = false;
            e.stopPropagation();
            e.preventDefault();
          }
        }}
      >
        <div ref={trackRef} className="communities-track" onTransitionEnd={handleTransitionEnd}>
          {TRIPLED.map((c, i) => {
            const active = i === pos;
            return (
              <div
                key={i}
                ref={(el) => {
                  slideRefs.current[i] = el;
                }}
                className="communities-slide"
              >
                <button
                  type="button"
                  onClick={() => goToPos(i)}
                  aria-current={active}
                  aria-label={active ? undefined : `Show ${c.name}`}
                  tabIndex={active ? -1 : 0}
                  data-active={active}
                  draggable={false}
                  className="communities-card relative block w-full overflow-hidden bg-night text-left"
                >
                  <Image
                    src={c.photo}
                    alt={active ? "" : `${c.name} — ${c.city}, ${c.state}`}
                    fill
                    draggable={false}
                    sizes="(min-width: 62rem) 63rem, (min-width: 40rem) 76vw, 84vw"
                    priority={i === COUNT}
                    className="communities-photo object-cover"
                  />

                  <div aria-hidden="true" className="communities-scrim absolute inset-0" />

                  <div
                    aria-hidden={!active}
                    className="communities-overlay absolute inset-0 flex flex-col px-5 pb-4 pt-5 md:px-6"
                  >
                    <div className="mx-auto flex w-full max-w-[29rem] flex-1 flex-col items-center justify-center text-center">
                      <h3 className="t-display-md text-[clamp(2rem,4.6vw,4rem)] leading-[1.05] text-ink-inverse">
                        {c.name}
                      </h3>
                      <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
                        <span className="rounded-md border border-white px-2 py-1 text-[0.75rem] font-medium text-ink-inverse md:text-[0.8125rem]">
                          {c.type}
                        </span>
                        <span className="rounded-md border border-white px-2 py-1 text-[0.75rem] font-medium text-ink-inverse md:text-[0.8125rem]">
                          {c.city}, {c.state}
                        </span>
                      </div>
                    </div>

                    <div
                      className={`flex items-end gap-4 text-[0.8125rem] text-ink-inverse md:text-[0.9375rem] ${
                        c.units !== null ? "justify-between" : "justify-end"
                      }`}
                    >
                      {c.units !== null ? <p>{c.units} units</p> : null}
                      <p className="text-right opacity-80">{c.floorPlans} floor plans</p>
                    </div>
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Controls ─────────────────────────────────────────────────────────
          Laid out like the reference: arrows + link | progress | counter +
          pause. Below md the progress bar takes its own full-width row on
          top and the arrows drop out (swipe replaces them). */}
      <div className="mx-auto mt-8 flex w-full max-w-[86rem] flex-wrap items-center justify-between gap-x-2 gap-y-5 px-4 md:flex-nowrap md:px-8">
        <div className="order-1 flex min-h-8 flex-1 items-center gap-2 md:order-none">
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous community"
            className="hidden h-8 w-8 items-center justify-center text-ink-muted transition-colors hover:text-ink md:flex"
          >
            <ChevronIcon direction="left" />
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Next community"
            className="hidden h-8 w-8 items-center justify-center text-ink-muted transition-colors hover:text-ink md:flex"
          >
            <ChevronIcon direction="right" />
          </button>

          <a
            href={current.website}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 whitespace-nowrap text-[0.9375rem] text-ink transition-colors hover:text-brand md:ml-2 md:text-base"
          >
            View community
            <span aria-hidden="true" className="text-[0.9em]">↗</span>
          </a>
        </div>

        <div className="order-first flex basis-full items-center md:order-none md:flex-[1_1_44vw] md:px-10">
          <div className="relative h-0.5 w-full overflow-hidden rounded-full bg-ink/20">
            <div
              key={cycle}
              onAnimationEnd={handleProgressEnd}
              className={`communities-progress-fill absolute inset-y-0 left-0 rounded-full bg-brand ${
                playing ? "" : "is-paused"
              }`}
            />
          </div>
        </div>

        <div className="order-2 flex flex-1 items-center justify-end gap-1 md:order-none">
          <p className="tabular-nums text-[0.9375rem] md:text-base" aria-live="polite">
            <span className="text-ink">{String(realIndex + 1).padStart(2, "0")}</span>
            <span className="mx-1 text-ink-muted">/</span>
            <span className="text-brand">{String(COUNT).padStart(2, "0")}</span>
          </p>

          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? "Pause auto-advance" : "Resume auto-advance"}
            className="ml-2 flex h-10 w-10 items-center justify-center rounded-full border-[1.5px] border-current text-ink-muted transition-colors hover:text-ink md:ml-3"
          >
            {playing ? <PauseIcon /> : <PlayIcon />}
          </button>
        </div>
      </div>
    </div>
  );
}

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d={direction === "left" ? "M10 3L5 8l5 5" : "M6 3l5 5-5 5"}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <rect x="2.5" y="1.5" width="3" height="11" rx="0.5" fill="currentColor" />
      <rect x="8.5" y="1.5" width="3" height="11" rx="0.5" fill="currentColor" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M3 1.5v11l9-5.5-9-5.5Z" fill="currentColor" />
    </svg>
  );
}
