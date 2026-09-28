import type { Metadata } from "next";

import Leadership from "@/components/Leadership";

export const metadata: Metadata = {
  title: "Leadership",
  description:
    "The executive team at Bohannon Development Corporation, El Paso, Texas.",
};

/**
 * LEADERSHIP — its own route, reached from the header. The section component
 * is the same one the homepage used to carry; the top padding clears the
 * fixed header bar, which is solid on every route except the homepage (see
 * components/SiteHeader.tsx).
 */
export default function LeadershipPage() {
  return (
    <div className="bg-surface-alt pt-[var(--bar)]">
      <Leadership />
    </div>
  );
}
