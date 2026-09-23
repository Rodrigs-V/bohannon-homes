/**
 * The site's navigation map.
 *
 * Single-page site — every href is an on-page anchor, so the header, the
 * overlay menu and the footer all read from this one array.
 *
 * `left` and `right` split the same links around the centred logo in the
 * header (see components/SiteHeader.tsx). The split is deliberately even so
 * the wordmark sits on the optical centre of the bar.
 */

export type NavLink = { href: string; label: string };

export const navLeft: NavLink[] = [
  { href: "#what-we-do", label: "What we do" },
  { href: "#communities", label: "Communities" },
];

export const navRight: NavLink[] = [
  { href: "#leadership", label: "Leadership" },
  { href: "#contact", label: "Contact" },
];

export const navLinks: NavLink[] = [...navLeft, ...navRight];
