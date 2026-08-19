import Link from "next/link";

import { Reveal } from "@/components/ui/Reveal";

type WhyChooseItem = {
  id: string;
  title: string;
  description: string;
};

const defaultItems = [
  {
    id: "clarity",
    title: "Clarity before confirmation",
    description: "Know the route basis, timing, fare and operating conditions before confirming."
  },
  {
    id: "options",
    title: "The right format for your trip",
    description: "Compare shared-seat requests with a private aircraft plan without sales pressure."
  },
  {
    id: "local",
    title: "A real operations desk",
    description: "Discuss your trip directly with our Lakeside team by phone or WhatsApp."
  }
];

export function WhyChoose({ items }: { items: WhyChooseItem[] }) {
  const verifiedItems = items.filter(
    (item) => !/(certif|government|safest|best pilots|24\/7|experienced (mountain )?pilots)/i.test(`${item.title} ${item.description}`)
  );
  const resolvedItems = verifiedItems.length ? verifiedItems.slice(0, 3) : defaultItems;

  return (
    <section className="band band-cream-deep">
      <Reveal className="shell text-center">
        <p className="eyebrow justify-center">
          <span className="inline-block h-px w-7 bg-current align-middle" aria-hidden="true" />
          Before you reserve
        </p>
        <h2 className="mx-auto mt-5 max-w-3xl font-display text-[2rem] font-semibold leading-[1.08] tracking-[-0.01em] text-navy sm:text-[2.7rem]">
          What good helicopter planning should give you
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-[1.85] text-[var(--muted)]">
          Clear answers are more useful than generic promises. These are the standards our operations desk applies to every
          request.
        </p>

        <div className="mt-12 grid gap-5 text-left md:grid-cols-3">
          {resolvedItems.map((item, index) => (
            <article key={item.id} className="surface-card flex flex-col p-7 sm:p-8">
              <span className="font-display text-[2.6rem] font-bold leading-none text-accent">0{index + 1}</span>
              <h3 className="mt-5 font-display text-lg font-semibold uppercase leading-6 tracking-[0.08em] text-navy">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-[1.85] text-[var(--muted)]">{item.description}</p>
            </article>
          ))}
        </div>

        <Link href="/safety-flight-information" className="outline-button mt-11">
          Read flight information
        </Link>
      </Reveal>
    </section>
  );
}
