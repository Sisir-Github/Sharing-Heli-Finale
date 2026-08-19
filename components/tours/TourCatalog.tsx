"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock3, Landmark, MapPin, Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";

import { getCanonicalTourPath } from "@/lib/seo/canonical";
import { TOUR_CATEGORIES, TOUR_CATEGORY_LABELS, type TourCategory } from "@/lib/tours/categories";
import { getTourImage } from "@/lib/tours/images";
import { getTourComparisonRates, type TourPricing } from "@/lib/tours/pricing";
import { normalizeTourRegion, TOUR_REGION_CONTENT, type TourRegion } from "@/lib/tours/regions";

export type TourCatalogItem = TourPricing & {
  id: string;
  title: string;
  slug: string;
  region: TourRegion;
  category: TourCategory;
  sortOrder: number;
  duration: string;
  departureCity: string | null;
  excerpt: string | null;
  route: string | null;
  images: string[];
};

type FareFilter = "ALL" | "SHARED" | "PRIVATE";
type RegionFilter = "ALL" | TourRegion;
type TourTypeFilter = "ALL" | TourCategory;

function Fare({ label, value, basis }: { label: string; value: string | null; basis: string }) {
  return (
    <div className="min-w-0">
      <p className="text-[10px] font-semibold uppercase tracking-[0.11em] text-slate-500">{label}</p>
      <p className="mt-1 truncate text-sm font-semibold text-ink">{value || "On request"}</p>
      <p className="mt-0.5 text-[11px] text-slate-500">{basis}</p>
    </div>
  );
}

