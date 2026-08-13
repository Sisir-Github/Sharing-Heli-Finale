import { ArrowUpRight, Camera, Package, Plane, ShieldPlus, Sparkles, Timer } from "lucide-react";
import Link from "next/link";

import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getCanonicalServicePath } from "@/lib/seo/canonical";

const iconMap = [Plane, Sparkles, Timer, ShieldPlus, Camera, Package];

type ServiceItem = {
  id: string;
  title: string;
  shortDescription: string;
  slug: string;
};

export function ServicesOverview({ services }: { services: ServiceItem[] }) {
  return (
    <section className="home-services section-space bg-canvas" id="services-overview">
      <Reveal className="shell grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            eyebrow="Beyond scheduled tours"
            title="Flights shaped around the purpose."
            description="Private routes, pilgrimage journeys, urgent coordination, and special-purpose flights all start with a direct feasibility review."
          />
          <Link href="/services" className="inquiry-button mt-8">Explore all services <ArrowUpRight size={16} /></Link>
        </div>

        <div className="divide-y divide-ink/[0.12] border-y border-ink/[0.12]">
          {services.slice(0, 6).map((service, index) => {
            const Icon = iconMap[index % iconMap.length];
            const displayService = service.slug === "emergency-helicopter-rescue-nepal"
              ? { ...service, title: "Emergency Flight Coordination", shortDescription: "Relay urgent transport needs subject to aircraft, weather, permissions, daylight, and operator confirmation." }
              : service.slug === "luxury-helicopter-tour-nepal"
                ? { ...service, title: "Custom Helicopter Experiences", shortDescription: "Private flights for filming, photography, corporate travel, proposals, and special occasions." }
                : service;

            return (
              <Link key={displayService.id} href={getCanonicalServicePath(displayService.slug)} className="service-row group grid gap-4 py-7 sm:grid-cols-[52px_1fr_auto] sm:items-center sm:gap-6">
                <span className="service-icon grid h-12 w-12 place-items-center rounded-lg border border-ink/[0.12] text-ink transition-all group-hover:border-copper group-hover:bg-copper"><Icon size={19} /></span>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-copper">Service 0{index + 1}</p>
                  <h3 className="mt-2 font-display text-2xl font-semibold tracking-normal text-ink sm:text-3xl">{displayService.title}</h3>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">{displayService.shortDescription}</p>
                </div>
                <span className="hidden h-11 w-11 place-items-center rounded-lg border border-ink/15 text-ink transition-all group-hover:border-ink group-hover:bg-ink group-hover:text-white sm:grid"><ArrowUpRight size={17} /></span>
              </Link>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}
