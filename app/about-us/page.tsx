import Link from "next/link";
import { Building2, CalendarRange, MapPin, MessagesSquare, Route } from "lucide-react";

import { HomeTeam } from "@/components/sections/HomeTeam";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { SplitFeature } from "@/components/ui/SplitFeature";
import { COMPANY } from "@/lib/constants";
import { buildPageMetadata } from "@/lib/seo/page-seo";
import { buildBreadcrumbSchema } from "@/lib/seo/schema";

export const metadata = buildPageMetadata("/about-us");

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about-us" }
];

const operatorFacts = [
  { icon: CalendarRange, value: "2006", label: "Travel desk established" },
  { icon: MapPin, value: "Pokhara", label: "Lakeside operations" },
  { icon: Route, value: "Nepal", label: "Tailored route planning" }
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={buildBreadcrumbSchema(breadcrumbs)} />

      <PageHero
        eyebrow="About Sharing Heli"
        title="Local flight coordination from Lakeside, Pokhara"
        description="We help travellers request shared helicopter flights and private charter arrangements across Nepal — with the operating detail written down before anything is confirmed."
        image="/images/campaign/annapurna-helicopter.jpg"
        imageAlt="Helicopter over the Annapurna region of Nepal"
        primaryAction={{ label: "Contact the team", href: "/contact" }}
        secondaryAction={{ label: "View routes", href: "/tours" }}
        priority
      />

      <section className="band band-navy">
        <div className="shell text-center">
          <p className="eyebrow justify-center text-white/60">
            <span className="inline-block h-px w-7 bg-current align-middle" aria-hidden="true" />
            Who we are
          </p>
          <h2 className="mx-auto mt-6 max-w-4xl font-display text-[1.8rem] font-semibold leading-[1.25] tracking-[-0.01em] text-white sm:text-[2.4rem]">
            {COMPANY.companyName} plans helicopter travel across Nepal &mdash; scenic flights, private charters,
            mountain transfers and pilgrimage routes, arranged end to end.
          </h2>
          <p className="mx-auto mt-7 max-w-2xl text-[15px] leading-[1.9] text-white/62">
            Every request is reviewed against the route, passenger and baggage details, weather and permissions, then
            confirmed with a clear written quote covering the route basis, inclusions and flight conditions.
          </p>
        </div>
      </section>

      <SplitFeature
        eyebrow="Planning from Pokhara since 2006"
        title="A local travel desk with the details in one place"
        image="/images/campaign/sharing-heli-hero.jpg"
        imageAlt="Sharing Heli flight desk operations in Pokhara"
        caption="Lakeside, Pokhara · Nepal"
        action={{ label: "Talk to the desk", href: "/contact" }}
        tone="cream"
        reverse
      >
        <p>
          Sharing Heli is operated by{" "}
          <a
            href={COMPANY.operatorUrl}
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-navy underline decoration-accent/50 underline-offset-4"
          >
            {COMPANY.operator}
          </a>
          , a Pokhara-based travel company coordinating tours, treks, flights and tailored journeys across Nepal.
        </p>
        <p>
          Our Lakeside team brings the route, passenger details, aircraft availability and practical travel arrangements
          into one clear plan before confirmation.
        </p>
        <dl className="grid gap-px border-y border-sand pt-2 sm:grid-cols-3 sm:divide-x sm:divide-sand">
          {operatorFacts.map(({ icon: Icon, value, label }) => (
            <div key={value} className="border-b border-sand py-5 last:border-b-0 sm:border-b-0 sm:px-5 sm:first:pl-0 sm:last:pr-0">
              <dt className="font-display text-xl font-semibold text-navy">
                <Icon size={18} className="mb-3 text-accent" aria-hidden="true" />
                {value}
              </dt>
              <dd className="mt-1 text-xs leading-5 text-[var(--muted)]">{label}</dd>
            </div>
          ))}
        </dl>
      </SplitFeature>

      <section className="band band-cream-deep">
        <div className="shell">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow justify-center">
              <span className="inline-block h-px w-7 bg-current align-middle" aria-hidden="true" />
              Company details
            </p>
            <h2 className="mt-5 font-display text-[1.9rem] font-semibold leading-[1.1] tracking-[-0.01em] text-navy sm:text-[2.4rem]">
              How to reach us
            </h2>
          </div>

          <div className="mt-11 grid gap-5 md:grid-cols-3">
            {[
              {
                icon: MapPin,
                title: "Office",
                body: (
                  <a
                    href={COMPANY.googleMapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-navy underline decoration-accent/40 underline-offset-4"
                  >
                    {COMPANY.address.line1}, {COMPANY.address.line2}, {COMPANY.address.line3}, {COMPANY.address.country}
                  </a>
                )
              },
              {
                icon: Building2,
                title: "Business identity",
                body: (
                  <>
                    {COMPANY.companyName}. Operated by{" "}
                    <a
                      href={COMPANY.operatorUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="font-semibold text-navy underline decoration-accent/40 underline-offset-4"
                    >
                      {COMPANY.operator}
                    </a>
                    .
                  </>
                )
              },
              {
                icon: MessagesSquare,
                title: "Direct contact",
                body: (
                  <>
                    <a href={`tel:${COMPANY.primaryPhone}`} className="font-semibold text-navy">
                      {COMPANY.primaryPhone}
                    </a>{" "}
                    &middot;{" "}
                    <a href={COMPANY.whatsappLink} target="_blank" rel="noreferrer" className="font-semibold text-navy">
                      WhatsApp
                    </a>
                  </>
                )
              }
            ].map(({ icon: Icon, title, body }) => (
              <article key={title} className="surface-card p-7">
                <Icon size={20} className="text-accent" />
                <h3 className="mt-5 font-display text-base font-semibold uppercase tracking-[0.1em] text-navy">{title}</h3>
                <p className="mt-3 text-sm leading-[1.85] text-[var(--muted)]">{body}</p>
              </article>
            ))}
          </div>

          <div className="mt-11 text-center">
            <Link href="/contact" className="inquiry-button">
              Contact the team
            </Link>
          </div>
        </div>
      </section>

      <HomeTeam />
    </>
  );
}
