import Image from "next/image";

import { InquiryButton } from "@/components/ui/InquiryButton";

type PageVisualIntroProps = {
  imageSrc: string;
  imageAlt: string;
  note: string;
  inquiryHref?: string;
};

export function PageVisualIntro({ imageSrc, imageAlt, note, inquiryHref = "/contact" }: PageVisualIntroProps) {
  return (
    <section className="section-space pt-4">
      <div className="shell grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5">
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={1600}
            height={900}
            priority={false}
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="glass rounded-3xl p-6 sm:p-8">
          <h2 className="font-display text-3xl text-white">Operational Brief</h2>
          <p className="copy mt-4">{note}</p>
          <InquiryButton href={inquiryHref} className="mt-6" />
        </div>
      </div>
    </section>
  );
}
