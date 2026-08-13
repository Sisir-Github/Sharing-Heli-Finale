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
      <Reveal className="shell grid gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:gap-16">
        <div className="relative min-h-[430px] sm:min-h-[560px]">
          <div className="absolute inset-y-0 right-0 w-[84%] overflow-hidden rounded-lg">
            <Image
              src="/images/campaign/annapurna-helicopter.jpg"
              alt="Helicopter operating in Nepal's Annapurna region"
              fill
              sizes="(max-width: 1024px) 84vw, 44vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/25 via-transparent to-transparent" aria-hidden="true" />
          </div>

          <div className="operator-photo-secondary absolute bottom-8 left-0 aspect-[4/3] w-[50%] overflow-hidden rounded-lg border-[6px] shadow-[0_24px_55px_rgba(7,24,33,0.2)] sm:bottom-12">
            <Image
              src="/images/campaign/muktinath-helicopter.jpg"
              alt="Muktinath pilgrimage route in the Nepal Himalayas"
              fill
              sizes="(max-width: 1024px) 50vw, 25vw"
              className="object-cover"
            />
          </div>

          <div className="absolute left-3 top-5 border-l-2 border-aurora bg-[var(--card)] px-4 py-3 shadow-[0_12px_30px_rgba(7,24,33,0.12)] sm:left-6 sm:top-8">
            <p className="text-[10px] font-semibold uppercase text-[var(--muted)]">Local travel team</p>
            <p className="mt-1 text-sm font-semibold text-ink">Lakeside, Pokhara</p>
          </div>
        </div>

        <div>
          <p className="eyebrow">The team behind Sharing Heli</p>
          <h2 id="home-operator-title" className="mt-4 max-w-2xl font-display text-4xl font-semibold leading-tight tracking-normal text-ink sm:text-5xl">
            Local planning backed by established travel experience.
          </h2>
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
      </Reveal>
    </section>
  );
}
