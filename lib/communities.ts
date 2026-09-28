/**
 * The eight communities Bohannon Development currently manages.
 *
 * SOURCE. Every field is real, pulled 2026-09-23 from the Apartments247
 * corporate API that powers the client's own /communities/ page
 * (/api/v1/corporation_communities/). The photographs in
 * public/images/communities/ are the client's own hero shots from that same
 * source — there is no stock photography anywhere on this site.
 *
 * NOT INVENTED. `units` is null for the two communities whose unit count the
 * API does not publish; the card renders the floor-plan count instead rather
 * than guessing a number. `leasingHours` are the per-community hours the
 * client publishes — they are NOT the corporate office's hours, which are
 * unpublished (see lib/company.ts).
 *
 * Ordering is El Paso first (the company's home market, six of eight), then
 * the out-of-state communities.
 */

export type Community = {
  slug: string;
  name: string;
  type: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  phoneHref: string;
  email: string;
  website: string;
  websiteLabel: string;
  /** null where the client does not publish a unit count — do not guess. */
  units: number | null;
  floorPlans: number | null;
  leasingHours: string[];
  description: string;
  photo: string;
};

export const communities: Community[] = [
  {
    slug: "milestone-at-mission-ridge",
    name: "Milestone at Mission Ridge",
    type: "Apartment Homes",
    address: "12479 Rojas Drive",
    city: "El Paso",
    state: "TX",
    zip: "79928",
    phone: "915-209-3639",
    phoneHref: "tel:+19152093639",
    email: "milestoneatmissionridge-a247@m.knck.io",
    website: "https://www.milestoneatmissionridge.com",
    websiteLabel: "milestoneatmissionridge.com",
    units: 261,
    floorPlans: 10,
    leasingHours: ["Mon–Fri: 9:00 AM–6:00 PM", "Sat: 10:00 AM–5:00 PM", "Sun: Closed"],
    description:
      "Brand-new apartment homes in El Paso, crafted with subtle, stylish details that create a warm and inviting atmosphere, with well-maintained community spaces and a responsive on-site team.",
    photo: "/images/communities/milestone-at-mission-ridge-hero.jpg",
  },
  {
    slug: "avalon-west",
    name: "Avalon West",
    type: "Apartment Homes",
    address: "240 Desert Pass Street",
    city: "El Paso",
    state: "TX",
    zip: "79912",
    phone: "915-336-0129",
    phoneHref: "tel:+19153360129",
    email: "avalonwest@bohannondevelopment.com",
    website: "https://www.avalonwestep.com",
    websiteLabel: "avalonwestep.com",
    units: 262,
    floorPlans: 7,
    leasingHours: ["Mon–Fri: 10:00 AM–6:00 PM", "Sat: 10:00 AM–5:00 PM"],
    description:
      "A luxury apartment community in West El Paso, offering pet-friendly one, two and three bedroom apartments with premium amenities and interior features included.",
    photo: "/images/communities/avalon-west-hero.jpg",
  },
  {
    slug: "ridgeline-west",
    name: "Ridgeline West",
    type: "Apartment Homes",
    address: "2021 Bluff Creek Street",
    city: "El Paso",
    state: "TX",
    zip: "79911",
    phone: "915-348-3981",
    phoneHref: "tel:+19153483981",
    email: "katie@bohdev.com",
    website: "https://www.ridgelinewest.com",
    websiteLabel: "ridgelinewest.com",
    units: 208,
    floorPlans: 5,
    leasingHours: [
      "Mon: 10:00 AM–6:00 PM",
      "Tue: 9:45 AM–6:00 PM",
      "Wed–Fri: 10:00 AM–6:00 PM",
      "Sat: 10:00 AM–5:00 PM",
    ],
    description:
      "Five floor plans with one, two and three bedrooms. Nine-foot ceilings, stainless appliances, granite countertops and wood-inspired flooring, with a clubhouse, pool and fitness center on site.",
    photo: "/images/communities/ridgeline-west-hero.jpg",
  },
  {
    slug: "las-norias",
    name: "Las Norias",
    type: "Apartments",
    address: "2170 Trawood Drive",
    city: "El Paso",
    state: "TX",
    zip: "79935",
    phone: "915-629-0900",
    phoneHref: "tel:+19156290900",
    email: "lasnorias@bohannondevelopment.com",
    website: "https://www.LasNorias-ElPaso.com",
    websiteLabel: "lasnorias-elpaso.com",
    units: 96,
    floorPlans: 3,
    leasingHours: ["Mon–Fri: 9:00 AM–6:00 PM", "Sat–Sun: Closed"],
    description:
      "A quiet community nestled among the trees and greens of the Vista Hills neighborhood, minutes from East El Paso shopping, dining and entertainment.",
    photo: "/images/communities/las-norias-hero.jpg",
  },
  {
    slug: "the-cottages-at-edgemere",
    name: "The Cottages at Edgemere",
    type: "Apartments",
    address: "14363 Edgemere Blvd",
    city: "El Paso",
    state: "TX",
    zip: "79938",
    phone: "915-900-7367",
    phoneHref: "tel:+19159007367",
    email: "CottagesEdgemere@bohannondevelopment.com",
    website: "https://www.CottagesAtEdgemere.com",
    websiteLabel: "cottagesatedgemere.com",
    units: null,
    floorPlans: 5,
    leasingHours: ["Mon–Fri: 10:00 AM–6:00 PM", "Sat: 10:00 AM–5:00 PM"],
    description:
      "On El Paso's Upper Eastside, with easy access to Loop 375 / Joe Battle, I-10 and Fort Bliss.",
    photo: "/images/communities/the-cottages-at-edgemere-hero.jpg",
  },
  {
    slug: "magoffin-park-villas",
    name: "Magoffin Park Villas",
    type: "Apartments",
    address: "900 Myrtle Avenue",
    city: "El Paso",
    state: "TX",
    zip: "79901",
    phone: "915-995-9342",
    phoneHref: "tel:+19159959342",
    email: "MagoffinParkVillas@bohdev.com",
    website: "https://www.MagoffinParkApartmentHomes.com",
    websiteLabel: "magoffinparkapartmenthomes.com",
    units: null,
    floorPlans: 5,
    leasingHours: ["Mon–Fri: 8:30 AM–5:30 PM", "Sat–Sun: Closed"],
    description:
      "One and two bedroom floor plans in central El Paso with central air and heating, in-home washer and dryer, walk-in closets, gated access and assigned parking.",
    photo: "/images/communities/magoffin-park-villas-hero.jpg",
  },
  {
    slug: "fox-bridge-north",
    name: "Fox Bridge North",
    type: "Apartment Homes",
    address: "7515 Spring Stuebner Road",
    city: "Spring",
    state: "TX",
    zip: "77379",
    phone: "346-781-6391",
    phoneHref: "tel:+13467816391",
    email: "FoxBridgeNorth@bohdev.com",
    website: "https://www.foxbridgenorth.com",
    websiteLabel: "foxbridgenorth.com",
    units: 368,
    floorPlans: 5,
    leasingHours: ["Mon–Fri: 10:00 AM–6:00 PM", "Sat: 10:00 AM–5:00 PM"],
    description:
      "Resort-style living north of Houston — high-end interior features, generous floor plans and premium amenities.",
    photo: "/images/communities/fox-bridge-north-hero.jpg",
  },
  {
    slug: "fox-bridge-on-union",
    name: "Fox Bridge on Union",
    type: "Apartment Homes",
    address: "8015 Siltstone Point",
    city: "Colorado Springs",
    state: "CO",
    zip: "80920",
    phone: "719-733-9835",
    phoneHref: "tel:+17197339835",
    email: "foxbridgeonunion@bohdev.com",
    website: "https://www.foxbridgeunion.com",
    websiteLabel: "foxbridgeunion.com",
    units: 232,
    floorPlans: 7,
    leasingHours: ["Mon–Fri: 10:00 AM–6:00 PM", "Sat: 10:00 AM–5:00 PM"],
    description:
      "Pet-friendly studio, one, two and three bedroom apartments in northern Colorado Springs.",
    photo: "/images/communities/fox-bridge-on-union-hero.jpg",
  },
];

/** Markets, derived — never hand-maintained alongside the list above. */
export const markets: string[] = Array.from(
  new Set(communities.map((c) => `${c.city}, ${c.state}`)),
);

/**
 * The four photographs the hero cycles through. All are client hero shots of
 * real Bohannon communities, captioned with the community's name in the hero
 * so nothing is passed off as generic stock.
 */
export const heroSlugs = [
  "fox-bridge-north",
  "ridgeline-west",
  "fox-bridge-on-union",
  "milestone-at-mission-ridge",
] as const;

export const heroCommunities: Community[] = heroSlugs.map((slug) => {
  const found = communities.find((c) => c.slug === slug);
  if (!found) throw new Error(`heroSlugs references unknown community: ${slug}`);
  return found;
});
