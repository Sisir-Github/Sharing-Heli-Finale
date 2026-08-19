import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";

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
    <section className="home-hero relative isolate min-h-[640px] overflow-hidden bg-navy sm:min-h-[720px] lg:min-h-[780px]">
      <Image
        src={heroImage}
        alt="Private helicopter flying above the Nepal Himalayas"
        fill
        priority
        quality={70}
        sizes="100vw"
        className="home-hero-image object-cover"
      />
      <div className="hero-overlay absolute inset-0" aria-hidden="true" />

      <div className="shell relative z-10 flex min-h-[640px] flex-col items-center justify-end pb-14 pt-24 sm:min-h-[720px] sm:pb-20 lg:min-h-[780px]">
        <p className="mb-6 inline-flex items-center gap-3 border border-white/30 bg-white/10 px-4 py-2 font-display text-[10px] font-semibold uppercase tracking-[0.24em] text-white backdrop-blur-sm">
          <MapPin size={12} className="text-accent" />
          Pokhara, Nepal
          <span className="hidden h-3 w-px bg-white/30 sm:block" aria-hidden="true" />
          <span className="hidden sm:inline">{settings.tagline}</span>
        </p>

        {/* Boxed statement panel, as in the reference hero */}
        <div className="frame-panel w-full max-w-[640px] p-7 text-center sm:p-10">
          <p className="eyebrow justify-center">
            <span className="inline-block h-px w-7 bg-current align-middle" aria-hidden="true" />
            Sharing Heli Nepal
          </p>
          <h1 className="mt-5 font-display text-[2.1rem] font-semibold leading-[1.06] tracking-[-0.01em] text-navy sm:text-[3rem]">
            {settings.heroHeadline || "The Himalayas, on your time."}
          </h1>
          <p className="mx-auto mt-5 max-w-lg text-[15px] leading-[1.85] text-[var(--muted)]">{settings.heroSubheadline}</p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <ReservationButton label={settings.heroCtaPrimaryLabel || "Reserve a flight"} href={primaryHref} />
            <Link href={secondaryHref} className="outline-button">
              {settings.heroCtaSecondaryLabel || "View routes"}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
