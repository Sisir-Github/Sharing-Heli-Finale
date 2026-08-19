import Link from "next/link";

import { ReservationButton } from "@/components/ui/ReservationButton";

function HelicopterLineArt() {
  return (
    <svg
      viewBox="0 0 340 160"
      role="img"
      aria-label="Line illustration of a helicopter"
      className="h-auto w-full max-w-[440px] text-navy"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* main rotor */}
      <path d="M28 26 H272" />
      <path d="M60 20 L140 26 L60 32" opacity="0.45" />
      <path d="M244 20 L164 26 L244 32" opacity="0.45" />
      <path d="M152 26 V46" />
      {/* cabin */}
      <path d="M104 46 C74 50 56 68 56 88 C56 106 72 118 98 118 L158 118 C178 118 192 104 197 88 L208 54 C210 49 207 46 202 46 Z" />
      {/* windows */}
      <path d="M104 58 C89 63 78 73 76 85 L112 85 Z" />
      <path d="M124 58 L124 85 L152 85 L152 58 Z" opacity="0.5" />
      {/* tail boom + fin */}
      <path d="M196 68 L300 74 L300 88 L192 92" />
      <path d="M286 74 L308 42 L317 47 L303 76" />
      <circle cx="305" cy="58" r="5" />
      <path d="M300 88 L314 96" />
      {/* skids */}
      <path d="M84 118 L78 140 M156 118 L162 140" />
      <path d="M52 140 H192" />
      <path d="M62 140 L56 148 M182 140 L188 148" opacity="0.5" />
    </svg>
  );
}

export function HomeFinalCta() {
  return (
    <section className="band-tight band-cream border-t border-sand">
      <div className="shell grid items-center gap-8 lg:grid-cols-[1fr_0.85fr]">
        <div>
          <h2 className="font-display text-[2rem] font-semibold leading-[1.08] tracking-[-0.01em] text-navy sm:text-[2.7rem]">
            Ready to fly?
          </h2>
          <p className="mt-5 max-w-xl text-[15px] leading-[1.85] text-[var(--muted)]">
            Send us the route, date and passenger details. The Pokhara team will confirm the suitable flight format,
            current fare and next steps.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ReservationButton label="Let's get started" />
            <Link href="/tours" className="outline-button">
              Browse all tours
            </Link>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <HelicopterLineArt />
        </div>
      </div>
    </section>
  );
}
