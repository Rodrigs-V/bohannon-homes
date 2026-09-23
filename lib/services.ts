/**
 * The three divisions.
 *
 * SOURCE. Copy is the client's own, from bohannondevelopment.com/services/,
 * fetched 2026-09-23, lightly trimmed for rhythm but never rewritten and
 * never extended with claims the client does not already make.
 *
 * `capabilities` are drawn from the client's own sentences — e.g.
 * "market research, site selection and acquisition, planning and zoning
 * issues, project design, financing, construction and property management"
 * is the Development list, split into its parts. Nothing is added.
 */

export type Service = {
  id: string;
  number: string;
  name: string;
  lede: string;
  body: string[];
  capabilities: string[];
};

export const services: Service[] = [
  {
    id: "development",
    number: "01",
    name: "Development",
    lede: "The company performs all phases of the development process.",
    body: [
      "With a dedicated effort and attention to detail, we strive to produce an attractive and cost efficient property that meets the needs of the marketplace.",
      "We are a flexible company that has operated successfully under a variety of different business structures, and we pride ourselves on long term positive relationships with lenders, partners and investors.",
    ],
    capabilities: [
      "Market research",
      "Site selection and acquisition",
      "Planning and zoning",
      "Project design",
      "Financing",
      "Construction",
      "Property management",
    ],
  },
  {
    id: "construction",
    number: "02",
    name: "Construction",
    lede:
      "General contracting and construction services — for our own projects and for third parties.",
    body: [
      "From experience, the company has created and utilizes proven methods for efficient construction scheduling and quality control.",
      "We have a long history of successful project completion; on-time and on-budget.",
    ],
    capabilities: [
      "General contracting",
      "Third-party construction",
      "Construction scheduling",
      "Quality control",
      "Project analysis",
    ],
  },
  {
    id: "property-management",
    number: "03",
    name: "Property Management",
    lede:
      "A full-service property management firm focused on satisfying both owner and resident demands.",
    body: [
      "Special attention is placed on maximizing value through a professional emphasis on resident service, marketing, market knowledge, asset protection and financial management.",
      "Our unique perspective — an understanding of all aspects of the business — provides us with the expertise to deliver above-market results.",
    ],
    capabilities: [
      "Resident service",
      "Marketing and lease-up",
      "Asset protection",
      "Financial management",
      "Management reporting",
    ],
  },
];
