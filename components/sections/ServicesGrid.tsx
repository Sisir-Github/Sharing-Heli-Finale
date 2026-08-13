import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Camera, Package, Plane, ShieldPlus, Sparkles, Timer } from "lucide-react";

import { Reveal } from "@/components/ui/Reveal";
import { getCanonicalServicePath } from "@/lib/seo/canonical";
import { safeLocalImageSource } from "@/lib/safe-url";

const iconMap = [Plane, Sparkles, Timer, ShieldPlus, Camera, Package];

const imageMap: Record<string, string> = {
  "helicopter-charter-nepal": "/images/campaign/sharing-heli-hero.jpg",
  "shared-helicopter-flights": "/images/campaign/everest-helicopter.jpg",
  "pokhara-helicopter-service": "/images/campaign/annapurna-helicopter.jpg",
  "luxury-helicopter-tour-nepal": "/images/campaign/sharing-heli-hero.jpg",
  "muktinath-helicopter-tour-nepal": "/images/campaign/muktinath-helicopter.jpg",
  "emergency-helicopter-rescue-nepal": "/images/campaign/annapurna-helicopter.jpg"
};

function getServiceImage(service: ServiceItem) {
  const uploadedImage = service.featuredImage?.trim();
  if (uploadedImage && !uploadedImage.toLowerCase().endsWith(".svg")) {
    return safeLocalImageSource(uploadedImage, imageMap[service.slug] || "/images/campaign/sharing-heli-hero.jpg");
  }
  return imageMap[service.slug] || "/images/campaign/sharing-heli-hero.jpg";
}

type ServiceItem = {
  id: string;
  title: string;
  shortDescription: string;
  slug: string;
  featuredImage?: string | null;
};

export function ServicesGrid({ services }: { services: ServiceItem[] }) {
  return (
    <section className="section-space bg-canvas pt-4">
      <Reveal className="shell grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => {
          const Icon = iconMap[index % iconMap.length];
          const imageSrc = getServiceImage(service);
          const href = getCanonicalServicePath(service.slug);

          return (
            <article
              key={service.id}
              className="surface-card surface-card-hover group flex flex-col overflow-hidden"
            >
              <Link href={href} className="relative block aspect-[16/10] overflow-hidden">
                <Image
                  src={imageSrc}
                  alt={`${service.title} helicopter service in Nepal`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  loading="lazy"
                />
              </Link>
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <div className="inline-flex w-fit rounded-lg border border-ink/10 bg-canvas p-3 text-rhododendron">
                  <Icon size={18} />
                </div>
                <h2 className="mt-4 font-display text-2xl font-semibold tracking-normal text-ink">{service.title}</h2>
                <p className="copy mt-3">{service.shortDescription}</p>
                <div className="mt-auto pt-5">
                  <Link href={href} className="editorial-link-dark">
                    Learn more <ArrowUpRight size={15} />
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
