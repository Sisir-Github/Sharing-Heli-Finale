import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2, Headphones, MapPinned, ShieldCheck } from "lucide-react";

import { Reveal } from "@/components/ui/Reveal";

type WhyChooseItem = {
  id: string;
  title: string;
  description: string;
};

const defaultItems = [
  { id: "clarity", title: "Clarity before confirmation", description: "Know the route basis, timing, fare, and operating conditions before confirming." },
  { id: "options", title: "The right format for your trip", description: "Compare shared-seat requests with a private aircraft plan without sales pressure." },
  { id: "local", title: "A real Pokhara operations desk", description: "Discuss your trip directly with our Lakeside team by phone or WhatsApp." }
];

const signals = [
  { icon: ShieldCheck, label: "Safety-conscious planning" },
  { icon: MapPinned, label: "Local route knowledge" },
  { icon: Headphones, label: "Responsive coordination" }
];

export function WhyChoose({ items }: { items: WhyChooseItem[] }) {
  const verifiedItems = items.filter((item) => !/(certif|government|safest|best pilots|24\/7|experienced (mountain )?pilots)/i.test(`${item.title} ${item.description}`));
  const resolvedItems = verifiedItems.length ? verifiedItems.slice(0, 3) : defaultItems;

  return (
    <section className="section-space bg-canvas">
      <Reveal className="shell grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
        <div className="home-image-panel relative min-h-[480px] overflow-hidden rounded-lg sm:min-h-[560px]">
          <Image
            src="/images/campaign/annapurna-helicopter.jpg"
            alt="Helicopter on a Himalayan landing area in the Annapurna region"
            fill
            sizes="(max-width: 1024px) 100vw, 54vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/15 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-9">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-copper">Mountain travel needs judgment</p>
            <h2 className="mt-3 max-w-xl font-display text-3xl font-semibold leading-tight tracking-normal sm:text-5xl">Good flights begin with honest planning.</h2>
          </div>
        </div>

        <div className="surface-card flex flex-col p-6 sm:p-9 lg:p-10">
          <p className="eyebrow">Why Sharing Heli</p>
          <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">
            Mountain aviation is conditional by nature. Our role is to make the decision easier with practical information and direct next steps.
          </p>

          <div className="mt-8 divide-y divide-ink/10 border-y border-ink/10">
            {resolvedItems.map((item, index) => (
              <article key={item.id} className="grid grid-cols-[34px_1fr] gap-4 py-6">
                <span className="pt-1 font-display text-sm font-semibold text-copper">0{index + 1}</span>
                <div>
                  <h3 className="font-display text-xl font-semibold tracking-normal text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-7 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {signals.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-xs font-semibold text-ink"><CheckCircle2 size={15} className="text-copper" /><span>{label}</span><Icon size={15} className="ml-auto text-slate-400" /></div>
            ))}
          </div>

          <Link href="/about-us" className="editorial-link-dark mt-auto pt-9">Meet Sharing Heli <ArrowUpRight size={16} /></Link>
        </div>
      </Reveal>
    </section>
  );
}
