import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SplitFeatureProps = {
  eyebrow?: string;
  title: string;
  children?: ReactNode;
  image: string;
  imageAlt: string;
  action?: { label: string; href: string };
  reverse?: boolean;
  tone?: "cream" | "cream-deep" | "white" | "navy";
  caption?: string;
  id?: string;
};

const toneClass: Record<NonNullable<SplitFeatureProps["tone"]>, string> = {
  cream: "band-cream",
  "cream-deep": "band-cream-deep",
  white: "band-white",
  navy: "band-navy"
};

/** Image on one side, editorial copy on the other — the reference's core rhythm. */
export function SplitFeature({
  eyebrow,
  title,
  children,
  image,
  imageAlt,
  action,
  reverse = false,
  tone = "cream",
  caption,
  id
}: SplitFeatureProps) {
  const light = tone === "navy";

  return (
    <section id={id} className={cn("band", toneClass[tone])}>
      <div className="shell grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className={cn(reverse && "lg:order-2")}>
          {eyebrow ? (
            <p className={cn("eyebrow", light && "text-white/60")}>
              <span className="inline-block h-px w-7 bg-current align-middle" aria-hidden="true" />
              {eyebrow}
            </p>
          ) : null}
          <h2 className={cn("mt-5 font-display text-[2rem] font-semibold leading-[1.08] tracking-[-0.01em] sm:text-[2.7rem]", light ? "text-white" : "text-navy")}>
            {title}
          </h2>
          <div className={cn("mt-5 space-y-4 text-[15px] leading-[1.85]", light ? "text-white/74" : "text-[var(--muted)]")}>{children}</div>
          {action ? (
            <Link href={action.href} className={cn("mt-8", light ? "light-button" : "inquiry-button")}>
              {action.label}
            </Link>
          ) : null}
        </div>

        <figure className={cn("m-0", reverse && "lg:order-1")}>
          <div className="media-frame aspect-[4/3]">
            <Image src={image} alt={imageAlt} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
          </div>
          {caption ? (
            <figcaption className={cn("mt-3 font-display text-[10px] font-semibold uppercase tracking-[0.2em]", light ? "text-white/55" : "text-[var(--muted)]")}>
              {caption}
            </figcaption>
          ) : null}
        </figure>
      </div>
    </section>
  );
}
