import Image from "next/image";
import Link from "next/link";
import { Clock3, MapPin, Plane, Users } from "lucide-react";

import { Reveal } from "@/components/ui/Reveal";
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
  const featuredTours = tours.slice(0, 2);

  return (
    <section className="band band-cream" id="signature-tours">
      <Reveal className="shell">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow justify-center">
            <span className="inline-block h-px w-7 bg-current align-middle" aria-hidden="true" />
            Popular routes
          </p>
          <h2 className="mt-5 font-display text-[2rem] font-semibold leading-[1.08] tracking-[-0.01em] text-navy sm:text-[2.7rem]">
            Scenic Flights
          </h2>
          <p className="mt-5 text-[15px] leading-[1.85] text-[var(--muted)]">
            Everest, Annapurna and Muktinath are the most requested routes. Each is still reviewed against current
            weather, aircraft availability and passenger details before it is confirmed.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {featuredTours.map((tour) => {
            const price = getTourPricePresentation(tour);
            const href = getCanonicalTourPath(tour.slug);
            const image = getTourImage(tour.slug, tour.images?.[0]);

            return (
              <article key={tour.id} className="surface-card surface-card-hover group flex min-h-full flex-col overflow-hidden">
                <Link href={href} className="relative block aspect-[16/10] overflow-hidden bg-creamdeep">
                  <Image
                    src={image}
                    alt={`${tour.title} helicopter journey in Nepal`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </Link>

                <div className="flex flex-1 flex-col p-6 sm:p-8">
                  <p className="flex flex-wrap gap-x-5 gap-y-1 font-display text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                    <span className="inline-flex items-center gap-1.5">
                      <Clock3 size={13} className="text-accent" />
                      {tour.duration}
                    </span>
                    {tour.departureCity ? (
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin size={13} className="text-accent" />
                        {tour.departureCity}
                      </span>
                    ) : null}
                  </p>
                  <h3 className="mt-4 font-display text-[1.6rem] font-semibold leading-[1.15] text-navy">{tour.title}</h3>
                  {tour.seoDescription ? (
                    <p className="mt-4 line-clamp-4 text-sm leading-[1.85] text-[var(--muted)]">{tour.seoDescription}</p>
                  ) : null}

                  <div className="mt-5 flex flex-wrap gap-2">
                    {tour.sharedAvailable ? (
                      <span className="route-chip">
                        <Users size={12} className="text-accent" /> Shared
                      </span>
                    ) : null}
                    {tour.privateAvailable !== false ? (
                      <span className="route-chip">
                        <Plane size={12} className="text-accent" /> Private
                      </span>
                    ) : null}
                  </div>

                  <div className="mt-auto flex flex-wrap items-center justify-between gap-4 border-t border-sand pt-6">
                    <p className="font-display text-sm font-semibold text-navy">
                      {price.label || "Quoted per request"}
                    </p>
                    <Link href={href} className="inquiry-button min-h-[40px] px-5 py-2.5">
                      Learn more
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-11 text-center">
          <Link href="/tours" className="outline-button">
            Explore every route
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
