import Image from "next/image";
import Link from "next/link";

import { ReservationButton } from "@/components/ui/ReservationButton";

export function HomeExperienceCta() {
  return (
    <section className="band band-navy">
      <div className="shell grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <div>
          <h2 className="font-display text-[1.9rem] font-semibold uppercase leading-[1.14] tracking-[0.01em] text-white sm:text-[2.5rem]">
            Interested in flying but not sure where to start?
          </h2>
          <p className="mt-6 max-w-xl text-[15px] leading-[1.9] text-white/62">
            Send us the region you want to see, your date range and how many passengers are travelling. We will come back
            with the realistic flight formats &mdash; a shared seat, a private aircraft, or a mountain transfer &mdash;
            with the current fare, the operating carrier and what happens if the weather moves.
          </p>
          <ul className="mt-8 grid gap-3 border-y border-white/12 py-7 text-sm text-white/70 sm:grid-cols-2">
            <li>&middot; Route feasibility review</li>
            <li>&middot; Current written fare</li>
            <li>&middot; Passenger &amp; weight planning</li>
            <li>&middot; Weather &amp; reschedule policy</li>
          </ul>
          <p className="mt-6 font-display text-[11px] font-semibold uppercase tracking-[0.22em] text-white/50">
            No cost to ask &middot; Reply from the Pokhara desk
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <ReservationButton variant="accent" label="Plan my flight" />
            <Link href="/contact" className="outline-button">
              Talk to the desk
            </Link>
          </div>
        </div>

        <figure className="m-0">
          <div className="media-frame aspect-[4/5] bg-white/5">
            <Image
              src="/images/campaign/sharing-heli-hero.jpg"
              alt="Passenger boarding a helicopter in Nepal"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
          </div>
        </figure>
      </div>
    </section>
  );
}
