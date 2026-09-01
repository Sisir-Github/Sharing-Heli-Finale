import { createTestimonial, deleteTestimonial, updateTestimonial } from "@/app/admin/testimonials/actions";
import { ConfirmDeleteButton } from "@/components/admin/ConfirmDeleteButton";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type Review = {
  id: string;
  quote: string;
  name: string;
  detail: string;
  rating: number | null;
  source: string | null;
  sourceUrl: string | null;
  reviewedOn: Date | null;
  tourSlug: string | null;
  order: number;
  visible: boolean;
};

function ReviewFields({ review }: { review?: Review }) {
  return (
    <>
      <textarea
        name="quote"
        defaultValue={review?.quote}
        placeholder="What the passenger said"
        className="textarea md:col-span-2"
        rows={4}
        required
      />
      <input name="name" defaultValue={review?.name} placeholder="Passenger name" className="input" required />
      <input
        name="detail"
        defaultValue={review?.detail}
        placeholder="Flight, e.g. Everest region scenic flight"
        className="input"
        required
      />
      <select name="rating" defaultValue={review?.rating ? String(review.rating) : ""} className="input" aria-label="Star rating">
        <option value="">No star rating (quote only)</option>
        <option value="5">5 stars</option>
        <option value="4">4 stars</option>
        <option value="3">3 stars</option>
        <option value="2">2 stars</option>
        <option value="1">1 star</option>
      </select>
      <select name="source" defaultValue={review?.source ?? ""} className="input" aria-label="Review source">
        <option value="">Source not recorded</option>
        <option value="Google">Google</option>
        <option value="Tripadvisor">Tripadvisor</option>
        <option value="Facebook">Facebook</option>
        <option value="Direct">Sent to us directly</option>
      </select>
      <input name="sourceUrl" defaultValue={review?.sourceUrl ?? ""} placeholder="Link to the original review (optional)" className="input" />
      <input
        name="reviewedOn"
        type="date"
        defaultValue={review?.reviewedOn ? new Date(review.reviewedOn).toISOString().slice(0, 10) : ""}
        className="input"
        aria-label="Date the review was written"
      />
      <input name="order" type="number" min="0" defaultValue={review?.order ?? 0} placeholder="Display order" className="input" required />
      <label className="flex items-center gap-2 text-sm text-haze">
        <input type="checkbox" name="visible" defaultChecked={review?.visible ?? true} /> Show on the website
      </label>
    </>
  );
}

export default async function AdminTestimonialsPage() {
  // The cast stays until `prisma generate` runs against the migration that adds
  // rating/source/sourceUrl/reviewedOn/tourSlug (npm run db:migrate).
  const reviews = (await prisma.testimonial.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "asc" }]
  })) as unknown as Review[];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl text-white">Testimonials</h1>
        <p className="mt-2 text-sm text-haze">
          Passenger reviews shown on the homepage. Publish only real, attributable reviews. A star rating plus a source
          also publishes Review and AggregateRating structured data, which is what puts stars in Google results — so
          never set a rating for a review you cannot evidence.
        </p>
      </div>

      <form action={createTestimonial} className="glass grid gap-3 rounded-2xl p-6 md:grid-cols-2">
        <p className="text-sm font-semibold text-white md:col-span-2">Add a review</p>
        <ReviewFields />
        <button className="w-fit rounded-xl bg-gold px-4 py-2 text-sm font-semibold text-black md:col-span-2">
          Add review
        </button>
      </form>

      <div className="grid gap-4">
        {reviews.length ? (
          reviews.map((review) => (
            <form key={review.id} action={updateTestimonial} className="glass grid gap-3 rounded-2xl p-4 md:grid-cols-2">
              <input type="hidden" name="id" value={review.id} />
              <div className="flex flex-wrap items-center gap-3 md:col-span-2">
                <p className="text-sm font-semibold text-white">{review.name}</p>
                <span className="rounded-md border border-white/15 px-2 py-0.5 text-[10px] uppercase tracking-[0.12em] text-haze">
                  {review.detail}
                </span>
                {!review.visible ? (
                  <span className="rounded-md border border-white/15 px-2 py-0.5 text-[10px] uppercase tracking-[0.12em] text-haze">
                    Hidden
                  </span>
                ) : null}
              </div>

              <ReviewFields review={review} />

              <div className="flex flex-wrap items-center gap-3 md:col-span-2">
                <button className="rounded-xl border border-white/20 px-4 py-2 text-sm text-white">Save</button>
                <ConfirmDeleteButton
                  formAction={deleteTestimonial}
                  label="Remove"
                  confirmMessage={`Remove the review from ${review.name}?`}
                  className="rounded-xl border border-rose-400/50 px-4 py-2 text-sm text-rose-200"
                />
              </div>
            </form>
          ))
        ) : (
          <p className="rounded-2xl border border-white/10 p-6 text-sm text-haze">
            No reviews yet. The testimonials section is hidden on the website until you add one.
          </p>
        )}
      </div>
    </div>
  );
}
