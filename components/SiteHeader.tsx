"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { company } from "@/lib/company";
import { navLeft, navLinks, navRight } from "@/lib/nav";

/**
 * CENTRED-LOGO BAR. The mark sits on the optical centre of the bar with the
 * four section links split evenly around it — two left, two right. This is the
 * chrome the client asked for, and it is the whole reason the bar is not the
 * usual logo-left-plus-tabs arrangement.
 *
 * The bar is transparent over the hero photograph and goes solid night past
 * it, so the logo is on the image on first paint with no band cutting across
 * the picture.
 *
 * THE LOGO ON THE PHOTOGRAPH. public/images/brand/logo.png is the client's
 * real mark: crimson on transparent, with the house-mark's arrow and window
 * cutouts punched out as actual transparency (verified — the file contains
 * zero opaque white pixels). Crimson type on a dark photograph would fail
 * contrast badly, so over the hero the mark renders reversed to solid white
 * via a filter. Because the cutouts are transparent rather than white, the
 * reversed mark keeps its interior shapes exactly. No white plate is invented
 * to sit behind it, and the full-colour crimson original is used as-is on the
 * light footer.
 *
 * Below `md` the links collapse into the overlay, but the PHONE NUMBER stays
 * in the bar at every width — it is the primary action for a firm whose whole
 * contact page is a phone number and a staff directory.
 */
export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [past, setPast] = useState(false);

  useEffect(() => {
    const onScroll = () => setPast(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock the page while the overlay is up; Escape closes it.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const solid = past || open;
  const linkTone = solid ? "nav-on-solid" : "nav-on-photo";

  const toTop = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header
      className={`on-dark fixed inset-x-0 top-0 z-50 text-ink-inverse transition-colors duration-500 ${
        solid ? "bg-night/95 backdrop-blur" : "bg-transparent"
      }`}
    >
      <div className="shell-wide flex h-[var(--bar)] items-center justify-between gap-4">
        {/* ── Left: two links (desktop) / menu button (mobile) ─────────── */}
        <nav aria-label="Sections" className="hidden flex-1 md:block">
          <ul className="flex items-center gap-8">
            {navLeft.map((link) => (
              <li key={link.href}>
                <a href={link.href} className={`nav-link ${linkTone}`}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="site-menu"
          className="flex flex-1 items-center gap-2.5 text-sm font-medium md:hidden"
        >
          <span aria-hidden="true" className="grid w-4 gap-[5px]">
            <span
              className={`block h-[1.5px] bg-current transition-transform duration-300 ${open ? "translate-y-[6.5px] rotate-45" : ""}`}
            />
            <span
              className={`block h-[1.5px] bg-current transition-opacity duration-300 ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-[1.5px] bg-current transition-transform duration-300 ${open ? "-translate-y-[6.5px] -rotate-45" : ""}`}
            />
          </span>
          {open ? "Close" : "Menu"}
        </button>

        {/* ── Centre: the mark ──────────────────────────────────────────── */}
        <a
          href="#top"
          onClick={toTop}
          className="shrink-0"
          aria-label={`${company.name} — back to top`}
        >
          <Image
            src="/images/brand/logo.png"
            alt={`${company.name} logo`}
            width={450}
            height={155}
            priority
            // Reversed to white: the source mark is crimson-on-transparent and
            // would not survive a dark photograph at legible contrast.
            className="h-8 w-auto brightness-0 invert md:h-10"
          />
        </a>

        {/* ── Right: two links + phone (desktop) / phone only (mobile) ──── */}
        <div className="flex flex-1 items-center justify-end gap-8">
          <nav aria-label="Sections" className="hidden md:block">
            <ul className="flex items-center gap-8">
              {navRight.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className={`nav-link ${linkTone}`}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <a
            href={company.phoneHref}
            className={`nav-link whitespace-nowrap ${linkTone}`}
          >
            <span className="sr-only">Call </span>
            {company.phone}
          </a>
        </div>
      </div>

      {/* ── Overlay index ──────────────────────────────────────────────────
          Below md this is the only navigation, so it carries every section
          plus the office details. Rendered only while open so it stays out of
          the tab order otherwise. */}
      {open ? (
        <nav
          id="site-menu"
          aria-label="Site"
          className="fixed inset-x-0 bottom-0 top-[var(--bar)] overflow-y-auto bg-night md:hidden"
        >
          <div className="shell border-t border-white/12 py-10">
            <ul className="grid">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="t-display-md block border-b border-white/10 py-5 text-[clamp(2rem,9vw,2.75rem)]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-10 grid gap-7 text-[0.95rem]">
              <div>
                <p className="t-label text-ink-inverse-muted">Call the office</p>
                <a
                  href={company.phoneHref}
                  className="t-display-md mt-2 block text-3xl"
                >
                  {company.phone}
                </a>
              </div>
              <div>
                <p className="t-label text-ink-inverse-muted">Office</p>
                <p className="mt-2 text-ink-inverse-muted">
                  {company.address.street}
                  <br />
                  {company.address.city}, {company.address.state}{" "}
                  {company.address.zip}
                </p>
              </div>
            </div>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
