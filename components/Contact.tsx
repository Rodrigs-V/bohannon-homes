import SectionHeading from "@/components/SectionHeading";
import { addressLine, company } from "@/lib/company";
import { directory } from "@/lib/leadership";

/**
 * CONTACT — the office, and the staff directory the client already publishes.
 *
 * NO FORM. The client runs no form endpoint that this site could post to, and
 * a form that silently goes nowhere is worse than no form. Everything here is
 * a `tel:` or a `mailto:` that works on first tap.
 *
 * PLACEHOLDER, DELIBERATE. The corporate office publishes no hours anywhere —
 * not on the site, not in the API behind it. That renders as a visible marked
 * placeholder rather than a plausible "Mon–Fri 9–5", which is exactly the kind
 * of harmless-looking invention that ships wrong. Do not fill it in without
 * asking the client.
 *
 * The per-community leasing hours in lib/communities.ts ARE published and are
 * real; they are a different thing and must not be copied up here.
 */
export default function Contact() {
  const mapQuery = encodeURIComponent(`${company.name}, ${addressLine()}`);

  return (
    <section id="contact" className="on-dark bg-night py-20 text-ink-inverse md:py-28">
      <div className="shell">
        <div className="grid gap-14 md:grid-cols-[1fr_1.15fr] md:gap-20">
          <div>
            <SectionHeading
              tone="light"
              eyebrow="Contact"
              title={
                <>
                  Let&rsquo;s talk about
                  <br className="hidden lg:block" /> the site.
                </>
              }
              intro="Development, third-party general contracting, or management of a property you already own — the fastest route is the office line."
            />

            <div className="mt-10 grid gap-8">
              <div>
                <p className="t-label text-ink-inverse-muted">Call</p>
                <a href={company.phoneHref} className="t-display-md mt-2 block text-4xl">
                  {company.phone}
                </a>
                <p className="mt-2 text-[0.875rem] text-ink-inverse-muted">
                  Fax {company.fax}
                </p>
              </div>

              <div>
                <p className="t-label text-ink-inverse-muted">Office</p>
                <p className="mt-2 leading-relaxed">
                  {company.address.street}
                  <br />
                  {company.address.city}, {company.address.state} {company.address.zip}
                </p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-block text-[0.875rem] font-medium underline underline-offset-4 hover:text-ink-inverse-muted"
                >
                  Open in Maps ↗
                </a>
              </div>

              <div>
                <p className="t-label text-ink-inverse-muted">Office hours</p>
                <p className="unconfirmed unconfirmed-on-dark mt-2">
                  {company.officeHoursNote} — the company does not publish
                  corporate office hours. Individual leasing offices publish
                  their own; see each community.
                </p>
              </div>

              <div>
                <p className="t-label text-ink-inverse-muted">Careers</p>
                <a
                  href={company.careersFormHref}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-line-light mt-3"
                >
                  Employment application (PDF) ↗
                </a>
              </div>
            </div>
          </div>

          {/* The staff directory, exactly as the client publishes it. */}
          <div>
            <p className="t-label text-ink-inverse-muted">Directory</p>
            <ul className="mt-5">
              {directory.map((person) => (
                <li
                  key={person.email}
                  className="grid gap-1 border-t border-white/14 py-4 last:border-b sm:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] sm:items-baseline sm:gap-6"
                >
                  <div>
                    <p className="font-medium">{person.name}</p>
                    <p className="text-[0.8125rem] text-ink-inverse-muted">{person.title}</p>
                  </div>
                  <a
                    href={`mailto:${person.email}`}
                    className="break-all text-[0.875rem] text-ink-inverse-muted underline-offset-4 hover:text-ink-inverse hover:underline"
                  >
                    {person.email}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
