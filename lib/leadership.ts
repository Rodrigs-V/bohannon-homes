/**
 * The executive team.
 *
 * SOURCE. Names, titles and biographies are the client's own, taken verbatim
 * (lightly trimmed for length, never rewritten or embellished) from
 * bohannondevelopment.com/aboutus/, fetched 2026-09-23. Email addresses come
 * from /contact/ on the same site, where they are already published.
 *
 * NOT INVENTED. No headshots exist anywhere on the client's site, so there
 * are none here — the cards use a typographic monogram instead of a stock
 * portrait standing in for a real person. `photo` stays null until the
 * client supplies real headshots.
 *
 * Rebecca DeVillier, Tammy Thompson and Pat Rojas appear on /contact/ with
 * titles and emails but have no biography on /aboutus/. They are carried in
 * `directory` below rather than being given an invented bio.
 */

export type Leader = {
  name: string;
  title: string;
  email: string | null;
  /** ❌ No headshots published. Do not substitute stock portraits. */
  photo: null;
  bio: string;
};

export const leaders: Leader[] = [
  {
    name: "Tom Bohannon",
    title: "President and Chief Executive Officer",
    email: null,
    photo: null,
    bio: "Tom earned his Bachelor of Science degree from Lincoln Memorial University, then joined Eastman Kodak, completing their management training program. He began his real estate development career with Epoch Properties, a developer of multi-family projects in the Southern United States, serving as project manager, corporate vice president and partner. In 1980 he founded Bohannon Development Corporation.",
  },
  {
    name: "Dan Dawes",
    title: "Executive Vice President",
    email: "ddawes@bohannondevelopment.com",
    photo: null,
    bio: "Dan was Senior Vice President at JPMorgan Chase Bank – El Paso, managing its Real Estate Banking Group, and previously worked on large office, commercial and residential transactions with Wells Fargo Bank and Dai-Ichi Kangyo Bank in California. He joined Bohannon Development in 1999 and handles development and financing activities. He holds a BBA from New Mexico State University and an MBA from UTEP.",
  },
  {
    name: "Eric Zuloaga",
    title: "Vice President",
    email: "ezuloaga@bohannondevelopment.com",
    photo: null,
    bio: "A third-generation builder. After graduating from Texas State Technical Institute with an Associate of Applied Science in Building Construction Technology, he moved from home building into commercial construction and land development as a certified Butler Builder, overseeing shopping centers, office buildings, churches and warehouses. He joined Bohannon Development as an estimator in 1987 and now oversees all new construction.",
  },
  {
    name: "Matt Bohannon",
    title: "Vice President",
    email: "mbohannon@bohannondevelopment.com",
    photo: null,
    bio: "Matt worked at Bohannon Development through high school and college as a general laborer, Project Foreman, Maintenance Technician and Leasing Agent. He joined full time in 2006 with a BBA from St. Edward's University, was named Vice President in 2012, and works across market research, site selection, feasibility analysis, equity sourcing, product design and project management. He has served on the board of the El Paso Apartment Association.",
  },
  {
    name: "Ben Bohannon",
    title: "Vice President",
    email: "bbohannon@bohannondevelopment.com",
    photo: null,
    bio: "Ben began in the maintenance and construction divisions, joined property management in 2003, and earned National Apartment Leasing Professional and Certified Apartment Manager designations. After time at Madison Development Group and The Raintree Partners in San Juan, Puerto Rico, he returned in 2009 to manage construction of over 1,000 apartment units. He serves on the El Paso Apartment Association Government Affairs Committee and the City of El Paso Construction Board of Appeals.",
  },
  {
    name: "Kristin M. Sizemore",
    title: "Vice President",
    email: "ksizemore@bohannondevelopment.com",
    photo: null,
    bio: "Kristin has over 30 years in property management across Texas, New Mexico, California, Colorado and Oklahoma, and joined Bohannon Development in 2003. A graduate of the 2017 NAA Leadership Lyceum, she holds Certified Apartment Manager, Certified Apartment Property Supervisor, Certified Apartment Maintenance Technician and Certified Apartment Supplier designations, and received the 2014 Texas Apartment Association Rita Kirby Regional Manager of the Year award and the 2014 NAA Paragon Award for Designate of the Year.",
  },
];

/**
 * Everyone published on /contact/. Includes the three staff who have a title
 * and an email there but no biography on /aboutus/ — listed plainly rather
 * than padded out with invented copy.
 */
export type DirectoryEntry = { name: string; title: string; email: string };

export const directory: DirectoryEntry[] = [
  { name: "Dan Dawes", title: "Executive Vice President", email: "ddawes@bohannondevelopment.com" },
  { name: "Rebecca DeVillier", title: "Chief Financial Officer", email: "radevillier@bohannondevelopment.com" },
  { name: "Eric Zuloaga", title: "Vice President", email: "ezuloaga@bohannondevelopment.com" },
  { name: "Matt Bohannon", title: "Vice President", email: "mbohannon@bohannondevelopment.com" },
  { name: "Ben Bohannon", title: "Vice President", email: "bbohannon@bohannondevelopment.com" },
  { name: "Kristin Sizemore", title: "Vice President", email: "ksizemore@bohannondevelopment.com" },
  { name: "Tammy Thompson", title: "Senior Property Accountant", email: "tthompson@bohannondevelopment.com" },
  { name: "Pat Rojas", title: "Construction Accountant", email: "projas@bohannondevelopment.com" },
];

export function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter((p) => p.length > 1 && !p.endsWith("."))
    .slice(0, 2)
    .map((p) => p[0])
    .join("");
}
