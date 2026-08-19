"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

export type TourSection = { id: string; label: string };

/**
 * Sticky in-page nav for the tour detail sections. Highlights whichever section
 * is currently nearest the top of the viewport.
 */
export function TourSectionNav({ sections }: { sections: TourSection[] }) {
  const [active, setActive] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    if (!sections.length) return;

    const elements = sections
      .map((section) => document.getElementById(section.id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id);
      },
      // Trigger once a section reaches the band just under the sticky header.
      { rootMargin: "-140px 0px -65% 0px", threshold: 0 }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [sections]);

  if (!sections.length) return null;

  return (
    <nav
      aria-label="Tour sections"
      className="sticky top-[78px] z-30 border-y border-sand bg-white/95 backdrop-blur"
    >
      <div className="shell flex gap-1 overflow-x-auto py-1">
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            aria-current={active === section.id ? "true" : undefined}
            className={cn(
              "whitespace-nowrap px-4 py-3.5 font-display text-[11px] font-semibold uppercase tracking-[0.16em] transition-colors",
              active === section.id
                ? "border-b-2 border-accent text-navy"
                : "border-b-2 border-transparent text-[var(--muted)] hover:text-navy"
            )}
          >
            {section.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
