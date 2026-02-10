import { ContactPreview } from "@/components/sections/ContactPreview";
import { CtaBand } from "@/components/sections/CtaBand";
import { Destinations } from "@/components/sections/Destinations";
import { Hero } from "@/components/sections/Hero";
import { ServicesOverview } from "@/components/sections/ServicesOverview";
import { SignatureTours } from "@/components/sections/SignatureTours";
import { WhyChoose } from "@/components/sections/WhyChoose";
import { getDestinations, getFeaturedTours, getPublishedServices, getSiteSettings } from "@/lib/cms";
import { buildPageMetadata } from "@/lib/seo/page-seo";

export const metadata = buildPageMetadata("/");

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [settings, services, tours, destinations] = await Promise.all([
    getSiteSettings(),
    getPublishedServices(),
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
        tagline: "Elevate Your Journey Above the Himalayas",
        heroHeadline: "Elevate Your Journey Above the Himalayas",
        heroSubheadline:
          "Premium helicopter charter, iconic Himalayan tours, pilgrimage flights, and emergency air support engineered for international travelers who value comfort, precision, and trust.",
        heroBackgroundMode: "3d",
        heroBackgroundImage: null,
        heroCtaPrimaryLabel: "Inquiry Now",
        heroCtaPrimaryHref: "/contact",
        heroCtaSecondaryLabel: "WhatsApp",
        heroCtaSecondaryHref: "https://wa.me/9779856028155"
      };

  const contactSettings = settings
    ? {
        primaryPhone: settings.primaryPhone,
        whatsappNumber: settings.whatsappNumber,
        email: settings.email,
        operatingUnder: settings.operatingUnder
      }
    : {
        primaryPhone: "+977-9802855690",
        whatsappNumber: "+977-9856028155",
        email: "rishi8848@gmail.com",
        operatingUnder: "Operating under Pokhara Flight Centre Tours & Travel Pvt. Ltd."
      };

  return (
    <>
      <Hero settings={heroSettings} trustBadges={settings?.trustBadges || []} />
      <ServicesOverview services={services} />
      <SignatureTours tours={tours} />
      <WhyChoose items={settings?.whyChooseItems || []} />
      <Destinations destinations={destinations} />
      <CtaBand
        text={settings?.ctaStripText || "Share your dates, preferred route, and passenger details."}
        buttonLabel={settings?.ctaStripButtonLabel || "Start Inquiry"}
        buttonHref={settings?.ctaStripButtonHref || "/contact"}
      />
      <ContactPreview settings={contactSettings} />
    </>
  );
}
