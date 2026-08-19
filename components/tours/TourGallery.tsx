"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

/**
 * Main image with a thumbnail strip. Falls back to a single static image when a
 * tour only has one photo, so the arrows never appear with nothing to page to.
 */
export function TourGallery({ images, title }: { images: string[]; title: string }) {
  const [active, setActive] = useState(0);
  const total = images.length;
  const hasMultiple = total > 1;

  function step(direction: 1 | -1) {
    setActive((current) => (current + direction + total) % total);
  }

  return (
    <div>
      <div className="media-frame group relative aspect-[16/10] overflow-hidden rounded-card bg-ink/10">
        <Image
          key={images[active]}
          src={images[active]}
          alt={`${title} — photo ${active + 1} of ${total}`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 62vw"
          className="object-cover"
        />

        {hasMultiple ? (
          <>
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous photo"
              className="absolute left-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-navy shadow-card transition-colors hover:bg-white"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next photo"
              className="absolute right-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-navy shadow-card transition-colors hover:bg-white"
            >
              <ChevronRight size={20} />
            </button>
            <span className="absolute bottom-4 right-4 rounded-btn bg-navydeep/80 px-2.5 py-1 font-display text-[10px] font-semibold uppercase tracking-[0.16em] text-white">
              {active + 1} / {total}
            </span>
          </>
        ) : null}
      </div>

      {hasMultiple ? (
        <div className="mt-3 grid grid-cols-4 gap-3 sm:grid-cols-5">
          {images.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`Show photo ${index + 1}`}
              aria-current={index === active}
              className={cn(
                "relative aspect-[4/3] overflow-hidden rounded-btn border-2 transition-colors",
                index === active ? "border-accent" : "border-transparent hover:border-sandstrong"
              )}
            >
              <Image src={image} alt="" fill sizes="20vw" className="object-cover" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
