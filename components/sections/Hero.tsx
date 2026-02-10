"use client";

import Link from "next/link";
import { Globe, ShieldCheck, Star } from "lucide-react";

import { HelicopterScene } from "@/components/HelicopterScene";
import { InquiryButton } from "@/components/ui/InquiryButton";
import { trackEvent } from "@/lib/analytics";

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

type TrustBadge = {
  id: string;
  title: string;
  description: string;
  icon?: string | null;
};

const iconMap = {
  shield: ShieldCheck,
  star: Star,
  globe: Globe
};

export function Hero({
  settings,
  trustBadges
}: {
  settings: HeroSettings;
  trustBadges: TrustBadge[];
}) {
  const badges = trustBadges.length
    ? trustBadges
    : [
        { id: "1", title: "Certified Ops", description: "Regulation-compliant mountain flying standards.", icon: "shield" },
        { id: "2", title: "Premium Service", description: "Luxury-focused charter and tour coordination.", icon: "star" },
        { id: "3", title: "Global Clients", description: "International traveler-ready support and response.", icon: "globe" }
      ];

  return (
    <section className="relative isolate -mt-[7.5rem] min-h-screen overflow-hidden pt-[7.5rem]">
      {settings.heroBackgroundMode === "image" && settings.heroBackgroundImage ? (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${settings.heroBackgroundImage})` }}
          aria-hidden
        />
      ) : (
        <HelicopterScene />
      )}

      <div className="hero-overlay absolute inset-0" aria-hidden />
      <div className="absolute inset-0 bg-radial-fog" aria-hidden />

      <div className="shell relative z-10 flex min-h-[calc(100vh-2rem)] items-end pb-16 pt-20 sm:items-center sm:py-24">
        <div className="max-w-3xl">
          <span className="label">Luxury Aviation In Nepal</span>
          <h1 className="font-display text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">{settings.heroHeadline || settings.tagline}</h1>
          <p className="copy mt-6 max-w-2xl text-lg text-slate-100/90">{settings.heroSubheadline}</p>

          <div className="mt-8 flex flex-wrap gap-4">
            <InquiryButton label={settings.heroCtaPrimaryLabel} href={settings.heroCtaPrimaryHref} />
            <a
              href={settings.heroCtaSecondaryHref}
              target="_blank"
              rel="noreferrer"
              className="outline-button"
              onClick={() => trackEvent("whatsapp_click", { placement: "hero_cta" })}
            >
              {settings.heroCtaSecondaryLabel}
            </a>
          </div>

          <div className="mt-6">
            <Link href="/tours" className="inline-flex text-sm font-medium tracking-wide text-haze transition-colors hover:text-white">
              Explore Signature Tours
            </Link>
          </div>

          <div className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-3">
            {badges.slice(0, 3).map((badge) => {
              const Icon = iconMap[(badge.icon || "").toLowerCase() as keyof typeof iconMap] || ShieldCheck;
              return (
                <div key={badge.id} className="glass rounded-2xl px-4 py-3">
                  <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-gold">
                    <Icon size={14} /> {badge.title}
                  </p>
                  <p className="mt-1 text-sm text-white">{badge.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
