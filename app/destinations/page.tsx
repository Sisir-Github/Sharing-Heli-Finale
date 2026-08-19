import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";

import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { buildPageMetadata } from "@/lib/seo/page-seo";
import { buildBreadcrumbSchema } from "@/lib/seo/schema";
import { DESTINATION_GUIDES } from "@/lib/destinations";

export const metadata = buildPageMetadata("/destinations");
export const revalidate = 900;

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Destinations", path: "/destinations" }
];

export default function DestinationsPage() {
  return (
    <>
      <JsonLd data={buildBreadcrumbSchema(breadcrumbs)} />
      <PageHero
        eyebrow="Destinations"
        title="Helicopter flight regions in Nepal"
        description="Start with the region you want to reach. We then check aircraft availability, weather, permissions, passenger details and the practical route for your date."
        image="/images/campaign/annapurna-helicopter.jpg"
        imageAlt="Helicopter flying over a Nepal mountain region"
        primaryAction={{ label: "Reserve a flight", href: "/check-availability" }}
        priority
      />

      <section className="band band-cream">
        <div className="shell grid gap-5 md:grid-cols-2">
          {DESTINATION_GUIDES.map((destination) => (
            <article key={destination.slug} className="surface-card surface-card-hover group flex flex-col overflow-hidden">
              <Link href={`/destinations/${destination.slug}`} className="relative block aspect-[16/9] overflow-hidden bg-creamdeep">
                <Image
                  src={destination.image}
                  alt={`${destination.title} helicopter destination in Nepal`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </Link>
              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <p className="flex items-center gap-2 font-display text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
                  <MapPin size={13} className="text-accent" /> {destination.region}
                </p>
                <h2 className="mt-3 font-display text-2xl font-semibold uppercase leading-7 tracking-[0.04em] text-navy">
                  {destination.title}
                </h2>
                <p className="mt-3 text-sm leading-[1.85] text-[var(--muted)]">{destination.description}</p>
                <Link href={`/destinations/${destination.slug}`} className="editorial-link mt-auto w-fit pt-6">
                  View destination
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
