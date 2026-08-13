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
    <section className="section-space bg-canvas">
      <div className="shell grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
        <div>
          <p className="eyebrow">Service overview</p>
          <h2 className="mt-3 max-w-xl font-display text-3xl font-semibold leading-tight tracking-normal text-ink sm:text-4xl">A clear plan before any commitment</h2>
          <p className="copy mt-6 max-w-2xl whitespace-pre-line">{longDescription}</p>
        </div>
        <div className="border-t border-ink/10 pt-8 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
          <p className="eyebrow">What happens next</p>
          <ol className="mt-7 space-y-7">
            {nextSteps.map(([title, description], index) => (
              <li key={title} className="grid grid-cols-[2.5rem_1fr] gap-4">
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-aurora text-sm font-semibold text-white">0{index + 1}</span>
                <div>
                  <h3 className="font-display text-lg font-semibold tracking-normal text-ink">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
