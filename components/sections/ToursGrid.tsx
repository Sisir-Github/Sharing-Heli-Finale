import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock3, MountainSnow } from "lucide-react";

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
};

export function ToursGrid({ tours }: { tours: TourItem[] }) {
  return (
    <section className="section-space bg-canvas pt-4">
      <Reveal className="shell grid gap-5 lg:grid-cols-3">
        {tours.map((tour) => {
          const price = getTourPricePresentation(tour);
          const href = getCanonicalTourPath(tour.slug);
          const image = getTourImage(tour.slug, tour.images?.[0]);
          return (
          <article
            key={tour.id}
            className="surface-card surface-card-hover group flex flex-col overflow-hidden"
          >
            <Link href={href} className="relative block aspect-[16/10] overflow-hidden">
              <Image
                src={image}
                alt={`${tour.title} in Nepal by Sharing Heli`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                loading="lazy"
              />
            </Link>
            <div className="flex flex-1 flex-col p-5 sm:p-6">
              <div className="flex items-center justify-between gap-4">
                <div className="inline-flex rounded-lg border border-ink/10 bg-canvas p-3 text-rhododendron">
                  <MountainSnow size={18} />
                </div>
                <span className="inline-flex items-center gap-1 rounded-md border border-ink/10 bg-canvas px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-slate-600">
                  <Clock3 size={14} /> {tour.duration}
                </span>
              </div>
              <h2 className="mt-5 font-display text-2xl font-semibold tracking-normal text-ink">{tour.title}</h2>
              <p className="copy mt-3">{tour.seoDescription || "Signature Himalayan flight with practical route planning and direct local support."}</p>
              {price.label ? <p className="mt-5 text-sm font-semibold text-rhododendron">{price.label}</p> : null}
              {price.detail ? <p className="copy mt-2 text-xs">{price.detail}</p> : null}
              <div className="mt-auto pt-5">
                <Link href={href} className="editorial-link-dark">
                  Tour details <ArrowUpRight size={15} />
                </Link>
              </div>
            </div>
          </article>
          );
        })}
      </Reveal>
    </section>
  );
}
