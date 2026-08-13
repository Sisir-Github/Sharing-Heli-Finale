import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";

import { SectionHeading } from "@/components/ui/SectionHeading";
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
    <section className="section-space bg-[#e8edf0]" id="destinations">
      <Reveal className="shell">
        <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Across Nepal"
            title="Choose the region. We will shape the route."
            description="Every Himalayan flight depends on conditions, timing, landing permissions, and passenger needs. Start with the place and we will handle the practical review."
          />
          <Link href="/destinations" className="editorial-link-dark shrink-0">Browse all destinations <ArrowUpRight size={16} /></Link>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {destinations.slice(0, 3).map((item, index) => (
            <article key={item.title} className="destination-card group relative overflow-hidden rounded-lg">
              <div className="relative aspect-[4/5]">
                <Image
                  src={destinationImages[index] || item.image || "/images/tours-overview.svg"}
                  alt={`${item.title} helicopter destination in Nepal`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/5 to-transparent" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-copper"><MapPin size={13} /> Nepal</p>
                <h3 className="mt-3 font-display text-3xl font-semibold tracking-normal text-white">{item.title}</h3>
                <p className="mt-3 line-clamp-2 text-sm leading-6 text-white/58 transition-all duration-300 group-hover:text-white/78">{item.description}</p>
                <Link href={getDestinationHref(item.title)} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white">Explore route <ArrowUpRight size={15} /></Link>
              </div>
            </article>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
