type ServiceDetailProps = {
  longDescription: string;
};

const nextSteps = [
  ["Share the requirement", "Send the route, preferred date, passenger count, and any baggage or timing needs."],
  ["We review the operation", "The flight desk checks route feasibility, aircraft availability, weather, and permissions."],
  ["Receive written details", "You receive the available option, current fare, inclusions, and next steps before payment."]
];

export function ServiceDetail({ longDescription }: ServiceDetailProps) {
  return (
    <section className="band band-cream">
      <div className="shell grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
        <div>
          <p className="eyebrow">
            <span className="inline-block h-px w-7 bg-current align-middle" aria-hidden="true" />
            Service overview
          </p>
          <h2 className="mt-5 max-w-xl font-display text-[1.8rem] font-semibold leading-[1.12] tracking-[-0.01em] text-navy sm:text-[2.4rem]">
            A clear plan before any commitment
          </h2>
          <p className="mt-6 max-w-2xl whitespace-pre-line text-[15px] leading-[1.9] text-[var(--muted)]">{longDescription}</p>
        </div>
        <div className="border-t border-sand pt-9 lg:border-l lg:border-t-0 lg:pl-14 lg:pt-0">
          <p className="eyebrow">
            <span className="inline-block h-px w-7 bg-current align-middle" aria-hidden="true" />
            What happens next
          </p>
          <ol className="mt-8 space-y-8">
            {nextSteps.map(([title, description], index) => (
              <li key={title} className="grid grid-cols-[3rem_1fr] gap-5">
                <span className="font-display text-[1.9rem] font-bold leading-none text-accent">0{index + 1}</span>
                <div>
                  <h3 className="font-display text-base font-semibold uppercase tracking-[0.08em] text-navy">{title}</h3>
                  <p className="mt-2 text-sm leading-[1.85] text-[var(--muted)]">{description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
