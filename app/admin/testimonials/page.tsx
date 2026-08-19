import { createTestimonial, deleteTestimonial, updateTestimonial } from "@/app/admin/testimonials/actions";
import { ConfirmDeleteButton } from "@/components/admin/ConfirmDeleteButton";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type Review = {
  id: string;
  quote: string;
  name: string;
  detail: string;
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
      <input name="order" type="number" min="0" defaultValue={review?.order ?? 0} placeholder="Display order" className="input" required />
      <label className="flex items-center gap-2 text-sm text-haze">
        <input type="checkbox" name="visible" defaultChecked={review?.visible ?? true} /> Show on the website
      </label>
    </>
  );
}

export default async function AdminTestimonialsPage() {
  const reviews = (await prisma.testimonial.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "asc" }]
  })) as Review[];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl text-white">Testimonials</h1>
        <p className="mt-2 text-sm text-haze">
          Passenger reviews shown on the homepage. Publish only real, attributable reviews.
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
