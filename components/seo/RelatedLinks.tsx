import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Reveal } from "@/components/ui/Reveal";

type RelatedLinkItem = {
  title: string;
  description: string;
  href: string;
};

type RelatedLinksProps = {
  heading: string;
  items: RelatedLinkItem[];
};

export function RelatedLinks({ heading, items }: RelatedLinksProps) {
  return (
    <section className="band-tight band-cream-deep">
      <Reveal className="shell">
        <h2 className="font-display text-[1.5rem] font-semibold uppercase tracking-[0.04em] text-navy sm:text-[1.9rem]">
          {heading}
        </h2>
        <nav className="mt-8 grid border-t border-sand md:grid-cols-3" aria-label={heading}>
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex items-start justify-between gap-4 border-b border-sand py-6 transition-colors hover:bg-white/60 md:border-b-0 md:border-r md:px-6 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
            >
              <span>
                <span className="block font-display text-sm font-semibold uppercase tracking-[0.08em] text-navy">
                  {item.title}
                </span>
                <span className="mt-2 block text-xs leading-[1.8] text-[var(--muted)]">{item.description}</span>
              </span>
              <ArrowUpRight size={17} className="mt-0.5 shrink-0 text-accent transition-transform group-hover:translate-x-1" />
            </Link>
          ))}
        </nav>
      </Reveal>
    </section>
  );
}
