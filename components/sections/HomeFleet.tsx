import Image from "next/image";
import Link from "next/link";

const specs = [
  { label: "Aircraft", value: "Airbus H125" },
  { label: "Typical seating", value: "5 passengers" },
  { label: "Common routes", value: "Everest · Annapurna · Mustang" },
  { label: "Cabin", value: "Large-window scenic cabin" }
];

/**
 * Aircraft feature split for the Airbus Helicopters H125. Seating reflects the
 * standard Nepal passenger configuration; the registration and the licensed
 * operating carrier are still confirmed in writing for each booking.
 */
export function HomeFleet() {
  return (
    <>
      <section className="band band-cream">
        <div className="shell grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="eyebrow">
              <span className="inline-block h-px w-7 bg-current align-middle" aria-hidden="true" />
              Check out the aircraft
            </p>
            <h2 className="mt-5 font-display text-[2rem] font-semibold leading-[1.08] tracking-[-0.01em] text-navy sm:text-[2.7rem]">
              Airbus Helicopters H125 &mdash; the Himalayan workhorse
            </h2>
            <p className="mt-5 text-[15px] leading-[1.85] text-[var(--muted)]">
              The scenic flights, mountain transfers and pilgrimage routes we arrange are flown on the single-engine
              Airbus Helicopters H125 (formerly the AS350 B3e). It is the type best suited to high-altitude landings,
              short mountain strips and the changeable weather of the Himalaya &mdash; its AS350 B3 predecessor set the
              world record for the highest helicopter landing, on the summit of Everest.
            </p>
            <p className="mt-4 text-[15px] leading-[1.85] text-[var(--muted)]">
              The aircraft assigned to your flight, and the licensed operating carrier, are identified in the written
              quotation before any deposit is taken.
            </p>

            <dl className="mt-9 grid gap-px border-y border-sand sm:grid-cols-2">
              {specs.map((spec) => (
                <div key={spec.label} className="border-b border-sand py-5 last:border-b-0 sm:border-b-0 sm:py-6 sm:odd:pr-6 sm:even:border-l sm:even:border-sand sm:even:pl-6">
                  <dt className="font-display text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
                    {spec.label}
                  </dt>
                  <dd className="mt-2 font-display text-lg font-semibold text-navy">{spec.value}</dd>
                </div>
              ))}
            </dl>

            <Link href="/safety-flight-information" className="inquiry-button mt-8">
              Flight information
            </Link>
          </div>

          <figure className="m-0">
            <div className="media-frame aspect-[4/5]">
              <Image
                src="/images/campaign/annapurna-helicopter.jpg"
                alt="Helicopter used for Himalayan scenic flights in Nepal"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-3 font-display text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
              Annapurna region &middot; Nepal
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="band-tight band-cream-deep">
        <div className="shell">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-[1.7rem] font-semibold leading-[1.15] tracking-[-0.01em] text-navy sm:text-[2.2rem]">
              See the Himalaya the way the crew does
            </h2>
          </div>
          <figure className="mx-auto mt-9 m-0 max-w-4xl border border-sand bg-white p-2 shadow-card">
            <div className="media-frame aspect-[16/9]">
              <Image
                src="/images/campaign/everest-helicopter.jpg"
                alt="Everest region seen from a helicopter in Nepal"
                fill
                sizes="(max-width: 1024px) 100vw, 900px"
                className="object-cover"
              />
            </div>
          </figure>
        </div>
      </section>
    </>
  );
}
