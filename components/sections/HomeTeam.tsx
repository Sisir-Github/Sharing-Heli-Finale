import Image from "next/image";
import Link from "next/link";

/**
 * PLACEHOLDER CONTENT — replace names, roles and portraits with the real
 * Pokhara desk team. Portraits should be square-ish (4:5 works best).
 */
const team = [
  {
    id: "desk-lead",
    name: "Flight desk lead",
    role: "Route planning & confirmations",
    image: "/images/campaign/annapurna-helicopter.jpg"
  },
  {
    id: "operations",
    name: "Operations coordinator",
    role: "Weather windows & aircraft availability",
    image: "/images/campaign/everest-helicopter.jpg"
  },
  {
    id: "guest-support",
    name: "Guest support",
    role: "Passenger details & ground arrangements",
    image: "/images/campaign/muktinath-helicopter.jpg"
  }
];

export function HomeTeam() {
  return (
    <section className="band band-navy">
      <div className="shell">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow justify-center text-white/60">
            <span className="inline-block h-px w-7 bg-current align-middle" aria-hidden="true" />
            The people behind the flight
          </p>
          <h2 className="mt-5 font-display text-[2rem] font-semibold leading-[1.08] tracking-[-0.01em] text-white sm:text-[2.7rem]">
            Meet Our Pokhara Flight Desk
          </h2>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member) => (
            <article key={member.id} className="group text-center">
              <div className="media-frame aspect-[4/5] bg-white/5">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <h3 className="mt-5 font-display text-base font-semibold uppercase tracking-[0.16em] text-white">{member.name}</h3>
              <p className="mt-2 text-xs leading-5 text-white/55">{member.role}</p>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/about-us" className="outline-button">
            Learn more about the team
          </Link>
        </div>
      </div>
    </section>
  );
}
