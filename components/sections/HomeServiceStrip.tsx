import Image from "next/image";
import Link from "next/link";

import { getCanonicalServicePath } from "@/lib/seo/canonical";

type ServiceItem = {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
};

const preferredSlugs = [
  "shared-helicopter-flights",
  "helicopter-charter-nepal",
  "muktinath-helicopter-tour-nepal",
  "pokhara-helicopter-service"
];

const serviceImages: Record<string, string> = {
  "shared-helicopter-flights": "/images/campaign/everest-helicopter.jpg",
  "helicopter-charter-nepal": "/images/campaign/sharing-heli-hero.jpg",
  "muktinath-helicopter-tour-nepal": "/images/campaign/muktinath-helicopter.jpg",
  "pokhara-helicopter-service": "/images/campaign/annapurna-helicopter.jpg"
};

/** Four-up card strip sitting directly under the hero. */
export function HomeServiceStrip({ services }: { services: ServiceItem[] }) {
  const ordered = preferredSlugs
    .map((slug) => services.find((service) => service.slug === slug))
    .filter((service): service is ServiceItem => Boolean(service));
  const resolved = [...ordered, ...services.filter((service) => !preferredSlugs.includes(service.slug))].slice(0, 4);

  return (
    <section className="band-cream-deep border-b border-sand py-10 sm:py-12" aria-label="Helicopter services">
      <div className="shell grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {resolved.map((service) => (
          <article key={service.id} className="group relative min-h-[270px] overflow-hidden rounded-card bg-navy sm:min-h-[290px]">
            <Image
              src={serviceImages[service.slug] || "/images/campaign/sharing-heli-hero.jpg"}
              alt={`${service.title} in Nepal`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div
              className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,42,60,0.1),rgba(10,42,60,0.88))]"
              aria-hidden="true"
            />
            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
              <h2 className="font-display text-[15px] font-semibold uppercase leading-5 tracking-[0.14em] text-white">
                {service.title}
              </h2>
              <p className="mt-2.5 line-clamp-2 text-xs leading-5 text-white/60">{service.shortDescription}</p>
              <Link
                href={getCanonicalServicePath(service.slug)}
                className="light-button mt-5 min-h-[38px] px-4 py-2.5 text-[10px]"
              >
                Learn more
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
