import Link from "next/link";

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
    <section className="bg-canvas py-12 sm:py-16">
      <Reveal className="shell">
        <h2 className="font-display text-2xl font-semibold tracking-normal text-ink">{heading}</h2>
        <nav className="mt-6 grid border-y border-ink/10 md:grid-cols-3" aria-label={heading}>
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex items-center justify-between gap-4 border-b border-ink/10 py-5 last:border-b-0 md:border-b-0 md:border-r md:px-5 md:first:pl-0 md:last:border-r-0"
            >
              <span><span className="block text-sm font-semibold text-ink">{item.title}</span><span className="mt-1 block text-xs leading-5 text-slate-500">{item.description}</span></span>
              <span className="text-aurora transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
            </Link>
          ))}
        </nav>
      </Reveal>
    </section>
  );
}
