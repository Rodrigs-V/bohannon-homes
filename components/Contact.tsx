import ContactForm from "@/components/ContactForm";
import SectionHeading from "@/components/SectionHeading";
import { addressLine, company } from "@/lib/company";

/**
 * CONTACT — the office line, address and hours on the left; a quote /
 * inquiry form on the right (components/ContactForm.tsx — not connected to
 * an inbox yet, and says so). The staff directory has its own page
 * (app/directory/page.tsx), linked from the footer; careers is a footer link.
 *
 * THE FORM HAS NO BACKEND. The client runs no form endpoint, and a form
 * that silently goes nowhere is worse than no form — so ContactForm says
 * plainly that it isn't connected until `company.inquiryEmail` is set.
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

            <div className="mt-12 grid gap-x-10 gap-y-9 sm:grid-cols-2">
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

              <div className="sm:col-span-2">
                <p className="t-label text-ink-inverse-muted">Office hours</p>
                <p className="unconfirmed unconfirmed-on-dark mt-2">
                  {company.officeHoursNote} — the company does not publish
                  corporate office hours. Individual leasing offices publish
                  their own; see each community.
                </p>
              </div>
            </div>
          </div>

          <div className="md:pt-16">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
