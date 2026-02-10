import Image from "next/image";
import Link from "next/link";
import { Camera, Package, Plane, ShieldPlus, Sparkles, Timer } from "lucide-react";

import { InquiryButton } from "@/components/ui/InquiryButton";
import { Reveal } from "@/components/ui/Reveal";
import { getInquiryPath } from "@/lib/inquiry";

const iconMap = [Plane, Sparkles, Timer, ShieldPlus, Camera, Package];

const imageMap = [
  "/images/charter-service.svg",
  "/images/tours-overview.svg",
  "/images/muktinath-tour.svg",
  "/images/rescue-service.svg",
  "/images/luxury-nepal-helicopter.svg",
  "/images/services-overview.svg"
];

type ServiceItem = {
  id: string;
  title: string;
  shortDescription: string;
  slug: string;
  featuredImage?: string | null;
};

export function ServicesGrid({ services }: { services: ServiceItem[] }) {
  return (
    <section className="section-space pt-4">
      <Reveal className="shell grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => {
          const Icon = iconMap[index];
          const imageSrc = service.featuredImage || imageMap[index] || "/images/services-overview.svg";

          return (
            <article
              key={service.id}
              className="glass rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-aurora/40 hover:shadow-luxe"
            >
              <div className="overflow-hidden rounded-2xl border border-white/10">
                <Image
                  src={imageSrc}
                  alt={`${service.title} helicopter service in Nepal`}
                  width={1600}
                  height={900}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="h-44 w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="mt-4 inline-flex rounded-xl border border-gold/35 bg-gold/10 p-3 text-gold">
                <Icon size={18} />
              </div>
              <h2 className="mt-4 font-display text-2xl text-white">{service.title}</h2>
              <p className="copy mt-3">{service.shortDescription}</p>
              <Link href={`/services/${service.slug}`} className="mt-4 inline-flex text-sm font-medium text-gold transition-colors hover:text-amber-200">
                Learn more
              </Link>
              <InquiryButton href={getInquiryPath(service.title)} className="mt-5" />
            </article>
          );
        })}
      </Reveal>
    </section>
  );
}
