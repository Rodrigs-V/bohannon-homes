/**
 * The one heading treatment used by every section: crimson rule, tracked
 * eyebrow, display-serif title, optional intro. Having it in one place is
 * what stops the eight sections drifting into eight different rhythms.
 *
 * `tone="light"` inverts it for the night bands.
 */
export default function SectionHeading({
  eyebrow,
  title,
  intro,
  tone = "dark",
  align = "start",
  className = "",
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  /** "dark" = dark type on a light surface. "light" = the inverse. */
  tone?: "dark" | "light";
  align?: "start" | "center";
  className?: string;
}) {
  const light = tone === "light";
  const centered = align === "center";

  return (
    <div className={`${centered ? "flex flex-col items-center text-center" : ""} ${className}`}>
      <span className={`rule ${light ? "rule-light" : ""}`} />
      <p className={`t-label mt-5 ${light ? "text-ink-inverse-muted" : "text-ink-muted"}`}>
        {eyebrow}
      </p>
      <h2
        className={`t-display-md mt-4 text-[clamp(2rem,4.6vw,3.5rem)] ${
          light ? "text-ink-inverse" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {intro ? (
        <p
          className={`t-prose mt-5 text-[1.0625rem] ${
            light ? "text-ink-inverse-muted" : "text-ink-muted"
          } ${centered ? "mx-auto" : ""}`}
        >
          {intro}
        </p>
      ) : null}
    </div>
  );
}
