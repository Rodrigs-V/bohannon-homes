import Image from "next/image";
import Link from "next/link";

import { addressLine, company, states } from "@/lib/company";
import { communities } from "@/lib/communities";
import { navLinks } from "@/lib/nav";

/**
 * FOOTER. The crimson mark is used here in its ORIGINAL full colour — this is
 * the one light surface on the page big enough to carry it, and it is where
 * the brand reads as the brand rather than as a reversed silhouette (see
 * components/SiteHeader.tsx for why the header's copy is white).
 *
 * The Equal Housing Opportunity mark is the client's own asset, carried over
 * from their site. It belongs on a property management company's footer and
 * is not decoration.
 */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-hairline bg-surface py-14 md:py-16">
      <div className="shell">
        <div className="grid gap-12 md:grid-cols-[1.2fr_1fr_1fr] md:gap-10">
          <div>
            <Image
              src="/images/brand/logo.png"
              alt={`${company.name} logo`}
              width={450}
              height={155}
              className="h-11 w-auto"
            />
            <p className="t-prose-tight mt-5 text-[0.9375rem] leading-relaxed text-ink-muted">
              Real estate development, construction and property management
              since {company.founded}. Based in {company.address.city},{" "}
              {company.address.state}.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <Image
                src="/images/brand/eho.png"
                alt="Equal Housing Opportunity"
                width={30}
                height={23}
                className="h-5 w-auto"
              />
              <span className="text-[0.75rem] text-ink-muted">
                Equal Housing Opportunity
              </span>
            </div>
          </div>

          <div>
            <p className="t-label text-ink-muted">Sections</p>
            <ul className="mt-4 grid gap-2.5 text-[0.9375rem]">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-ink hover:text-brand">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={company.careersFormHref}
                  target="_blank"
                  rel="noreferrer"
                  className="text-ink hover:text-brand"
                >
                  Career opportunities ↗
                </a>
              </li>
            </ul>
            <Link href="/directory" className="btn btn-line mt-6">
              Staff directory →
            </Link>
          </div>

          <div>
            <p className="t-label text-ink-muted">Office</p>
            <address className="mt-4 not-italic text-[0.9375rem] leading-relaxed text-ink-muted">
              {company.address.street}
              <br />
              {company.address.city}, {company.address.state} {company.address.zip}
            </address>
            <a
              href={company.phoneHref}
              className="mt-3 inline-block font-medium text-ink hover:text-brand"
            >
              {company.phone}
            </a>
            <p className="mt-1 text-[0.875rem] text-ink-muted">Fax {company.fax}</p>
          </div>
        </div>

        {/* Every community, linked — a genuine index for crawlers as much as
            for readers, since the client's own list is JavaScript-only. */}
        <div className="mt-12 border-t border-hairline pt-8">
          <p className="t-label text-ink-muted">Communities</p>
          <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[0.875rem]">
            {communities.map((c) => (
              <li key={c.slug}>
                <a
                  href={c.website}
                  target="_blank"
                  rel="noreferrer"
                  className="text-ink-muted hover:text-brand"
                >
                  {c.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-hairline pt-7 text-[0.8125rem] text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {company.name}. All rights reserved.
          </p>
          <p className="sr-only">{addressLine()}</p>
          <p>{states.join(" · ")}</p>
        </div>
      </div>
    </footer>
  );
}
