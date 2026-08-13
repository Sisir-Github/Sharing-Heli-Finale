import Image from "next/image";
import Link from "next/link";

import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { ServiceDetail } from "@/components/services/ServiceDetail";
import { ReservationButton } from "@/components/ui/ReservationButton";
import { buildBreadcrumbSchema } from "@/lib/seo/schema";
import { safeLocalImageSource } from "@/lib/safe-url";

type ContactSettings = {
  primaryPhone: string;
  whatsappNumber: string;
  email: string;
  operatingUnder: string;
};

type Service = {
  title: string;
  shortDescription: string;
  longDescription: string;
  seoDescription?: string | null;
  featuredImage?: string | null;
};

function getServiceImage(path: string, featuredImage?: string | null) {
  if (featuredImage && !featuredImage.toLowerCase().endsWith(".svg")) {
    return safeLocalImageSource(featuredImage, "/images/campaign/sharing-heli-hero.jpg");
  }
  if (path.includes("muktinath")) return "/images/campaign/muktinath-helicopter.jpg";
  if (path.includes("everest") || path.includes("shared")) return "/images/campaign/everest-helicopter.jpg";
  if (path.includes("pokhara") || path.includes("emergency")) return "/images/campaign/annapurna-helicopter.jpg";
  return "/images/campaign/sharing-heli-hero.jpg";
}

export function ServiceLanding({
  service,
  path
}: {
  service: Service;
  path: string;
  contactSettings: ContactSettings;
}) {
  const displayService = path.includes("emergency-helicopter-rescue-nepal")
    ? {
        ...service,
        title: "Emergency Flight Coordination",
        shortDescription: "Time-sensitive helicopter coordination subject to aircraft, weather, daylight, permissions, payment or insurance arrangements, and operator confirmation.",
        longDescription: "Sharing Heli can help relay urgent transport requirements to available operators. Sharing Heli does not guarantee dispatch, medical care, aircraft availability, or a successful rescue. The operating company remains responsible for the flight decision. Emergency cases may require location details, patient information, an insurer or payment guarantee, permissions, and coordination with medical or local authorities."
      }
    : path.includes("luxury-helicopter-tour-nepal")
      ? {
          ...service,
          title: "Custom Helicopter Experiences",
          shortDescription: "Private flight planning for photography, filming, corporate travel, proposals, and special occasions.",
          longDescription: "Share the intended route, purpose, passenger count, equipment, and date. The operations desk will review aircraft suitability, permissions, operating limitations, availability, and a current quote before any confirmation."
        }
      : service;
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: displayService.title, path }
  ];
  const heroImage = getServiceImage(path, displayService.featuredImage);

  return (
    <>
      <JsonLd data={buildBreadcrumbSchema(breadcrumbs)} />
      <Breadcrumbs items={breadcrumbs} />
      <section className="relative isolate min-h-[450px] overflow-hidden bg-ink text-white sm:min-h-[510px]">
        <Image
          src={heroImage}
          alt={`${displayService.title} in Nepal`}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-ink/70" aria-hidden="true" />
        <div className="shell relative z-10 flex min-h-[450px] items-end py-12 sm:min-h-[510px] sm:py-16">
          <div className="max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-copper">Helicopter service</p>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-normal text-white sm:text-6xl">
              {displayService.title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/80 sm:text-lg">
              {displayService.seoDescription || displayService.shortDescription}
            </p>
            <div className="mt-7 flex flex-wrap gap-3 border-t border-white/20 pt-6">
              <ReservationButton className="min-h-12 px-5" />
              <Link href="/services" className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/35 px-5 text-sm font-semibold text-white transition-colors hover:bg-white/10">
                View all services
              </Link>
            </div>
          </div>
        </div>
      </section>
      <ServiceDetail
        longDescription={displayService.longDescription}
      />
    </>
  );
}
