import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CalendarRange, MapPin, Route } from "lucide-react";

import { Reveal } from "@/components/ui/Reveal";
import { COMPANY } from "@/lib/constants";

const operatorFacts = [
  { icon: CalendarRange, value: "2006", label: "Travel desk established" },
  { icon: MapPin, value: "Pokhara", label: "Lakeside operations" },
  { icon: Route, value: "Nepal", label: "Tailored route planning" }
];

export function HomeOperator() {
  return (
    <section className="section-space bg-canvas" aria-labelledby="home-operator-title">
      <Reveal className="shell grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-center lg:gap-16">
        <div>
          <p className="eyebrow">Planning from Pokhara since 2006</p>
          <h2 id="home-operator-title" className="mt-4 max-w-2xl font-display text-4xl font-semibold leading-tight tracking-normal text-ink sm:text-5xl">A local travel desk with the details in one place.</h2>
          <p className="copy mt-6 max-w-2xl text-base leading-8">
            Sharing Heli is operated by{" "}
            <a href={COMPANY.operatorUrl} target="_blank" rel="noreferrer" className="font-semibold text-aurora underline decoration-aurora/30 underline-offset-4">
              {COMPANY.operator}
            </a>
            , a Pokhara-based travel company coordinating tours, treks, flights, and tailored journeys across Nepal.
          </p>
          <p className="copy mt-4 max-w-2xl">
            Our Lakeside team brings the route, passenger details, aircraft availability, and practical travel arrangements into one clear plan before confirmation.
          </p>

          <dl className="mt-9 grid border-y border-ink/10 sm:grid-cols-3 sm:divide-x sm:divide-ink/10">
            {operatorFacts.map(({ icon: Icon, value, label }) => (
              <div key={value} className="border-b border-ink/10 py-5 last:border-b-0 sm:border-b-0 sm:px-5 sm:first:pl-0 sm:last:pr-0">
                <dt className="font-display text-2xl font-semibold text-ink">
                  <Icon size={20} className="mb-4 text-aurora" aria-hidden="true" />
                  {value}
                </dt>
                <dd className="mt-1 text-xs leading-5 text-[var(--muted)]">{label}</dd>
              </div>
            ))}
          </dl>

          <Link href="/about-us" className="inquiry-button mt-8">
            About our team <ArrowUpRight size={16} />
          </Link>
        </div>

        <div className="relative aspect-[5/4] overflow-hidden rounded-lg bg-ink/10">
          <Image
            src="/images/campaign/annapurna-helicopter.jpg"
            alt="Helicopter operating in Nepal's Annapurna region"
            fill
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 bg-ink/80 p-5 text-white sm:p-6">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-sky-300">Local operations support</p>
            <p className="mt-2 text-sm leading-6 text-white/70">Lakeside, Pokhara · Route planning · Passenger coordination</p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
