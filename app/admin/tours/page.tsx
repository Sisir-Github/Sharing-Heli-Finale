import { createTour, deleteTour, updateTour } from "@/app/admin/tours/actions";
import { ImagePicker, type LibraryImage } from "@/components/admin/ImagePicker";
import { prisma } from "@/lib/prisma";
import { asStringArray } from "@/lib/json-array";
import { TOUR_CATEGORIES, TOUR_CATEGORY_LABELS } from "@/lib/tours/categories";
import { getTourPricePresentation } from "@/lib/tours/pricing";
import { TOUR_REGIONS, TOUR_REGION_CONTENT } from "@/lib/tours/regions";

export const dynamic = "force-dynamic";

function ClassificationFields({ tour }: { tour?: { region: string; category: string; sortOrder: number } }) {
  return (
    <>
      <select name="region" defaultValue={tour?.region || TOUR_REGIONS[0]} className="input" aria-label="Tour region">
        {TOUR_REGION_CONTENT.map((region) => <option key={region.id} value={region.id}>{region.label}</option>)}
      </select>
      <select name="category" defaultValue={tour?.category || "SCENIC"} className="input" aria-label="Tour type">
        {TOUR_CATEGORIES.map((category) => <option key={category} value={category}>{TOUR_CATEGORY_LABELS[category]}</option>)}
      </select>
      <input name="sortOrder" type="number" min="0" step="1" defaultValue={tour?.sortOrder ?? 0} placeholder="Display order" className="input" required />
    </>
  );
}

function PricingFields({
  tour
}: {
  tour?: {
    priceMode: string;
    currency: string;
    sharedPriceFrom: number | null;
    privateCharterPrice: number | null;
    sharedAvailable: boolean;
    privateAvailable: boolean;
    departureCity: string | null;
    operationalNotice: string | null;
    pricingNote: string | null;
    priceValidFrom: Date | null;
    priceValidUntil: Date | null;
    lastVerifiedAt: Date | null;
  };
}) {
  return (
    <>
      <select name="priceMode" defaultValue={tour?.priceMode || "LIVE_QUOTE"} className="input">
        <option value="LIVE_QUOTE">Hide public price</option>
        <option value="SHARED_PER_PERSON">Shared price per person</option>
        <option value="PRIVATE_PER_AIRCRAFT">Private price per aircraft</option>
      </select>
      <input name="currency" defaultValue={tour?.currency || "USD"} placeholder="Currency" className="input" required />
      <input name="sharedPriceFrom" type="number" min="0" step="0.01" defaultValue={tour?.sharedPriceFrom ?? ""} placeholder="Shared price from, per person" className="input" />
      <input name="privateCharterPrice" type="number" min="0" step="0.01" defaultValue={tour?.privateCharterPrice ?? ""} placeholder="Private price from, per aircraft" className="input" />
      <input name="departureCity" defaultValue={tour?.departureCity || ""} placeholder="Departure city" className="input" />
      <input name="priceValidFrom" type="date" defaultValue={tour?.priceValidFrom?.toISOString().slice(0, 10) || ""} className="input" aria-label="Price valid from" />
      <input name="priceValidUntil" type="date" defaultValue={tour?.priceValidUntil?.toISOString().slice(0, 10) || ""} className="input" aria-label="Price valid until" />
      <input name="lastVerifiedAt" type="date" defaultValue={tour?.lastVerifiedAt?.toISOString().slice(0, 10) || ""} className="input" aria-label="Price last verified" />
      <textarea name="pricingNote" defaultValue={tour?.pricingNote || ""} placeholder="Pricing note and inclusions" className="textarea md:col-span-2" />
      <textarea name="operationalNotice" defaultValue={tour?.operationalNotice || ""} placeholder="Weather, weight, landing, or routing limitations" className="textarea md:col-span-2" />
      <label className="flex items-center gap-2 text-sm text-haze">
        <input type="checkbox" name="sharedAvailable" defaultChecked={tour?.sharedAvailable} />
        Shared seats offered when confirmed
      </label>
      <label className="flex items-center gap-2 text-sm text-haze">
        <input type="checkbox" name="privateAvailable" defaultChecked={tour?.privateAvailable ?? true} />
        Private charter available
      </label>
    </>
  );
}

