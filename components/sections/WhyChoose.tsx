import { CheckCircle2 } from "lucide-react";

import { InquiryButton } from "@/components/ui/InquiryButton";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

type WhyChooseItem = {
  id: string;
  title: string;
  description: string;
};

export function WhyChoose({ items }: { items: WhyChooseItem[] }) {
  return (
    <section className="section-space">
      <Reveal className="shell grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <SectionHeading
          eyebrow="Why Choose Sharing Heli"
          title="Aviation Excellence Tuned For Himalayan Conditions"
          description="Every route is engineered with safety, comfort, and timing precision so your mission stays effortless from takeoff to touchdown."
        />

        <div className="grid gap-4">
          {items.map((item) => (
            <article key={item.id} className="glass rounded-2xl p-5 transition-all duration-300 hover:border-aurora/40 hover:shadow-luxe">
              <div className="flex gap-4">
                <div className="mt-1 text-gold">
                  <CheckCircle2 size={18} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  <p className="copy mt-2 text-sm">{item.description}</p>
                </div>
              </div>
            </article>
          ))}

          <InquiryButton className="mt-4 w-fit" />
        </div>
      </Reveal>
    </section>
  );
}
