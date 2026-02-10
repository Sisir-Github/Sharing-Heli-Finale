import { createTour, deleteTour, updateTour } from "@/app/admin/tours/actions";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminToursPage() {
  type TourItem = {
    id: string;
    title: string;
    slug: string;
    duration: string;
    priceFrom: number;
    currency: string;
    highlights: string;
    itinerary: string;
    inclusions: string;
    exclusions: string;
    images: string[];
    ctaLabel: string | null;
    ctaHref: string | null;
    seoTitle: string | null;
    seoDescription: string | null;
    published: boolean;
    featured: boolean;
  };

  const tours = (await prisma.tour.findMany({ orderBy: { updatedAt: "desc" } })) as TourItem[];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl text-white">Tours</h1>
        <p className="mt-2 text-sm text-haze">Manage helicopter tour packages and featured listings.</p>
      </div>

      <form action={createTour} className="glass rounded-2xl p-6 grid gap-4">
        <h2 className="text-lg font-semibold text-white">Add Tour</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <input name="title" placeholder="Title" className="input" required />
          <input name="slug" placeholder="slug" className="input" required />
          <input name="duration" placeholder="Duration" className="input" required />
          <input name="priceFrom" placeholder="Price from" className="input" required />
          <input name="currency" placeholder="Currency" className="input" required />
          <textarea name="highlights" placeholder="Highlights (markdown)" className="textarea md:col-span-2" required />
          <textarea name="itinerary" placeholder="Itinerary (markdown)" className="textarea md:col-span-2" required />
          <textarea name="inclusions" placeholder="Inclusions (markdown)" className="textarea md:col-span-2" required />
          <textarea name="exclusions" placeholder="Exclusions (markdown)" className="textarea md:col-span-2" required />
          <input name="images" placeholder="Image URLs (comma separated)" className="input md:col-span-2" />
          <input name="ctaLabel" placeholder="CTA label" className="input" />
          <input name="ctaHref" placeholder="CTA href" className="input" />
          <input name="seoTitle" placeholder="SEO title" className="input" />
          <input name="seoDescription" placeholder="SEO description" className="input" />
          <label className="flex items-center gap-2 text-sm text-haze">
            <input type="checkbox" name="published" defaultChecked />
            Published
          </label>
          <label className="flex items-center gap-2 text-sm text-haze">
            <input type="checkbox" name="featured" />
            Featured
          </label>
        </div>
        <button className="w-fit rounded-xl bg-gold px-4 py-2 text-sm font-semibold text-black">Create</button>
      </form>

      <div className="grid gap-4">
        {tours.map((tour) => (
          <form key={tour.id} action={updateTour} className="glass rounded-2xl p-6 grid gap-4">
            <input type="hidden" name="id" value={tour.id} />
            <div className="grid gap-4 md:grid-cols-2">
              <input name="title" defaultValue={tour.title} className="input" required />
              <input name="slug" defaultValue={tour.slug} className="input" required />
              <input name="duration" defaultValue={tour.duration} className="input" required />
              <input name="priceFrom" defaultValue={tour.priceFrom} className="input" required />
              <input name="currency" defaultValue={tour.currency} className="input" required />
              <textarea name="highlights" defaultValue={tour.highlights} className="textarea md:col-span-2" required />
              <textarea name="itinerary" defaultValue={tour.itinerary} className="textarea md:col-span-2" required />
              <textarea name="inclusions" defaultValue={tour.inclusions} className="textarea md:col-span-2" required />
              <textarea name="exclusions" defaultValue={tour.exclusions} className="textarea md:col-span-2" required />
              <input name="images" defaultValue={tour.images.join(", ")} className="input md:col-span-2" />
              <input name="ctaLabel" defaultValue={tour.ctaLabel || ""} className="input" />
              <input name="ctaHref" defaultValue={tour.ctaHref || ""} className="input" />
              <input name="seoTitle" defaultValue={tour.seoTitle || ""} className="input" />
              <input name="seoDescription" defaultValue={tour.seoDescription || ""} className="input" />
              <label className="flex items-center gap-2 text-sm text-haze">
                <input type="checkbox" name="published" defaultChecked={tour.published} />
                Published
              </label>
              <label className="flex items-center gap-2 text-sm text-haze">
                <input type="checkbox" name="featured" defaultChecked={tour.featured} />
                Featured
              </label>
            </div>
            <div className="flex gap-2">
              <button className="rounded-xl bg-white/10 px-4 py-2 text-sm text-white">Update</button>
              <button formAction={deleteTour} className="rounded-xl border border-rose-400/50 px-4 py-2 text-sm text-rose-200">
                Delete
              </button>
            </div>
          </form>
        ))}
      </div>
    </div>
  );
}