function formatFaqs(value: unknown) {
  if (!Array.isArray(value)) return "";
  return value
    .filter((item): item is { question: string; answer: string } => {
      if (!item || typeof item !== "object") return false;
      const candidate = item as Record<string, unknown>;
      return typeof candidate.question === "string" && typeof candidate.answer === "string";
    })
    .map((item) => `${item.question} | ${item.answer}`)
    .join("\n");
}

function ContentFields({
  tour
}: {
  tour?: {
    excerpt: string | null;
    overview: string | null;
    route: string | null;
    altitude: string | null;
    bestTime: string | null;
    weatherNotes: string | null;
    cancellationPolicy: string | null;
    passengerRequirements: string | null;
    weightSeating: string | null;
    whatToBring: string | null;
    photographyInfo: string | null;
    safetyNotes: string | null;
    faqs: unknown;
    ogImage: string | null;
    noindex: boolean;
  };
}) {
  return (
    <>
      <textarea name="excerpt" defaultValue={tour?.excerpt || ""} placeholder="Short card and page introduction" className="textarea md:col-span-2" />
      <textarea name="overview" defaultValue={tour?.overview || ""} placeholder="Detailed overview" className="textarea md:col-span-2" />
      <textarea name="route" defaultValue={tour?.route || ""} placeholder="Route and departure details" className="textarea md:col-span-2" />
      <input name="altitude" defaultValue={tour?.altitude || ""} placeholder="Altitude guidance" className="input" />
      <input name="bestTime" defaultValue={tour?.bestTime || ""} placeholder="Best season or operating window" className="input" />
      <textarea name="weatherNotes" defaultValue={tour?.weatherNotes || ""} placeholder="Weather considerations" className="textarea md:col-span-2" />
      <textarea name="cancellationPolicy" defaultValue={tour?.cancellationPolicy || ""} placeholder="Cancellation and rescheduling policy" className="textarea md:col-span-2" />
      <textarea name="passengerRequirements" defaultValue={tour?.passengerRequirements || ""} placeholder="Passenger requirements" className="textarea md:col-span-2" />
      <textarea name="weightSeating" defaultValue={tour?.weightSeating || ""} placeholder="Weight and seating policy" className="textarea md:col-span-2" />
      <textarea name="whatToBring" defaultValue={tour?.whatToBring || ""} placeholder="What to wear and bring" className="textarea md:col-span-2" />
      <textarea name="photographyInfo" defaultValue={tour?.photographyInfo || ""} placeholder="Photography information" className="textarea md:col-span-2" />
      <textarea name="safetyNotes" defaultValue={tour?.safetyNotes || ""} placeholder="Safety information" className="textarea md:col-span-2" />
      <textarea name="faqs" defaultValue={formatFaqs(tour?.faqs)} placeholder="FAQs: one Question | Answer per line" className="textarea md:col-span-2" />
      <input name="ogImage" defaultValue={tour?.ogImage || ""} placeholder="Social sharing image URL" className="input" />
      <label className="flex items-center gap-2 text-sm text-haze">
        <input type="checkbox" name="noindex" defaultChecked={tour?.noindex} /> Exclude from search engines
      </label>
    </>
  );
}

