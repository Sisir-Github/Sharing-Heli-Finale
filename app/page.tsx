import { Destinations } from "@/components/sections/Destinations";
import { Hero } from "@/components/sections/Hero";
import { HomeOperator } from "@/components/sections/HomeOperator";
import { SignatureTours } from "@/components/sections/SignatureTours";
import { WhyChoose } from "@/components/sections/WhyChoose";
import { getDestinations, getFeaturedTours, getSiteSettings } from "@/lib/cms";
import { COMPANY } from "@/lib/constants";
import { FALLBACK_DESTINATIONS, FALLBACK_TOURS } from "@/lib/home-fallbacks";
import { buildPageMetadata } from "@/lib/seo/page-seo";

export const metadata = buildPageMetadata("/");

export const revalidate = 900;

export default async function HomePage() {
  const [settings, tours, destinations] = await Promise.all([
    getSiteSettings(),
    getFeaturedTours(),
    getDestinations()
  ]);

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
          "Shared helicopter flights and private charters coordinated from Pokhara, with clear planning around weather, routing, and passenger needs.",
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
      <SignatureTours tours={tours.length ? tours : FALLBACK_TOURS} />
      <Destinations destinations={destinations.length ? destinations : FALLBACK_DESTINATIONS} />
      <HomeOperator />
      <WhyChoose items={settings?.whyChooseItems || []} />
    </>
  );
}
