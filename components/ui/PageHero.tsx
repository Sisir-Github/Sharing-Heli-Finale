import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type HeroAction = {
  label: string;
  href: string;
};

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  primaryAction?: HeroAction;
  secondaryAction?: HeroAction;
  actions?: ReactNode;
  meta?: ReactNode;
  align?: "left" | "center";
  size?: "sm" | "md";
  width?: "narrow" | "wide";
  priority?: boolean;
};

/**
 * Standard inner-page opener: full-bleed photograph, navy wash, and a boxed
 * white panel carrying the page title — the same device used on the home hero.
 */
export function PageHero({
  eyebrow,
  title,
  description,
  image = "/images/campaign/sharing-heli-hero.jpg",
  imageAlt = "Helicopter flying over the Nepal Himalayas",
  primaryAction,
  secondaryAction,
  actions,
  meta,
  align = "left",
  size = "md",
  width = "narrow",
  priority = false
}: PageHeroProps) {
  const minHeight = size === "sm" ? "min-h-[400px] sm:min-h-[440px]" : "min-h-[480px] sm:min-h-[560px]";

  return (
    <section className={cn("relative isolate overflow-hidden bg-navy", minHeight)}>
      <Image src={image} alt={imageAlt} fill priority={priority} sizes="100vw" className="object-cover" />
      <div className="hero-overlay absolute inset-0" aria-hidden="true" />

      <div className={cn("shell relative z-10 flex flex-col justify-end pb-12 pt-24 sm:pb-16 sm:pt-28", minHeight)}>
        <div
          className={cn(
            "frame-panel w-full p-7 sm:p-9",
            width === "wide" ? "max-w-3xl" : "max-w-2xl",
            align === "center" && "mx-auto text-center"
          )}
        >
          {eyebrow ? (
            <p className={cn("eyebrow", align === "center" && "justify-center")}>
              <span className="inline-block h-px w-7 bg-current align-middle" aria-hidden="true" />
              {eyebrow}
            </p>
          ) : null}
          <h1 className="mt-4 font-display text-[1.95rem] font-semibold leading-[1.08] tracking-[-0.01em] text-navy sm:text-[2.8rem]">
            {title}
          </h1>
          {description ? <p className="mt-4 text-[15px] leading-[1.8] text-[var(--muted)]">{description}</p> : null}
          {meta ? <div className="mt-6 border-t border-sand pt-5">{meta}</div> : null}
          {actions || primaryAction || secondaryAction ? (
            <div className={cn("mt-7 flex flex-wrap gap-3", align === "center" && "justify-center")}>
              {actions}
              {primaryAction ? (
                <Link href={primaryAction.href} className="inquiry-button">
                  {primaryAction.label}
                </Link>
              ) : null}
              {secondaryAction ? (
                <Link href={secondaryAction.href} className="outline-button">
                  {secondaryAction.label}
                </Link>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
