import { MountainSnow, Timer } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import { InquiryButton } from "@/components/ui/InquiryButton";
import { Reveal } from "@/components/ui/Reveal";
import { getInquiryPath } from "@/lib/inquiry";
import { SectionHeading } from "@/components/ui/SectionHeading";

type TourItem = {
  id: string;
  title: string;
  duration: string;
  priceFrom: number;
  currency: string;
  slug: string;
  images: string[];
  seoDescription?: string | null;
};

export function SignatureTours({ tours }: { tours: TourItem[] }) {
  const imageMap: Record<string, string> = {
    "Everest Base Camp Helicopter Tour": "/images/everest-tour.svg",
    "Annapurna Base Camp Tour": "/images/annapurna-tour.svg",
    "Muktinath Pilgrimage Tour": "/images/muktinath-tour.svg"
  };

  return (
    <section className="section-space bg-gradient-to-b from-transparent to-[#05080f]" id="signature-tours">
      <Reveal className="shell space-y-10">
        <SectionHeading
          eyebrow="Signature Tours"
          title="Helicopter Journeys Crafted For The World’s Most Iconic Peaks"
          description="Luxury Himalayan circuits designed for travelers seeking maximum views, comfort, and time efficiency."
        />

        <div className="grid gap-5 lg:grid-cols-3">
          {tours.map((tour) => (
            <article key={tour.id} className="glass rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-aurora/40 hover:shadow-luxe">
              <div className="overflow-hidden rounded-2xl border border-white/10">
                <Image
                  src={tour.images?.[0] || imageMap[tour.title] || "/images/tours-overview.svg"}
                  alt={`${tour.title} helicopter package in Nepal`}
                  width={1600}
                  height={900}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="h-44 w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="mt-4 flex items-center justify-between gap-4">
                <div className="inline-flex rounded-xl border border-gold/35 bg-gold/10 p-3 text-gold">
                  <MountainSnow size={18} />
                </div>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.12em] text-haze">
                  <Timer size={14} /> {tour.duration}
                </span>
              </div>

              <h3 className="mt-5 font-display text-2xl text-white">{tour.title}</h3>
              <p className="copy mt-3">{tour.seoDescription || "Premium Himalayan helicopter circuit tailored to your schedule."}</p>
              <p className="mt-5 text-sm uppercase tracking-[0.15em] text-gold">
                From {tour.currency} {tour.priceFrom.toFixed(0)}
              </p>
              <Link href={`/tours/${tour.slug}`} className="mt-4 inline-flex text-sm font-medium text-gold transition-colors hover:text-amber-200">
                Tour details
              </Link>
              <InquiryButton href={getInquiryPath(tour.title)} className="mt-5" />
            </article>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