export function TourCatalog({ tours }: { tours: TourCatalogItem[] }) {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState<RegionFilter>("ALL");
  const [tourType, setTourType] = useState<TourTypeFilter>("ALL");
  const [fare, setFare] = useState<FareFilter>("ALL");

  const filteredTours = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return tours.filter((tour) => {
      const rates = getTourComparisonRates(tour);
      const matchesQuery = !normalizedQuery || [tour.title, tour.departureCity, tour.route, tour.excerpt]
        .filter(Boolean)
        .some((value) => value!.toLowerCase().includes(normalizedQuery));
      const matchesRegion = region === "ALL" || tour.region === region;
      const matchesTourType = tourType === "ALL" || tour.category === tourType;
      const matchesFare = fare === "ALL" || (fare === "SHARED" ? Boolean(rates.shared) : Boolean(rates.privateCharter));
      return matchesQuery && matchesRegion && matchesTourType && matchesFare;
    });
  }, [fare, query, region, tourType, tours]);

  const hasFilters = Boolean(query) || region !== "ALL" || tourType !== "ALL" || fare !== "ALL";

  function resetFilters() {
    setQuery("");
    setRegion("ALL");
    setTourType("ALL");
    setFare("ALL");
  }

  return (
    <section className="band band-cream border-y border-sand">
      <div className="shell">
        <div className="mb-10 flex flex-col gap-4 border-b border-sand pb-7 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">
              <span className="inline-block h-px w-7 bg-current align-middle" aria-hidden="true" />
              Tour directory
            </p>
            <h2 className="mt-4 font-display text-[1.8rem] font-semibold leading-[1.12] tracking-[-0.01em] text-navy sm:text-[2.3rem]">Find the right helicopter route</h2>
          </div>
          <p className="max-w-md text-sm leading-[1.85] text-[var(--muted)]">Indicative starting fares in USD. Shared seats are per person; private fares cover the aircraft.</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[230px_minmax(0,1fr)] lg:gap-10">
          <aside className="lg:border-r lg:border-sand lg:pr-7" aria-label="Tour filters">
            <div className="flex items-center justify-between gap-4">
              <p className="inline-flex items-center gap-2 font-display text-[11px] font-semibold uppercase tracking-[0.18em] text-navy"><SlidersHorizontal size={15} className="text-accent" /> Filter tours</p>
              <span className="font-display text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">{filteredTours.length} results</span>
            </div>

            <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
              <label className="block">
                <span className="field-label">Search</span>
                <span className="relative mt-2 block">
                  <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input value={query} onChange={(event) => setQuery(event.target.value)} className="input min-h-11 py-2.5 pl-10 text-sm" placeholder="Tour or destination" />
                </span>
              </label>

              <label className="block">
                <span className="field-label">Tour type</span>
                <select value={tourType} onChange={(event) => setTourType(event.target.value as TourTypeFilter)} className="input mt-2 min-h-11 py-2.5 text-sm" aria-label="Tour type">
                  <option value="ALL">All tour types</option>
                  {TOUR_CATEGORIES.map((category) => <option key={category} value={category}>{TOUR_CATEGORY_LABELS[category]}</option>)}
                </select>
              </label>

              <label className="block">
                <span className="field-label">Region</span>
                <select value={region} onChange={(event) => setRegion(event.target.value as RegionFilter)} className="input mt-2 min-h-11 py-2.5 text-sm" aria-label="Region">
                  <option value="ALL">All regions</option>
                  {TOUR_REGION_CONTENT.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
                </select>
              </label>

              <label className="block">
                <span className="field-label">Fare type</span>
                <select value={fare} onChange={(event) => setFare(event.target.value as FareFilter)} className="input mt-2 min-h-11 py-2.5 text-sm" aria-label="Fare type">
                  <option value="ALL">All fare types</option>
                  <option value="SHARED">Shared seat listed</option>
                  <option value="PRIVATE">Private aircraft listed</option>
                </select>
              </label>
            </div>

            {hasFilters ? <button type="button" onClick={resetFilters} className="mt-6 font-display text-[11px] font-semibold uppercase tracking-[0.18em] text-accentstrong transition-colors hover:text-navy">Clear filters</button> : null}
          </aside>

          <div>
            {filteredTours.length ? (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {filteredTours.map((tour) => {
                  const rates = getTourComparisonRates(tour);
                  const href = getCanonicalTourPath(tour.slug);
                  const image = getTourImage(tour.slug, tour.images[0]);
                  const regionContent = TOUR_REGION_CONTENT.find((item) => item.id === normalizeTourRegion(tour.region, tour.slug));

                  return (
                    <article key={tour.id} className="surface-card surface-card-hover group flex min-h-full flex-col overflow-hidden" data-tour-card>
                      <Link href={href} className="relative block aspect-[16/10] overflow-hidden bg-ink/10">
                        <Image src={image} alt={`${tour.title} in Nepal`} fill sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 28vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.025]" />
                        <span className="absolute left-3 top-3 rounded-btn bg-white/95 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-navy shadow-sm">{regionContent?.shortLabel}</span>
                        {tour.category === "PILGRIMAGE" ? <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-md bg-aurora px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-navydeep shadow-sm" data-pilgrimage-label><Landmark size={12} /> Pilgrimage</span> : null}
                      </Link>

                      <div className="flex flex-1 flex-col p-5">
                        <div className="flex min-h-5 flex-wrap gap-x-4 gap-y-1 text-[11px] font-medium text-slate-500">
                          <span className="inline-flex items-center gap-1.5"><Clock3 size={13} className="text-aurora" />{tour.duration}</span>
                          <span className="inline-flex items-center gap-1.5"><MapPin size={13} className="text-aurora" />{tour.departureCity || "Flexible"}</span>
                        </div>
                        <h3 className="mt-3 font-display text-xl font-semibold leading-6 tracking-normal text-ink">
                          <Link href={href} className="transition-colors hover:text-aurora">{tour.title}</Link>
                        </h3>
                        <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">{tour.route || tour.excerpt || "View route, timing, passenger requirements, and flight details."}</p>

                        <div className="mt-5 grid grid-cols-2 gap-4 border-t border-ink/10 pt-4">
                          <Fare label="Shared seat" value={rates.shared} basis="per person" />
                          <Fare label="Private" value={rates.privateCharter} basis="per aircraft" />
                        </div>

                        <Link href={href} className="mt-5 inline-flex min-h-10 items-center justify-between border-t border-ink/10 pt-4 text-sm font-semibold text-ink transition-colors hover:text-aurora">
                          View tour <ArrowUpRight size={16} />
                        </Link>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="grid min-h-72 place-items-center border border-dashed border-ink/20 bg-canvas p-8 text-center">
                <div>
                  <p className="font-display text-2xl font-semibold tracking-normal text-ink">No matching tours</p>
                  <p className="mt-2 text-sm text-slate-600">Try a different destination, region, tour type, or fare type.</p>
                  <button type="button" onClick={resetFilters} className="mt-5 text-sm font-semibold text-aurora hover:text-ink">Show all tours</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
