import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";

import { Reveal } from "@/components/ui/Reveal";
import { DESTINATION_GUIDES } from "@/lib/destinations";

type DestinationItem = {
  id: string;
  title: string;
  description: string;
  image?: string | null;
};

const destinationImages = [
  "/images/campaign/annapurna-helicopter.jpg",
  "/images/campaign/everest-helicopter.jpg",
  "/images/campaign/muktinath-helicopter.jpg"
];

function getDestinationHref(title: string) {
  const normalized = title.toLowerCase();
  if (normalized.includes("pilgrimage")) return "/destinations/muktinath";
  const destination = DESTINATION_GUIDES.find((item) => normalized.includes(item.title.toLowerCase().split(" ")[0]));
  return destination ? `/destinations/${destination.slug}` : "/destinations";
}

export function Destinations({ destinations }: { destinations: DestinationItem[] }) {
  return (
    <section className="band band-white" id="destinations">
      <Reveal className="shell">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow justify-center">
            <span className="inline-block h-px w-7 bg-current align-middle" aria-hidden="true" />
            Regions we fly
          </p>
          <h2 className="mt-5 font-display text-[2rem] font-semibold leading-[1.08] tracking-[-0.01em] text-navy sm:text-[2.7rem]">
            Choose the landscape
          </h2>
          <p className="mt-5 text-[15px] leading-[1.85] text-[var(--muted)]">
            Start with a region and compare the practical flight options, departure points and route requirements.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {destinations.slice(0, 3).map((item, index) => (
            <article key={item.title} className="destination-card group flex flex-col overflow-hidden text-left">
              <Link href={getDestinationHref(item.title)} className="relative block aspect-[4/3] overflow-hidden bg-creamdeep">
                <Image
                  src={destinationImages[index] || item.image || "/images/tours-overview.svg"}
                  alt={`${item.title} helicopter destination in Nepal`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </Link>
              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <p className="flex items-center gap-2 font-display text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
                  <MapPin size={13} className="text-accent" /> Nepal
                </p>
                <h3 className="mt-3 font-display text-xl font-semibold uppercase leading-6 tracking-[0.06em] text-navy">
                  {item.title}
                </h3>
                <p className="mt-3 line-clamp-3 text-sm leading-[1.85] text-[var(--muted)]">{item.description}</p>
                <Link href={getDestinationHref(item.title)} className="editorial-link mt-auto w-fit pt-6">
                  Explore region
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-11 text-center">
          <Link href="/destinations" className="outline-button">
            Browse every destination
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
