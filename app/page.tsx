import { Destinations } from "@/components/sections/Destinations";
import { Hero } from "@/components/sections/Hero";
import { HomeExperienceCta } from "@/components/sections/HomeExperienceCta";
import { HomeFinalCta } from "@/components/sections/HomeFinalCta";
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
import { Marquee } from "@/components/ui/Marquee";
import { getDestinations, getFeaturedTours, getPublishedServices, getSiteSettings } from "@/lib/cms";
import { COMPANY, resolveContactSettings } from "@/lib/constants";
import { FALLBACK_DESTINATIONS, FALLBACK_SERVICES, FALLBACK_TOURS } from "@/lib/home-fallbacks";
import { buildPageMetadata } from "@/lib/seo/page-seo";

export const metadata = buildPageMetadata("/");

export const revalidate = 900;

export default async function HomePage() {
  const [settings, tours, destinations, services] = await Promise.all([
    getSiteSettings(),
    getFeaturedTours(),
    getDestinations(),
    getPublishedServices()
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
          "Shared helicopter flights and private charters coordinated from Pokhara, with clear planning around weather, routing and passenger needs.",
        heroBackgroundMode: "image",
        heroBackgroundImage: null,
        heroCtaPrimaryLabel: "Reserve a flight",
        heroCtaPrimaryHref: "/check-availability",
        heroCtaSecondaryLabel: "View routes",
        heroCtaSecondaryHref: "/tours"
      };

  return (
    <>
      <Hero settings={heroSettings} />
      <HomeServiceStrip services={services.length ? services : FALLBACK_SERVICES} />
      <HomeIntroBand items={settings?.trustBadges || []} />
      <HomeFlightOptions tours={resolvedTours} />
      <HomeTestimonials />
      <HomeTeam />
      <HomeFleet />
      <Marquee words={["Book your Himalayan helicopter flight today", "Pokhara · Kathmandu departures"]} />
      <HomeExperienceCta />
      <SignatureTours tours={resolvedTours} />
      <HomeQuoteBand />
      <WhyChoose items={settings?.whyChooseItems || []} />
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
