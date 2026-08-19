import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/ui/Reveal";
import { getCanonicalServicePath } from "@/lib/seo/canonical";
import { safeLocalImageSource } from "@/lib/safe-url";

const imageMap: Record<string, string> = {
  "helicopter-charter-nepal": "/images/campaign/sharing-heli-hero.jpg",
  "shared-helicopter-flights": "/images/campaign/everest-helicopter.jpg",
  "pokhara-helicopter-service": "/images/campaign/annapurna-helicopter.jpg",
  "luxury-helicopter-tour-nepal": "/images/campaign/sharing-heli-hero.jpg",
  "muktinath-helicopter-tour-nepal": "/images/campaign/muktinath-helicopter.jpg",
  "emergency-helicopter-rescue-nepal": "/images/campaign/annapurna-helicopter.jpg"
};

type ServiceItem = {
  id: string;
  title: string;
  shortDescription: string;
  slug: string;
  featuredImage?: string | null;
};

function getServiceImage(service: ServiceItem) {
  const uploadedImage = service.featuredImage?.trim();
  if (uploadedImage && !uploadedImage.toLowerCase().endsWith(".svg")) {
    return safeLocalImageSource(uploadedImage, imageMap[service.slug] || "/images/campaign/sharing-heli-hero.jpg");
  }
  return imageMap[service.slug] || "/images/campaign/sharing-heli-hero.jpg";
}

export function ServicesGrid({ services }: { services: ServiceItem[] }) {
  return (
    <section className="band band-cream">
      <Reveal className="shell grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => {
          const imageSrc = getServiceImage(service);
          const href = getCanonicalServicePath(service.slug);

          return (
            <article key={service.id} className="surface-card surface-card-hover group flex flex-col overflow-hidden">
              <Link href={href} className="relative block aspect-[16/10] overflow-hidden bg-creamdeep">
                <Image
                  src={imageSrc}
                  alt={`${service.title} helicopter service in Nepal`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </Link>
              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <span className="font-display text-[11px] font-semibold uppercase tracking-[0.24em] text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h2 className="mt-4 font-display text-xl font-semibold uppercase leading-6 tracking-[0.05em] text-navy">
                  {service.title}
                </h2>
                <p className="mt-3 text-sm leading-[1.85] text-[var(--muted)]">{service.shortDescription}</p>
                <Link href={href} className="editorial-link mt-auto w-fit pt-6">
                  Learn more
                </Link>
              </div>
            </article>
          );
        })}
      </Reveal>
    </section>
  );
}
