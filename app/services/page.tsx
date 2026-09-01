import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { PageHero } from "@/components/ui/PageHero";
import { getPublishedServices } from "@/lib/cms";
import { buildPageMetadata } from "@/lib/seo/page-seo";
import { getCanonicalServicePath } from "@/lib/seo/canonical";
import { buildBreadcrumbSchema, buildItemListSchema, buildWebPageSchema } from "@/lib/seo/schema";

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
      <JsonLd
        data={[
          buildBreadcrumbSchema(breadcrumbs),
          buildItemListSchema({
            name: "Helicopter services in Nepal",
            path: "/services",
            items: services.map((service) => ({
              name: service.title,
              path: getCanonicalServicePath(service.slug),
              description: service.shortDescription
            }))
          }),
          buildWebPageSchema({
            name: "Helicopter services in Nepal",
            description:
              "Charter, shared flights, pilgrimage routes, transfers and special-purpose helicopter flights in Nepal.",
            path: "/services",
            about: ["Nepal", "Helicopter charter", "Shared helicopter flights"],
            dateModified: new Date()
          })
        ]}
      />

      <Breadcrumbs items={breadcrumbs} />
      <PageHero
        eyebrow="Our services"
        title="Helicopter services in Nepal"
        description="Choose the service that matches your route, group and travel date. Each request is reviewed for aircraft, weather, permissions and passenger requirements."
        image="/images/campaign/sharing-heli-hero.jpg"
        imageAlt="Helicopter flying near the Himalayas in Nepal"
        primaryAction={{ label: "Reserve a flight", href: "/check-availability" }}
        secondaryAction={{ label: "Talk to the desk", href: "/contact" }}
        priority
      />
      <section className="band-tight band-cream">
        <div className="shell grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <p className="eyebrow">
              <span className="inline-block h-px w-7 bg-current align-middle" aria-hidden="true" />
              Choosing between them
            </p>
            <p data-speakable className="mt-5 font-display text-[1.3rem] font-medium leading-[1.6] text-navy sm:text-[1.5rem]">
              Almost every helicopter product in Nepal is one of three things: a seat on a shared flight, the whole
              aircraft on charter, or a point-to-point transfer. The names change between companies; the underlying
              service does not.
            </p>
          </div>
          <div className="space-y-4 self-center text-[15px] leading-[1.9] text-[var(--muted)]">
            <p>
              A shared flight divides one aircraft between compatible passengers, so it is the cheapest way to see a
              major route — but it only departs when enough people line up on the same morning, and you inherit the
              group timing. A private charter costs more per group and removes that uncertainty entirely, which matters
              if you have one fixed day in Nepal.
            </p>
            <p>
              Transfers are the practical category: moving between two points to skip a trekking section, recover a
              schedule after a delayed fixed-wing flight, or reach a place the road does not serve well. Pilgrimage,
              photography and filming flights are charters with extra planning around ground time and permissions.
            </p>
          </div>
        </div>
      </section>

      <section className="band-tight band-cream-deep">
        <div className="shell">
          <h2 className="max-w-3xl font-display text-[1.5rem] font-semibold leading-[1.15] tracking-[-0.01em] text-navy sm:text-[1.9rem]">
            Which service fits your trip
          </h2>
          <div className="mt-8 overflow-x-auto border border-sand bg-white">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <thead>
                <tr className="bg-navy text-white">
                  {["Your situation", "Usually the right service", "Why"].map((column) => (
                    <th key={column} scope="col" className="px-5 py-4 font-display text-[10px] font-semibold uppercase tracking-[0.18em]">
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["Solo or a couple, flexible dates", "Shared helicopter flight", "The aircraft cost is split across seats, and flexibility is what makes the match happen"],
                  ["One fixed day in Nepal", "Private charter", "No dependence on other passengers lining up on your date"],
                  ["Family or group of four to five", "Private charter", "Once you add up the seats you are usually near the whole-aircraft price anyway"],
                  ["Elderly or limited mobility", "Private charter", "Ground time and timing are planned around your group rather than strangers"],
                  ["Trek gone long, flight to catch", "Point-to-point transfer", "Priced by sector; depends on where the aircraft already is that day"],
                  ["Filming, survey or corporate", "Private charter with notice", "Needs extra permissions and planning time for equipment and routing"]
                ].map((row) => (
                  <tr key={row[0]} className="border-t border-sand align-top">
                    <th scope="row" className="px-5 py-4 text-left font-display text-[13px] font-semibold leading-5 text-navy">
                      {row[0]}
                    </th>
                    <td className="px-5 py-4 font-display text-[13px] font-semibold text-navy">{row[1]}</td>
                    <td className="px-5 py-4 leading-[1.75] text-[var(--muted)]">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <ServicesGrid services={services} />
    </>
  );
}
