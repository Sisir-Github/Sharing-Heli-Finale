import { Destinations } from "@/components/sections/Destinations";
import { Hero } from "@/components/sections/Hero";
import { HomeExperienceCta } from "@/components/sections/HomeExperienceCta";
import { HomeFaq } from "@/components/sections/HomeFaq";
import { HomeFinalCta } from "@/components/sections/HomeFinalCta";
import { HomeFixedDepartures } from "@/components/sections/HomeFixedDepartures";
import { HomeFleet } from "@/components/sections/HomeFleet";
import { HomeFlightOptions } from "@/components/sections/HomeFlightOptions";
import { HomeIntroBand } from "@/components/sections/HomeIntroBand";
import { HomeLocationBand } from "@/components/sections/HomeLocationBand";
import { HomeQuoteBand } from "@/components/sections/HomeQuoteBand";
import { HomeServiceStrip } from "@/components/sections/HomeServiceStrip";
import { HomeTeam } from "@/components/sections/HomeTeam";
import { HomeTestimonials } from "@/components/sections/HomeTestimonials";
import { SignatureTours } from "@/components/sections/SignatureTours";
import { WhyChoose } from "@/components/sections/WhyChoose";
import { JsonLd } from "@/components/seo/JsonLd";
import { Marquee } from "@/components/ui/Marquee";
import {
  getDestinations,
  getFeaturedTours,
  getPublishedServices,
  getSiteSettings,
  getTeamMembers,
  getTestimonials,
  getUpcomingFixedDepartures
} from "@/lib/cms";
import { COMPANY, resolveContactSettings } from "@/lib/constants";
import { FALLBACK_DESTINATIONS, FALLBACK_SERVICES, FALLBACK_TOURS } from "@/lib/home-fallbacks";
import { getCanonicalTourPath } from "@/lib/seo/canonical";
import { buildPageMetadata } from "@/lib/seo/page-seo";
import { buildItemListSchema, buildWebPageSchema } from "@/lib/seo/schema";

export const metadata = buildPageMetadata("/");

export const revalidate = 900;

export default async function HomePage() {
  const [settings, tours, destinations, services, fixedDepartures, teamMembers, testimonials] = await Promise.all([
    getSiteSettings(),
    getFeaturedTours(),
    getDestinations(),
    getPublishedServices(),
    getUpcomingFixedDepartures(),
    getTeamMembers(),
    getTestimonials()
  ]);
  const contact = resolveContactSettings(settings);
  const resolvedTours = tours.length ? tours : FALLBACK_TOURS;

  const heroSettings = settings
    ? {
        tagline: settings.tagline,
        heroHeadline: settings.heroHeadline,
        heroSubheadline: settings.heroSubheadline,
        heroBackgroundMode: settings.heroBackgroundMode,
        heroBackgroundImage: settings.heroBackgroundImage,
        heroCtaPrimaryLabel: settings.heroCtaPrimaryLabel,
        heroCtaPrimaryHref: settings.heroCtaPrimaryHref,
        heroCtaSecondaryLabel: settings.heroCtaSecondaryLabel,
        heroCtaSecondaryHref: settings.heroCtaSecondaryHref
      }
    : {
        tagline: COMPANY.tagline,
        heroHeadline: "Helicopter tours and charters in Nepal.",
        heroSubheadline:
          "Shared helicopter flights and private charters with clear planning around weather, routing and passenger needs.",
        heroBackgroundMode: "image",
        heroBackgroundImage: null,
        heroCtaPrimaryLabel: "Reserve a flight",
        heroCtaPrimaryHref: "/check-availability",
        heroCtaSecondaryLabel: "View routes",
        heroCtaSecondaryHref: "/tours"
      };

  return (
    <>
      <JsonLd
        data={[
          buildWebPageSchema({
            name: "Helicopter tours and charter in Nepal",
            description:
              "Shared helicopter flights, private charters and pilgrimage routes across Nepal, coordinated from Pokhara.",
            path: "/",
            primaryImage: "/images/campaign/sharing-heli-hero.jpg",
            about: ["Nepal", "Helicopter tour", "Helicopter charter", "Everest", "Annapurna", "Muktinath", "Pokhara"],
            dateModified: new Date()
          }),
          buildItemListSchema({
            name: "Featured Nepal helicopter tours",
            path: "/tours",
            items: resolvedTours.slice(0, 10).map((tour) => ({
              name: tour.title,
              path: getCanonicalTourPath(tour.slug)
            }))
          })
        ]}
      />

      <Hero settings={heroSettings} />
      <HomeFixedDepartures departures={fixedDepartures} />
      <HomeServiceStrip services={services.length ? services : FALLBACK_SERVICES} />
      <HomeIntroBand items={settings?.trustBadges || []} />
      <HomeFlightOptions tours={resolvedTours} />
      <HomeTestimonials testimonials={testimonials} />
      <HomeTeam members={teamMembers} />
      <HomeFleet />
      <Marquee words={["Book your Himalayan helicopter flight today", "Pokhara · Kathmandu departures"]} />
      <HomeExperienceCta />
      <SignatureTours tours={resolvedTours} />
      <HomeQuoteBand />
      <WhyChoose items={settings?.whyChooseItems || []} />
      <HomeFaq />
      <Destinations destinations={destinations.length ? destinations : FALLBACK_DESTINATIONS} />
      <HomeLocationBand
        contact={{
          primaryPhone: contact.primaryPhone,
          email: contact.email,
          businessHours: settings?.businessHours || "Every day, 8:00 AM - 11:00 PM",
          addressLine1: contact.addressLine1,
          addressLine2: contact.addressLine2,
          addressLine3: contact.addressLine3
        }}
      />
      <HomeFinalCta />
    </>
  );
}
