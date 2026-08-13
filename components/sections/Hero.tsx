import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";

import { ReservationButton } from "@/components/ui/ReservationButton";
import { safeLocalImageSource, safePublicHref } from "@/lib/safe-url";

type HeroSettings = {
  tagline: string;
  heroHeadline: string;
  heroSubheadline: string;
  heroBackgroundMode: string;
  heroBackgroundImage?: string | null;
  heroCtaPrimaryLabel: string;
  heroCtaPrimaryHref: string;
  heroCtaSecondaryLabel: string;
  heroCtaSecondaryHref: string;
};

export function Hero({ settings }: { settings: HeroSettings }) {
  const heroImage = safeLocalImageSource(settings.heroBackgroundImage, "/images/campaign/sharing-heli-hero.jpg");
  const primaryHref = safePublicHref(settings.heroCtaPrimaryHref, "/check-availability");
  const secondaryHref = safePublicHref(settings.heroCtaSecondaryHref, "/tours");

  return (
    <section className="home-hero relative isolate min-h-[660px] overflow-hidden bg-ink text-white sm:min-h-[710px] lg:min-h-[760px]">
      <Image
        src={heroImage}
        alt="Private helicopter flying above the Nepal Himalayas"
        fill
        priority
        quality={60}
        sizes="100vw"
        className="home-hero-image object-cover"
      />
      <div className="home-hero-wash absolute inset-0" aria-hidden="true" />

      <div className="shell relative z-10 flex min-h-[660px] flex-col justify-end pb-20 pt-28 sm:min-h-[710px] sm:pb-24 sm:pt-32 lg:min-h-[760px]">
        <div>
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/75">
              <span className="inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/[0.08] px-3.5 py-2">
                <MapPin size={13} className="text-copper" /> Pokhara, Nepal
              </span>
              <span className="hidden h-px w-10 bg-white/30 sm:block" />
              <span>{settings.tagline}</span>
            </div>

            <h1 className="mt-6 max-w-[860px] font-display text-4xl font-semibold leading-tight tracking-normal text-white sm:mt-7 sm:text-6xl lg:text-7xl">
              {settings.heroHeadline || "The Himalayas, on your time."}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/[0.72] sm:mt-7 sm:text-lg sm:leading-8">
              {settings.heroSubheadline}
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:items-center">
              <ReservationButton
                label={settings.heroCtaPrimaryLabel || "Reserve a flight"}
                href={primaryHref}
                className="home-primary-cta min-h-14 px-7"
              />
              <Link href={secondaryHref} className="home-ghost-cta">
                {settings.heroCtaSecondaryLabel || "View routes"} <ArrowUpRight size={17} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
