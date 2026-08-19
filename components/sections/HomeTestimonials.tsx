import Link from "next/link";

const testimonials = [
  {
    id: "everest",
    quote:
      "From the first enquiry, everything was explained clearly — the route, weather conditions, passenger limits and what to expect on the day. The views were unforgettable, but what impressed us most was how smoothly the whole trip was organised.",
    name: "Daniel Thompson",
    detail: "Everest region scenic flight"
  },
  {
    id: "muktinath",
    quote:
      "We were travelling with elderly family members, so comfort and timing were very important to us. The team helped coordinate the journey carefully, kept us informed throughout, and made our visit to Muktinath feel simple and well managed.",
    name: "Priya Sharma",
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
