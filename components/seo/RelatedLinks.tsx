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
    <section className="section-space pt-8">
      <Reveal className="shell">
        <h2 className="headline text-balance text-3xl sm:text-4xl">{heading}</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <article
              key={item.href}
              className="glass rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-aurora/40 hover:shadow-luxe"
            >
              <h3 className="font-display text-2xl text-white">{item.title}</h3>
              <p className="copy mt-3 text-sm">{item.description}</p>
              <Link href={item.href} className="outline-button mt-5">
                Explore
              </Link>
            </article>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
