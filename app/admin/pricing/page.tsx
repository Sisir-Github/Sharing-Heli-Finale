import { updateTourPricing } from "@/app/admin/pricing/actions";
import { prisma } from "@/lib/prisma";
import { getAdminPriceMode, getTourPricePresentation } from "@/lib/tours/pricing";

export const dynamic = "force-dynamic";

function dateValue(value: Date | null) {
  return value?.toISOString().slice(0, 10) || "";
}

export default async function AdminPricingPage({
  searchParams
}: {
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const status = await searchParams;
  const tours = await prisma.tour.findMany({ orderBy: [{ featured: "desc" }, { title: "asc" }] });

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-aurora">Commercial controls</p>
        <h1 className="mt-2 font-display text-3xl text-white">Tour pricing</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-haze">Update customer-facing fares without opening the full tour editor. Saving a fixed price records today as the verification date.</p>
      </div>

      {status.saved ? (
        <p className="rounded-lg border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200" role="status">
          Price saved and published to the customer-facing pages.
        </p>
      ) : null}
      {status.error ? (
        <p className="rounded-lg border border-rose-400/30 bg-rose-400/10 px-4 py-3 text-sm text-rose-200" role="alert">
          Select a public display mode and enter its matching fare. Valid-until must not be before valid-from.
        </p>
      ) : null}

      <div className="overflow-hidden rounded-lg border border-white/10 bg-white/[0.03]">
        {tours.map((tour) => {
          const price = getTourPricePresentation(tour);
          return (
            <form key={tour.id} action={updateTourPricing} className="border-b border-white/10 p-5 last:border-b-0 lg:p-6">
              <input type="hidden" name="id" value={tour.id} />
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 className="text-base font-semibold text-white">{tour.title}</h2>
                  <p className="mt-1 text-xs text-haze">/{tour.slug}</p>
                </div>
                <span className={price.isVerified ? "text-sm font-semibold text-emerald-300" : "text-sm font-semibold text-sky-300"}>{price.label || "Price hidden"}</span>
              </div>

              <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                <label className="grid gap-2 text-xs text-haze">Public price mode
                  <select name="priceMode" defaultValue={getAdminPriceMode(tour)} className="input">
                    <option value="SHARED_PER_PERSON">Show shared fare per person</option>
                    <option value="PRIVATE_PER_AIRCRAFT">Show private fare per aircraft</option>
                    <option value="LIVE_QUOTE">Hide price from website</option>
                  </select>
                </label>
                <label className="grid gap-2 text-xs text-haze">Currency
                  <input name="currency" defaultValue={tour.currency} maxLength={3} className="input" required />
                </label>
                <label className="grid gap-2 text-xs text-haze">Shared fare from
                  <input name="sharedPriceFrom" type="number" min="0" step="0.01" defaultValue={tour.sharedPriceFrom ?? ""} className="input" />
                </label>
                <label className="grid gap-2 text-xs text-haze">Private aircraft from
                  <input name="privateCharterPrice" type="number" min="0" step="0.01" defaultValue={tour.privateCharterPrice ?? ""} className="input" />
                </label>
                <label className="grid gap-2 text-xs text-haze">Valid from (optional)
                  <input name="priceValidFrom" type="date" defaultValue={dateValue(tour.priceValidFrom)} className="input" />
                </label>
                <label className="grid gap-2 text-xs text-haze">Valid until (optional)
                  <input name="priceValidUntil" type="date" defaultValue={dateValue(tour.priceValidUntil)} className="input" />
                </label>
                <label className="grid gap-2 text-xs text-haze md:col-span-2">Public pricing note
                  <input name="pricingNote" defaultValue={tour.pricingNote || ""} className="input" placeholder="What the fare includes" />
                </label>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">
                <label className="flex items-center gap-2 text-xs text-haze"><input type="checkbox" name="sharedAvailable" defaultChecked={tour.sharedAvailable} /> Shared seats</label>
                <label className="flex items-center gap-2 text-xs text-haze"><input type="checkbox" name="privateAvailable" defaultChecked={tour.privateAvailable} /> Private charter</label>
                <label className="flex items-center gap-2 text-xs text-haze"><input type="checkbox" name="published" defaultChecked={tour.published} /> Published</label>
                <button className="ml-auto rounded-lg bg-aurora px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#159bd0]">Save price</button>
              </div>
            </form>
          );
        })}
      </div>
    </div>
  );
}
