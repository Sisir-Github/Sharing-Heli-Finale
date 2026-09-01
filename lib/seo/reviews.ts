import type { VerifiedReview } from "@/lib/seo/schema";

/**
 * Review rows as stored in the CMS. `rating` and `source` are optional because
 * a quote without a verifiable rating is still worth showing on the page — it
 * just must not be published as rating structured data.
 */
export type CmsTestimonial = {
  id: string;
  quote: string;
  name: string;
  detail: string;
  photo?: string | null;
  rating?: number | null;
  source?: string | null;
  sourceUrl?: string | null;
  reviewedOn?: Date | string | null;
  tourSlug?: string | null;
};

/**
 * Narrows CMS rows down to the ones that can legitimately carry Review and
 * AggregateRating markup: a real rating between 1 and 5, a named reviewer and
 * a review body. Everything else renders on the page but stays out of schema.
 */
export function toVerifiedReviews(testimonials: CmsTestimonial[]): VerifiedReview[] {
  return testimonials
    .filter((item) => typeof item.rating === "number" && item.rating >= 1 && item.rating <= 5)
    .filter((item) => item.name.trim().length > 1 && item.quote.trim().length > 20)
    .map((item) => ({
      id: item.id,
      author: item.name.trim(),
      rating: Number(item.rating),
      body: item.quote.trim(),
      datePublished: (item.reviewedOn ? new Date(item.reviewedOn) : new Date()).toISOString().slice(0, 10),
      source: item.source || undefined,
      sourceUrl: item.sourceUrl || undefined,
      itemPath: item.tourSlug || undefined
    }));
}

export function summariseReviews(reviews: VerifiedReview[]) {
  if (!reviews.length) return null;
  const total = reviews.reduce((sum, review) => sum + review.rating, 0);
  return { average: Number((total / reviews.length).toFixed(1)), count: reviews.length };
}
