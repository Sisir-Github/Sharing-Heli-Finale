import Image from "next/image";

import { Marquee } from "@/components/ui/Marquee";

/**
 * Angled marquee over a photograph, with a statement panel — mirrors the
 * "see the city the best way" moment in the reference layout. Deliberately not
 * a passenger quote: real reviews live in the testimonials section.
 */
export function HomeQuoteBand() {
  return (
    <section className="relative isolate overflow-hidden bg-navydeep">
      <Image
        src="/images/campaign/annapurna-helicopter.jpg"
        alt="Helicopter flying beside Himalayan peaks in Nepal"
        fill
        sizes="100vw"
        className="object-cover opacity-45"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,42,60,0.75),rgba(10,42,60,0.92))]" aria-hidden="true" />

      <div className="relative z-10">
        <Marquee words={["See the Himalaya", "The best way to fly", "Daily departures"]} tone="navy" className="bg-transparent" />

        <div className="shell pb-16 pt-10 sm:pb-24 sm:pt-14">
          <div className="frame-panel mx-auto max-w-2xl p-8 text-center sm:p-11">
            <p className="eyebrow justify-center">
              <span className="inline-block h-px w-7 bg-current align-middle" aria-hidden="true" />
              Why fly
            </p>
            <p className="mt-5 font-display text-xl font-semibold leading-[1.5] text-navy sm:text-2xl">
              A scenic flight covers in under an hour what takes days of trekking to reach — with the same mountains,
              seen from the altitude the crew flies them at.
            </p>
            <p className="mt-6 font-display text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
              Everest &middot; Annapurna &middot; Muktinath routes
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
