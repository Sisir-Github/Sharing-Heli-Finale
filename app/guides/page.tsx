import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageSchema } from "@/components/seo/PageSchema";
import { RelatedLinks } from "@/components/seo/RelatedLinks";
import { PageIntro } from "@/components/layout/PageIntro";
import { buildPageMetadata } from "@/lib/seo/page-seo";
import { buildBreadcrumbSchema } from "@/lib/seo/schema";

export const metadata = buildPageMetadata("/guides");

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Guides", path: "/guides" }
];

export default function GuidesPage() {
  return (
    <>
      <PageSchema path="/guides" />
      <JsonLd data={buildBreadcrumbSchema(breadcrumbs)} />
      <PageIntro
        eyebrow="Insights"
        title="Nepal Helicopter Planning Guides"
        description="Operationally informed guides from Sharing Heli to help you plan safer, more efficient Himalayan helicopter experiences."
        headingLevel={1}
      />
      <section className="band band-cream">
        <div className="shell grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <p className="eyebrow">
              <span className="inline-block h-px w-7 bg-current align-middle" aria-hidden="true" />
              Why these guides exist
            </p>
            <p data-speakable className="mt-5 font-display text-[1.3rem] font-medium leading-[1.6] text-navy sm:text-[1.5rem]">
              Most helicopter guidance online is written to sell a package. These are written to help you decide whether
              to fly at all, when to fly, and what a fair quote looks like — including the cases where trekking or a
              fixed-wing mountain flight is the better answer.
            </p>
          </div>
          <div className="space-y-4 self-center text-[15px] leading-[1.9] text-[var(--muted)]">
            <p>
              Three questions decide almost every Nepal helicopter itinerary: when in the year you are travelling, how
              much schedule flexibility you have, and whether the route you want is realistic for your group at
              altitude. Get those right and the rest is administration.
            </p>
            <p>
              Each guide below is written by the Pokhara flight desk from operating experience rather than from a
              brochure, and each is dated so you can see how current it is.
            </p>
          </div>
        </div>
      </section>

      <section className="band band-white">
        <div className="shell space-y-10">
          {[
            {
              title: "Best time for helicopter tours in Nepal",
              href: "/guides/best-time-helicopter-tours-nepal",
              body:
                "Post-monsoon (October to November) and pre-monsoon (March to April) give the most stable visibility for mountain flying, and morning departures beat afternoon ones in every season because cloud builds through the day. The guide breaks the year down month by month for Everest, Annapurna and Muktinath, and explains why one buffer day improves your odds more than any other planning decision."
            },
            {
              title: "Is the Everest helicopter tour safe?",
              href: "/guides/is-everest-base-camp-helicopter-tour-safe",
              body:
                "A practical framework rather than reassurance: what high-altitude performance limits actually mean, why operators shuttle passengers above 5,000 metres, what questions to ask about the operating carrier, and what a responsible provider will and will not promise about a landing."
            },
            {
              title: "Helicopter versus trekking in Nepal",
              href: "/guides/helicopter-vs-trekking-nepal",
              body:
                "An honest comparison of time, cost, physical demand and what you actually experience. A helicopter gives you the altitude and the view in hours; a trek gives you acclimatisation, distance and the culture of the trail. The guide covers who each suits, and the hybrid itineraries that combine both."
            }
          ].map((guide, index) => (
            <article key={guide.href} className="grid gap-6 border-t border-sand pt-9 lg:grid-cols-[0.34fr_0.66fr] lg:gap-14">
              <div>
                <span className="font-display text-[11px] font-semibold uppercase tracking-[0.24em] text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h2 className="mt-4 font-display text-[1.5rem] font-semibold leading-[1.15] tracking-[-0.01em] text-navy sm:text-[1.9rem]">
                  {guide.title}
                </h2>
              </div>
              <div>
                <p className="text-[15px] leading-[1.9] text-[var(--muted)]">{guide.body}</p>
                <Link href={guide.href} className="editorial-link mt-6 w-fit">
                  Read the guide
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <RelatedLinks
        heading="Read The Guides"
        items={[
          {
            title: "Best Time for Helicopter Tours",
            description: "Seasonal windows, visibility patterns, and route timing strategies.",
            href: "/guides/best-time-helicopter-tours-nepal"
          },
          {
            title: "Is Everest Helicopter Tour Safe?",
            description: "A practical safety framework for high-altitude Everest flights.",
            href: "/guides/is-everest-base-camp-helicopter-tour-safe"
          },
          {
            title: "Helicopter vs Trekking in Nepal",
            description: "Compare comfort, time, cost, and effort before you choose.",
            href: "/guides/helicopter-vs-trekking-nepal"
          }
        ]}
      />
    </>
  );
}