export default async function AdminToursPage() {
  const [tours, library] = await Promise.all([
    prisma.tour.findMany({ orderBy: [{ region: "asc" }, { sortOrder: "asc" }, { updatedAt: "desc" }] }),
    prisma.mediaAsset.findMany({
      where: { type: { startsWith: "image/" } },
      orderBy: { createdAt: "desc" },
      take: 60,
      select: { id: true, fileUrl: true, altText: true }
    }) as Promise<LibraryImage[]>
  ]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl text-white">Tours</h1>
        <p className="mt-2 text-sm text-haze">Manage routes, availability, and verified commercial pricing.</p>
      </div>

      <form action={createTour} className="glass grid gap-4 rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-white">Add Tour</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <input name="title" placeholder="Title" className="input" required />
          <input name="slug" placeholder="slug" className="input" required />
          <ClassificationFields />
          <input name="duration" placeholder="Duration" className="input" required />
          <PricingFields />
          <ContentFields />
          <textarea name="highlights" placeholder="Highlights" className="textarea md:col-span-2" required />
          <textarea name="itinerary" placeholder="Itinerary" className="textarea md:col-span-2" required />
          <textarea name="inclusions" placeholder="Inclusions" className="textarea md:col-span-2" required />
          <textarea name="exclusions" placeholder="Exclusions" className="textarea md:col-span-2" required />
          <ImagePicker name="images" library={library} />
          <input name="ctaLabel" placeholder="CTA label" className="input" />
          <input name="ctaHref" placeholder="CTA href" className="input" />
          <input name="seoTitle" placeholder="SEO title" className="input" />
          <input name="seoDescription" placeholder="SEO description" className="input" />
          <label className="flex items-center gap-2 text-sm text-haze"><input type="checkbox" name="published" defaultChecked /> Published</label>
          <label className="flex items-center gap-2 text-sm text-haze"><input type="checkbox" name="featured" /> Featured</label>
        </div>
        <button className="w-fit rounded-xl bg-gold px-4 py-2 text-sm font-semibold text-black">Create</button>
      </form>

      <div className="grid gap-4">
        {tours.map((tour) => {
          const price = getTourPricePresentation(tour);
          return (
            <form key={tour.id} action={updateTour} className="glass grid gap-4 rounded-2xl p-6">
              <input type="hidden" name="id" value={tour.id} />
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-lg font-semibold text-white">{tour.title}</h2>
                <span className={price.isVerified ? "text-sm text-emerald-300" : "text-sm text-amber-200"}>{price.label || "Price hidden"}</span>
              </div>
              {!price.isVerified ? <p className="rounded-xl border border-amber-400/40 bg-amber-400/10 px-4 py-3 text-sm text-amber-100">Public price is hidden until a public display mode and matching amount are saved. Optional validity dates must include today.</p> : null}
              <div className="grid gap-4 md:grid-cols-2">
                <input name="title" defaultValue={tour.title} className="input" required />
                <input name="slug" defaultValue={tour.slug} className="input" required />
                <ClassificationFields tour={tour} />
                <input name="duration" defaultValue={tour.duration} className="input" required />
                <PricingFields tour={tour} />
                <ContentFields tour={tour} />
                <textarea name="highlights" defaultValue={tour.highlights} className="textarea md:col-span-2" required />
                <textarea name="itinerary" defaultValue={tour.itinerary} className="textarea md:col-span-2" required />
                <textarea name="inclusions" defaultValue={tour.inclusions} className="textarea md:col-span-2" required />
                <textarea name="exclusions" defaultValue={tour.exclusions} className="textarea md:col-span-2" required />
                <ImagePicker name="images" defaultValue={asStringArray(tour.images)} library={library} />
                <input name="ctaLabel" defaultValue={tour.ctaLabel || ""} className="input" />
                <input name="ctaHref" defaultValue={tour.ctaHref || ""} className="input" />
                <input name="seoTitle" defaultValue={tour.seoTitle || ""} className="input" />
                <input name="seoDescription" defaultValue={tour.seoDescription || ""} className="input" />
                <label className="flex items-center gap-2 text-sm text-haze"><input type="checkbox" name="published" defaultChecked={tour.published} /> Published</label>
                <label className="flex items-center gap-2 text-sm text-haze"><input type="checkbox" name="featured" defaultChecked={tour.featured} /> Featured</label>
              </div>
              <div className="flex gap-2">
                <button className="rounded-xl bg-white/10 px-4 py-2 text-sm text-white">Update</button>
                <button formAction={deleteTour} className="rounded-xl border border-rose-400/50 px-4 py-2 text-sm text-rose-200">Delete</button>
              </div>
            </form>
          );
        })}
      </div>
    </div>
  );
}
