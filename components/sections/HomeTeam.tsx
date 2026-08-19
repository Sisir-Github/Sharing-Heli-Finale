import Image from "next/image";
import Link from "next/link";

/**
 * Set `image` to a portrait path once real photos are available (4:5 crops work
 * best). Until then each card falls back to an initials monogram rather than a
 * stock photo, so nobody is represented by a picture that is not them.
 */
const team: Array<{ id: string; name: string; title: string; role: string; image?: string }> = [
  {
    id: "desk-lead",
    name: "Sisir Paudel",
    title: "Flight Desk Lead",
    role: "Route planning & confirmations"
  },
  {
    id: "operations",
    name: "Rishi Ram Paudel",
    title: "Operations Coordinator",
    role: "Weather windows & aircraft availability"
  },
  {
    id: "guest-support",
    name: "Srijana Paudel",
    title: "Guest Support",
    role: "Passenger details & ground arrangements"
  }
];

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

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
            Meet Our Flight Desk
          </h2>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member) => (
            <article key={member.id} className="group text-center">
              <div className="media-frame aspect-[4/5] bg-white/5">
                {member.image ? (
                  <Image
                    src={member.image}
                    alt={`${member.name}, ${member.title}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="grid h-full w-full place-items-center bg-white/[0.07]" aria-hidden="true">
                    <span className="font-display text-5xl font-semibold tracking-[0.08em] text-white/70">
                      {initials(member.name)}
                    </span>
                  </div>
                )}
              </div>
              <h3 className="mt-5 font-display text-base font-semibold uppercase tracking-[0.16em] text-white">{member.name}</h3>
              <p className="mt-2 font-display text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">{member.title}</p>
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
