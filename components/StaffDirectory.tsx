import SectionHeading from "@/components/SectionHeading";
import { company } from "@/lib/company";
import { directory } from "@/lib/leadership";

/**
 * STAFF DIRECTORY — everyone the client publishes on their own /contact/
 * page, exactly as published: name, title, email. Nothing added. It used to
 * sit in the Contact section on the homepage; it now has its own route
 * (app/directory/page.tsx), linked from the footer.
 */
export default function StaffDirectory() {
  return (
    <section id="directory" className="bg-surface py-20 md:py-28">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading
            eyebrow="Directory"
            title="Reach the right person."
            intro="The staff directory as the company publishes it. For anything else, the office line is the fastest route."
          />
          <a href={company.phoneHref} className="btn btn-line">
            Call {company.phone}
          </a>
        </div>

        <ul className="mt-14 md:mt-20">
          {directory.map((person) => (
            <li
              key={person.email}
              className="grid gap-1 border-t border-hairline py-5 last:border-b sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.2fr)] sm:items-baseline sm:gap-6"
            >
              <p className="t-display-md text-xl text-ink">{person.name}</p>
              <p className="text-[0.875rem] text-ink-muted">{person.title}</p>
              <a
                href={`mailto:${person.email}`}
                className="break-all text-[0.875rem] text-brand underline-offset-4 hover:underline sm:text-right"
              >
                {person.email}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
