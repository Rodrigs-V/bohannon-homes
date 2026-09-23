import type { Metadata } from "next";
import { Instrument_Serif, Inter_Tight } from "next/font/google";

import Footer from "@/components/Footer";
import SiteHeader from "@/components/SiteHeader";
import { addressLine, company } from "@/lib/company";
import "./globals.css";

/**
 * TYPE PAIRING. Two families, divided strictly by job (see app/globals.css).
 * Instrument Serif takes every headline and every figure; Inter Tight takes
 * everything else. The CSS variable ROLES are the contract — components refer
 * to `.t-display` / `.t-figure` / `.t-label`, never to a font name.
 */
const instrumentSerif = Instrument_Serif({
  variable: "--font-display-face",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

const interTight = Inter_Tight({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.bohannondevelopment.com"),
  title: {
    default: `${company.name} — Development, construction and property management`,
    template: `%s | ${company.shortName}`,
  },
  description:
    "A full service real estate development, construction and property management firm founded in 1980 by Tom Bohannon, based in El Paso, Texas. Over 14,000 multi-family units developed, constructed or managed across nine states.",
  openGraph: {
    title: company.name,
    description:
      "Development, construction and property management since 1980. El Paso, Texas.",
    type: "website",
    locale: "en_US",
  },
};

/**
 * Organization schema. Every value comes from lib/company.ts, so the
 * structured data cannot drift away from what the page actually says — and
 * the unpublished fields (hours, general email) are simply absent rather
 * than filled with a plausible guess.
 */
function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.name,
    foundingDate: String(company.founded),
    founder: { "@type": "Person", name: company.founder },
    telephone: company.phone,
    faxNumber: company.fax,
    address: {
      "@type": "PostalAddress",
      streetAddress: company.address.street,
      addressLocality: company.address.city,
      addressRegion: company.address.state,
      postalCode: company.address.zip,
      addressCountry: "US",
    },
    description: company.summary,
  };
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${interTight.variable} ${instrumentSerif.variable} antialiased`}>
        <script
          type="application/ld+json"
          // Serialised from the typed object above, not hand-written JSON.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }}
        />

        <a
          href="#main"
          className="t-label sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-[var(--radius-card)] focus:bg-brand focus:px-4 focus:py-3 focus:text-ink-inverse"
        >
          Skip to content
        </a>

        <SiteHeader />
        <main id="main">{children}</main>
        <Footer />

        {/* One invisible, machine-readable copy of the NAP for crawlers that
            do not execute the JSON-LD above. */}
        <p className="sr-only">
          {company.name}, {addressLine()}. Phone {company.phone}.
        </p>
      </body>
    </html>
  );
}
