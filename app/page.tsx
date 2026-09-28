import About from "@/components/About";
import Communities from "@/components/Communities";
import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import Services from "@/components/Services";

/**
 * The front page, in the order a stranger actually needs it: who they are
 * and how big, what they do, what they run, how to reach them. Leadership
 * lives on its own route (app/leadership/page.tsx), linked from the header.
 *
 * The light/dark rhythm is deliberate and alternates all the way down —
 * photograph, white|night split, bone, white, night — so each section is
 * separated by a change of ground rather than by a decorative divider.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Communities />
      <Contact />
    </>
  );
}
