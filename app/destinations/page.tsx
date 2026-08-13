import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";

import { PageIntro } from "@/components/layout/PageIntro";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
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
      <Breadcrumbs items={breadcrumbs} />
      <PageIntro
        eyebrow="Destinations"
        title="Helicopter Flight Regions in Nepal"
        description="Start with the region you want to reach. We then check aircraft availability, weather, permissions, passenger details, and the practical route for your date."
      />
      <section className="section-space bg-canvas pt-4">
        <div className="shell grid gap-5 md:grid-cols-2">
          {DESTINATION_GUIDES.map((destination) => (
            <article key={destination.slug} className="surface-card surface-card-hover group overflow-hidden">
              <Link href={`/destinations/${destination.slug}`} className="relative block aspect-[16/9]">
                <Image
                  src={destination.image}
                  alt={`${destination.title} helicopter destination in Nepal`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </Link>
              <div className="p-6">
                <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-copper">
                  <MapPin size={13} /> {destination.region}
                </p>
                <h2 className="mt-3 font-display text-3xl font-semibold tracking-normal text-ink">{destination.title}</h2>
                <p className="copy mt-3">{destination.description}</p>
                <Link href={`/destinations/${destination.slug}`} className="editorial-link-dark mt-5">
                  View destination <ArrowUpRight size={15} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
