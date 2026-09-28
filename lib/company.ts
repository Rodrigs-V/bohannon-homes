/**
 * Single source of truth for Bohannon Development Corporation's NAP
 * (name / address / phone), history, and portfolio figures.
 *
 * SOURCE. Every field below was taken from the client's own live site
 * (bohannondevelopment.com, fetched 2026-09-23) — the homepage body copy,
 * /aboutus/, /services/ and /contact/ — or from the Apartments247 corporate
 * API that site runs on (/api/v1/corporation_info/). Nothing here is
 * invented or inferred.
 *
 * PLACEHOLDERS — do not invent replacements:
 *   - `officeHours`: the corporate office publishes no hours anywhere. The
 *     PER-COMMUNITY leasing hours in lib/communities.ts ARE published and are
 *     real; those are a different thing and must not be copied up to here.
 *   - `generalEmail`: the site lists individual staff addresses only (see
 *     lib/leadership.ts) and no general inbox.
 *   - `inquiryEmail`: where the contact form's quote/inquiry messages go.
 *     The client has not chosen an inbox (there is no general one), so the
 *     form stays unconnected until they do — see components/ContactForm.tsx.
 *   - `careersFormHref`: the live site links a Texas Apartment Association
 *     PDF employment application. The PDF is not mirrored into this repo, so
 *     the link points back at the client's own copy.
 *
 * RULE FOR COMPONENTS: never hardcode a phone number, address, or figure in
 * a component. Import it from here.
 */

export const company = {
  name: "Bohannon Development Corporation",
  shortName: "Bohannon Development",

  /** ✅ Homepage body copy: "founded in 1980 by Tom Bohannon". */
  founded: 1980,
  founder: "Tom Bohannon",

  /** ✅ /contact/ and the corporate API agree on all three. */
  phone: "915-833-3322",
  phoneHref: "tel:+19158333322",
  fax: "915-833-1717",

  address: {
    street: "5915 Silver Springs Drive, Building 2",
    city: "El Paso",
    state: "TX",
    zip: "79912",
  },

  /** ❌ Not published anywhere. Do not invent. */
  officeHours: null as string | null,
  officeHoursNote: "[CORPORATE OFFICE HOURS — TO BE CONFIRMED]",

  /** ❌ No general inbox published — only the staff directory. */
  generalEmail: null as string | null,

  /**
   * ❌ Not chosen yet. The address the contact form's inquiries are sent to.
   * Set this (or swap the form to a form service) once the client picks an
   * inbox. Do not guess one from the staff directory.
   */
  inquiryEmail: null as string | null,
  inquiryEmailNote: "[INQUIRY INBOX — TO BE CONFIRMED]",

  /** The client's own employment application, hosted on their site. */
  careersFormHref:
    "https://www.bohannondevelopment.com/gridmedia//employment/TAA%20Employment%20App.pdf",

  /**
   * ✅ Verbatim from the homepage. Quoted, not paraphrased, so the claims
   * stay exactly the ones the client already makes publicly.
   */
  summary:
    "We are a full service real estate development, construction and property management firm founded in 1980 by Tom Bohannon, based in El Paso, Texas. Bohannon Development Corporation has developed, constructed and/or managed over 14,000 multi-family units as well as single family, commercial, retail properties and land development in Texas, New Mexico, Arizona, Colorado, California, Florida, Alabama, Tennessee and Louisiana.",

  systems:
    "The Executive Management Team participates in pre-construction planning and ongoing property management activities. This participation is invaluable in planning new developments and efficiently operating existing properties. Bohannon Development Corporation has developed effective systems that utilize proven methods of project analysis, construction scheduling, quality assurance, asset/property management, financial controls and management reporting.",

  philosophy:
    "Our corporate philosophy promotes team work, pride, commitment and personal responsibility.",
} as const;

/** ✅ Homepage copy, in the order the client lists them. */
export const states = [
  "Texas",
  "New Mexico",
  "Arizona",
  "Colorado",
  "California",
  "Florida",
  "Alabama",
  "Tennessee",
  "Louisiana",
] as const;

/** ✅ Homepage copy, verbatim, in the client's own order. */
export const coreValues = [
  "Provide a quality living environment for our residents",
  "Maintain the highest standards of personal and business integrity",
  "Be mindful of the fiduciary responsibilities we have to our investors and partners",
  "Promote a work environment that rewards teamwork, professionalism and excellence",
] as const;

export function addressLine(): string {
  const { street, city, state, zip } = company.address;
  return `${street}, ${city}, ${state} ${zip}`;
}

export function yearsInBusiness(now = new Date()): number {
  return now.getFullYear() - company.founded;
}
