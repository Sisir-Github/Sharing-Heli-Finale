import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { FaqSection } from "@/components/seo/FaqSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { RelatedLinks } from "@/components/seo/RelatedLinks";
import { SITE_URL } from "@/lib/constants";
import { DESTINATION_GUIDES, getDestinationBySlug } from "@/lib/destinations";
import { buildBreadcrumbSchema, buildFaqSchema } from "@/lib/seo/schema";

export const revalidate = 900;

type DestinationPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return DESTINATION_GUIDES.map((destination) => ({ slug: destination.slug }));
}

export async function generateMetadata({ params }: DestinationPageProps) {
  const { slug } = await params;
  const destination = getDestinationBySlug(slug);
  if (!destination) return {};
  const canonical = `${SITE_URL.replace(/\/$/, "")}/destinations/${destination.slug}`;

  return {
    title: `${destination.title} Helicopter Flights | Sharing Heli Nepal`,
    description: destination.description,
    alternates: { canonical },
    openGraph: {
      title: `${destination.title} Helicopter Flights`,
      description: destination.description,
      url: canonical,
      type: "article",
      images: [{ url: destination.image, alt: `${destination.title} helicopter route in Nepal` }]
    },
    twitter: {
      card: "summary_large_image",
      title: `${destination.title} Helicopter Flights`,
      description: destination.description,
      images: [destination.image]
    }
  };
}

export default async function DestinationDetailPage({ params }: DestinationPageProps) {
  const { slug } = await params;
  const destination = getDestinationBySlug(slug);
  if (!destination) notFound();

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Destinations", path: "/destinations" },
    { name: destination.title, path: `/destinations/${destination.slug}` }
  ];
  const faqs = [
    {
      question: `Can Sharing Heli confirm a ${destination.title} flight instantly?`,
      answer:
        "We can take the request immediately, but confirmation depends on aircraft availability, weather, passenger details, route permissions, and operator approval."
    },
    {
      question: "Are shared seats guaranteed?",
      answer:
        "No. Shared seats are confirmed only when compatible passengers, route timing, aircraft, and commercial terms align for the requested departure."
    },
    {
      question: `What is the best time to request a ${destination.title} helicopter flight?`,
      answer: destination.bestSeason
    },
    {
      question: "What passenger information is needed before confirmation?",
      answer:
        "Provide passenger names, individual weights, baggage estimates, travel date, pickup point, and any medical or mobility considerations."
    }
  ];

  return (
    <>
      <JsonLd data={[buildBreadcrumbSchema(breadcrumbs), buildFaqSchema(faqs)]} />
      <Breadcrumbs items={breadcrumbs} />

      <section className="section-space bg-canvas">
        <div className="shell grid gap-8 lg:grid-cols-[1fr_0.85fr] lg:items-center">
          <div>
            <p className="eyebrow">{destination.region}</p>
            <h1 className="mt-4 max-w-3xl font-display text-5xl font-semibold leading-tight tracking-normal text-ink sm:text-6xl">
              {destination.title} Helicopter Flights
            </h1>
            <p className="copy mt-5 max-w-2xl">{destination.description}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href={destination.relatedHref} className="inquiry-button">
                View related route <ArrowUpRight size={16} />
              </Link>
              <Link href="/check-availability" className="outline-button">
                Reserve a flight
              </Link>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-ink/10 bg-white">
            <Image
              src={destination.image}
              alt={`${destination.title} helicopter route in Nepal`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="section-space bg-white pt-6">
        <div className="shell grid gap-5 lg:grid-cols-3">
          <article className="surface-card p-6">
            <h2 className="font-display text-2xl font-semibold tracking-normal text-ink">Common routes</h2>
            <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-600">
              {destination.routes.map((route) => (
                <li key={route} className="flex gap-3">
                  <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-copper" /> {route}
                </li>
              ))}
            </ul>
          </article>
          <article className="surface-card p-6">
            <h2 className="font-display text-2xl font-semibold tracking-normal text-ink">Best fit</h2>
            <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-600">
              {destination.bestFor.map((item) => (
                <li key={item} className="flex gap-3">
                  <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-copper" /> {item}
                </li>
              ))}
            </ul>
          </article>
          <article className="surface-card p-6">
            <h2 className="font-display text-2xl font-semibold tracking-normal text-ink">Operating notes</h2>
            <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-600">
              {destination.operatingNotes.map((note) => (
                <li key={note} className="flex gap-3">
                  <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-copper" /> {note}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="section-space bg-canvas pt-4">
        <div className="shell">
          <p className="eyebrow">Destination planning</p>
          <h2 className="mt-3 max-w-3xl font-display text-3xl font-semibold tracking-normal text-ink sm:text-4xl">
            What to understand before requesting the flight
          </h2>
          <div className="mt-8 grid gap-x-10 gap-y-8 md:grid-cols-2">
            {[
              ["Flight experience", destination.flightExperience],
              ["Altitude", destination.altitudeNote],
              ["Best season", destination.bestSeason],
              ["Weather", destination.weather],
              ["Photography", destination.photography]
            ].map(([title, copy]) => (
              <article key={title} className="border-t border-ink/15 pt-5">
                <h3 className="text-base font-semibold text-ink">{title}</h3>
                <p className="copy mt-2 text-sm">{copy}</p>
              </article>
            ))}
            <article className="border-t border-ink/15 pt-5">
              <h3 className="text-base font-semibold text-ink">Nearby places</h3>
              <ul className="mt-2 space-y-2 text-sm text-slate-600">
                {destination.nearbyAttractions.map((place) => <li key={place}>{place}</li>)}
              </ul>
            </article>
          </div>
        </div>
      </section>

      <RelatedLinks
        heading="Related Flight Planning"
        items={[
          {
            title: "Helicopter Tours",
            description: "Compare the main Everest, Annapurna, and Muktinath route requests.",
            href: "/tours"
          },
          {
            title: "Private Charter",
            description: "Arrange a private aircraft around your group, date, route, and purpose.",
            href: "/helicopter-charter-nepal"
          },
          {
            title: "Safety & Flight Information",
            description: "Review weight, baggage, weather, confirmation, and cancellation questions.",
            href: "/safety-flight-information"
          }
        ]}
      />
      <FaqSection items={faqs} />
    </>
  );
}
