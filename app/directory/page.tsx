import type { Metadata } from "next";

import StaffDirectory from "@/components/StaffDirectory";

export const metadata: Metadata = {
  title: "Staff directory",
  description: "The published staff directory for Bohannon Development Corporation, El Paso, Texas.",
};

/**
 * STAFF DIRECTORY — its own route, reached from the button in the footer.
 * The top padding clears the fixed header bar, which is solid on every route
 * except the homepage (see components/SiteHeader.tsx).
 */
export default function DirectoryPage() {
  return (
    <div className="bg-surface pt-[var(--bar)]">
      <StaffDirectory />
    </div>
  );
}
