import { Camera, Package, Plane, ShieldPlus, Sparkles, Timer } from "lucide-react";
import Link from "next/link";

import { InquiryButton } from "@/components/ui/InquiryButton";
import { Reveal } from "@/components/ui/Reveal";
import { getInquiryPath } from "@/lib/inquiry";
import { SectionHeading } from "@/components/ui/SectionHeading";

const iconMap = [Plane, Sparkles, Timer, ShieldPlus, Camera, Package];

type ServiceItem = {
  id: string;
  title: string;
  shortDescription: string;
  slug: string;
};

export function ServicesOverview({ services }: { services: ServiceItem[] }) {
  return (
    <section className="section-space" id="services-overview">
      <Reveal className="shell space-y-10">
        <SectionHeading
          eyebrow="Core Services"
          title="Precision Helicopter Operations For Every Mission"
          description="From luxury charters to urgent rescue deployments, Sharing Heli delivers high-altitude reliability with premium service standards."
          centered
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = iconMap[index % iconMap.length];

            return (
              <article
                key={service.id}
                className="glass rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-aurora/40 hover:shadow-luxe"
              >
                <div className="inline-flex rounded-xl border border-gold/35 bg-gold/10 p-3 text-gold">
                  <Icon size={18} />
                </div>
                <h3 className="mt-4 font-display text-2xl text-white">{service.title}</h3>
                <p className="copy mt-3">{service.shortDescription}</p>
                <Link href={`/services/${service.slug}`} className="mt-4 inline-flex text-sm font-medium text-gold transition-colors hover:text-amber-200">
                  Learn more
                </Link>
                <InquiryButton href={getInquiryPath(service.title)} className="mt-5" />
              </article>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}
