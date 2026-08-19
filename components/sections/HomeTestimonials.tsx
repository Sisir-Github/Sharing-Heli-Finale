import Link from "next/link";

/**
 * PLACEHOLDER CONTENT — swap these for real, attributable passenger reviews
 * before launch. Keep the shape (quote, name, route) and the section will
 * re-render unchanged.
 */
const testimonials = [
  {
    id: "everest",
    quote:
      "The team answered every question before we paid anything — route, timing, weight limits and what happens if the weather turns. The flight itself was the easiest part of our trip.",
    name: "Placeholder review",
    detail: "Everest region scenic flight"
  },
  {
    id: "muktinath",
    quote:
      "We had elderly family members travelling to Muktinath and the Pokhara desk planned the whole day around them. Clear communication from the first message to the landing.",
    name: "Placeholder review",
    detail: "Muktinath pilgrimage flight"
  }
];

export function HomeTestimonials() {
  return (
    <section className="band band-white">
      <div className="shell">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow justify-center">
            <span className="inline-block h-px w-7 bg-current align-middle" aria-hidden="true" />
            See what our passengers are saying
          </p>
          <h2 className="mt-5 font-display text-[2rem] font-semibold leading-[1.08] tracking-[-0.01em] text-navy sm:text-[2.7rem]">
            Testimonials
          </h2>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {testimonials.map((item) => (
            <figure key={item.id} className="surface-card m-0 flex flex-col p-7 text-center sm:p-9">
              <span className="quote-mark mx-auto block" aria-hidden="true">
                &ldquo;
              </span>
              <blockquote className="mt-2 text-[15px] leading-[1.9] text-[var(--muted)]">{item.quote}</blockquote>
              <figcaption className="mt-6 font-display text-[11px] font-semibold uppercase tracking-[0.2em] text-navy">
                {item.name}
                <span className="mt-2 block text-[10px] font-medium tracking-[0.16em] text-[var(--muted)]">{item.detail}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/contact" className="outline-button">
            Share your experience
          </Link>
        </div>
      </div>
    </section>
  );
}
