import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock3, MapPin, Plane, Users } from "lucide-react";

import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getCanonicalTourPath } from "@/lib/seo/canonical";
import { getTourImage } from "@/lib/tours/images";
import { getTourPricePresentation, type TourPricing } from "@/lib/tours/pricing";

type TourItem = TourPricing & {
  id: string;
  title: string;
  duration: string;
  currency: string;
  slug: string;
  images: string[];
  seoDescription?: string | null;
  sharedAvailable?: boolean;
  privateAvailable?: boolean;
  departureCity?: string | null;
};

export function SignatureTours({ tours }: { tours: TourItem[] }) {
  const featuredTours = tours.slice(0, 3);

  return (
    <section className="home-tours section-space bg-canvas" id="signature-tours">
      <Reveal className="shell">
        <div className="flex flex-col gap-7 border-b border-ink/[0.12] pb-9 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Popular routes"
            title="Choose the route you want to check."
            description="Everest, Annapurna, and Muktinath are the most requested routes. Each still needs current weather, aircraft, and passenger review."
          />
          <Link href="/tours" className="editorial-link-dark shrink-0">
            Explore every route <ArrowUpRight size={16} />
          </Link>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-12 lg:grid-rows-2">
          {featuredTours.map((tour, index) => {
            const price = getTourPricePresentation(tour);
            const href = getCanonicalTourPath(tour.slug);
            const isFeature = index === 0;
            const image = getTourImage(tour.slug, tour.images?.[0]);

            return (
              <article
                key={tour.id}
                className={isFeature ? "group relative min-h-[520px] overflow-hidden rounded-lg lg:col-span-7 lg:row-span-2" : "group relative min-h-[260px] overflow-hidden rounded-lg lg:col-span-5"}
              >
                <Link href={href} className="absolute inset-0">
                  <Image
                    src={image}
                    alt={`${tour.title} helicopter journey in Nepal`}
                    fill
                    sizes={isFeature ? "(max-width: 1024px) 100vw, 58vw" : "(max-width: 1024px) 100vw, 42vw"}
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,13,18,0.02)_20%,rgba(4,13,18,0.2)_50%,rgba(4,13,18,0.9)_100%)]" />
                </Link>

                <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 p-5 sm:p-7">
                  <div className="mb-4 flex flex-wrap gap-2">
                    {tour.sharedAvailable ? <span className="route-chip"><Users size={12} /> Shared request</span> : null}
                    {tour.privateAvailable !== false ? <span className="route-chip"><Plane size={12} /> Private charter</span> : null}
                  </div>
                  <div className="flex items-end justify-between gap-5">
                    <div>
                      <p className="mb-2 flex flex-wrap gap-x-4 gap-y-1 text-[11px] font-medium uppercase tracking-[0.12em] text-white/[0.58]">
                        <span className="inline-flex items-center gap-1.5"><Clock3 size={13} />{tour.duration}</span>
                        {tour.departureCity ? <span className="inline-flex items-center gap-1.5"><MapPin size={13} />{tour.departureCity}</span> : null}
                      </p>
                      <h3 className={isFeature ? "max-w-xl font-display text-3xl font-semibold leading-tight tracking-normal text-white sm:text-5xl" : "font-display text-2xl font-semibold leading-tight tracking-normal text-white sm:text-3xl"}>
                        {tour.title}
                      </h3>
                      {isFeature ? <p className="mt-3 max-w-xl text-sm leading-6 text-white/[0.62]">{tour.seoDescription}</p> : null}
                      {price.label ? <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-copper">{price.label}</p> : null}
                    </div>
                    <Link href={href} className="pointer-events-auto grid h-12 w-12 shrink-0 place-items-center rounded-lg border border-white/25 bg-white/10 text-white transition-all hover:bg-copper hover:text-ink" aria-label={`View ${tour.title}`}>
                      <ArrowUpRight size={18} />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

      </Reveal>
    </section>
  );
}
