import Image from "next/image";

import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { getPublishedServices } from "@/lib/cms";
import { buildPageMetadata } from "@/lib/seo/page-seo";
import { buildBreadcrumbSchema } from "@/lib/seo/schema";

export const metadata = buildPageMetadata("/services");

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" }
];

export const revalidate = 900;

export default async function ServicesPage() {
  const services = await getPublishedServices();

  return (
    <>
      <JsonLd data={buildBreadcrumbSchema(breadcrumbs)} />
      <Breadcrumbs items={breadcrumbs} />
      <section className="relative isolate min-h-[440px] overflow-hidden bg-ink text-white sm:min-h-[500px]">
        <Image
          src="/images/campaign/sharing-heli-hero.jpg"
          alt="Helicopter flying near the Himalayas in Nepal"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-ink/65" aria-hidden="true" />
        <div className="shell relative z-10 flex min-h-[440px] items-end py-12 sm:min-h-[500px] sm:py-16">
          <div className="max-w-3xl">
            <p className="text-[11px] font-semibold uppercase text-sky-300">Our services</p>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-normal text-white sm:text-6xl">Helicopter services in Nepal</h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/80 sm:text-lg">Choose the service that matches your route, group, and travel date. Each request is reviewed for aircraft, weather, permissions, and passenger requirements.</p>
          </div>
        </div>
      </section>
      <ServicesGrid services={services} />
    </>
  );
}
