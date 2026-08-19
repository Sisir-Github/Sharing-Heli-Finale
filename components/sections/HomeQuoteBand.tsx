import Image from "next/image";

import { Marquee } from "@/components/ui/Marquee";

/**
 * Angled marquee over a photograph, with a pull-quote panel — mirrors the
 * "see the city the best way" moment in the reference layout.
 * PLACEHOLDER: the quote attribution should be replaced with a real passenger.
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
        <Marquee words={["See the Himalaya", "The best way to fly", "Pokhara departures"]} tone="navy" className="bg-transparent" />

        <div className="shell pb-16 pt-10 sm:pb-24 sm:pt-14">
          <figure className="frame-panel mx-auto m-0 max-w-2xl p-8 text-center sm:p-11">
            <span className="quote-mark block" aria-hidden="true">
              &ldquo;
            </span>
            <blockquote className="mt-2 font-display text-xl font-semibold leading-[1.5] text-navy sm:text-2xl">
              I have looked at these mountains from the ground my whole life. Forty minutes in the air completely changed
              what I thought I knew about them.
            </blockquote>
            <figcaption className="mt-6 font-display text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
              Placeholder passenger quote &middot; Annapurna scenic flight
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
