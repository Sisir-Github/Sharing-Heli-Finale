import Link from "next/link";
import { Star } from "lucide-react";

import { JsonLd } from "@/components/seo/JsonLd";
import { buildReviewGraph } from "@/lib/seo/schema";
import { summariseReviews, toVerifiedReviews, type CmsTestimonial } from "@/lib/seo/reviews";

export type TestimonialItem = CmsTestimonial;

function Stars({ rating, className = "" }: { rating: number; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-0.5 ${className}`} aria-label={`Rated ${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((value) => (
        <Star
          key={value}
          size={15}
          className={value <= Math.round(rating) ? "fill-accent text-accent" : "text-sand"}
          aria-hidden="true"
        />
      ))}
    </span>
  );
}

export function HomeTestimonials({ testimonials }: { testimonials: TestimonialItem[] }) {
  if (!testimonials.length) return null;

  // Only rated, attributable reviews reach the structured-data graph.
  const verified = toVerifiedReviews(testimonials);
  const summary = summariseReviews(verified);
  const reviewGraph = buildReviewGraph(verified, "/");

  return (
    <section className="band band-white" id="reviews">
      {reviewGraph ? <JsonLd data={reviewGraph} /> : null}
      <div className="shell">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow justify-center">
            <span className="inline-block h-px w-7 bg-current align-middle" aria-hidden="true" />
            See what our passengers are saying
          </p>
          <h2 className="mt-5 font-display text-[2rem] font-semibold leading-[1.08] tracking-[-0.01em] text-navy sm:text-[2.7rem]">
            Testimonials
          </h2>
          {summary ? (
            <p className="mt-6 inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm text-[var(--muted)]">
              <Stars rating={summary.average} />
              <span className="font-display text-base font-semibold text-navy">{summary.average.toFixed(1)}</span>
              <span>
                from {summary.count} verified {summary.count === 1 ? "review" : "reviews"}
              </span>
            </p>
          ) : null}
        </div>

        <div className={`mt-12 grid gap-5 ${testimonials.length > 2 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
          {testimonials.slice(0, 6).map((item) => (
            <figure key={item.id} className="surface-card m-0 flex flex-col p-7 text-center sm:p-9">
              {item.rating ? (
                <Stars rating={item.rating} className="mx-auto" />
              ) : (
                <span className="quote-mark mx-auto block" aria-hidden="true">
                  &ldquo;
                </span>
              )}
              <blockquote className="mt-4 text-[15px] leading-[1.9] text-[var(--muted)]">{item.quote}</blockquote>
              <figcaption className="mt-6 font-display text-[11px] font-semibold uppercase tracking-[0.2em] text-navy">
                {item.name}
                <span className="mt-2 block text-[10px] font-medium tracking-[0.16em] text-[var(--muted)]">
                  {item.detail}
                  {item.source ? ` · ${item.source}` : ""}
                </span>
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
