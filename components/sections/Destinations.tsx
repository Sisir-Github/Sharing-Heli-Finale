import Image from "next/image";
import Link from "next/link";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

type DestinationItem = {
  id: string;
  title: string;
  description: string;
  image?: string | null;
};

export function Destinations({ destinations }: { destinations: DestinationItem[] }) {
  return (
    <section className="section-space" id="destinations">
      <Reveal className="shell space-y-10">
        <SectionHeading
          eyebrow="Destinations"
          title="Fly Across Nepal’s Most Desired Regions"
          description="Choose your preferred region and let our operations team design the most efficient premium route around weather and mission goals."
          centered
        />

        <div className="grid gap-5 sm:grid-cols-2">
          {destinations.map((item) => (
            <article key={item.title} className="group glass rounded-3xl p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-luxe">
              <div className="overflow-hidden rounded-2xl border border-white/10">
                <Image
                  src={item.image || "/images/tours-overview.svg"}
                  alt={`${item.title} helicopter destination in Nepal`}
                  width={1600}
                  height={900}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-3">
                <h3 className="font-display text-2xl text-white">{item.title}</h3>
                <p className="copy mt-2 text-sm">{item.description}</p>
                <Link href="/contact" className="mt-4 inline-flex text-sm font-medium text-gold transition-colors hover:text-steel">
                  View options
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
