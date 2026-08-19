import Link from "next/link";
import { Headphones, MapPinned, ShieldCheck } from "lucide-react";

import { COMPANY } from "@/lib/constants";

type TrustItem = {
  id: string;
  title: string;
  description: string;
  visible: boolean;
};

const defaults = [
  {
    id: "local",
    title: "Pokhara-based coordination",
    description: "Direct support from our Lakeside team before and after your flight.",
    visible: true
  },
  {
    id: "planning",
    title: "Weather-led planning",
    description: "Routes and schedules are reviewed against current operating conditions.",
    visible: true
  },
  {
    id: "support",
    title: "Direct desk support",
    description: "Speak with the local team by phone, email or WhatsApp.",
    visible: true
  }
];

const icons = [MapPinned, ShieldCheck, Headphones];

/** Deep navy statement band — the "about us" moment of the page. */
export function HomeIntroBand({ items }: { items: TrustItem[] }) {
  const resolved = items.filter((item) => item.visible).slice(0, 3);
  const trustItems = resolved.length === 3 ? resolved : defaults;

  return (
    <section className="band band-navy">
      <div className="shell text-center">
        <p className="eyebrow justify-center text-white/60">
          <span className="inline-block h-px w-7 bg-current align-middle" aria-hidden="true" />
          About us
        </p>
        <h2 className="mx-auto mt-6 max-w-4xl font-display text-[1.9rem] font-semibold leading-[1.22] tracking-[-0.01em] text-white sm:text-[2.6rem]">
          Based in Lakeside, Pokhara, {COMPANY.companyName} is a locally operated flight desk coordinating shared
          helicopter flights, private charters and pilgrimage routes across Nepal.
        </h2>
        <p className="mx-auto mt-7 max-w-2xl text-[15px] leading-[1.9] text-white/62">
          Operated by{" "}
          <a
            href={COMPANY.operatorUrl}
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-white underline decoration-accent/60 underline-offset-4"
          >
            {COMPANY.operator}
          </a>
          , we plan every request around real passenger, weather and aircraft requirements.
        </p>

        <div className="mt-14 grid gap-px border-y border-white/12 text-left md:grid-cols-3 md:divide-x md:divide-white/12">
          {trustItems.map((item, index) => {
            const Icon = icons[index];
            return (
              <article key={item.id} className="border-b border-white/12 px-1 py-8 last:border-b-0 md:border-b-0 md:px-8 md:first:pl-0 md:last:pr-0">
                <Icon size={22} className="text-accent" />
                <h3 className="mt-5 font-display text-lg font-semibold uppercase tracking-[0.1em] text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-[1.85] text-white/60">{item.description}</p>
              </article>
            );
          })}
        </div>

        <Link href="/about-us" className="light-button mt-12">
          Learn more
        </Link>
      </div>
    </section>
  );
}
