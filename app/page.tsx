import About from "@/components/About";
import Communities from "@/components/Communities";
import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import Leadership from "@/components/Leadership";
import Portfolio from "@/components/Portfolio";
import Services from "@/components/Services";

/**
 * Single-page site. Everything lives on the front page, in the order a
 * stranger actually needs it: who they are and how big, what they do, what
 * they run, who runs it, how to reach them.
 *
 * The light/dark rhythm is deliberate and alternates all the way down —
 * photograph, night, white, bone, white, bone, night — so each section is
 * separated by a change of ground rather than by a decorative divider.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Portfolio />
      <About />
      <Services />
      <Communities />
      <Leadership />
      <Contact />
    </>
  );
}
