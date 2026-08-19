import type { FaqItem } from "@/lib/seo/types";

type FaqSectionProps = {
  title?: string;
  intro?: string;
  items: FaqItem[];
};

export function FaqSection({
  title = "Frequently Asked Questions",
  intro = "Answers from our operations team to help you plan your helicopter flight in Nepal.",
  items
}: FaqSectionProps) {
  return (
    <section className="band band-white" id="faq">
      <div className="shell">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow justify-center">
            <span className="inline-block h-px w-7 bg-current align-middle" aria-hidden="true" />
            Good to know
          </p>
          <h2 className="mt-5 font-display text-[1.9rem] font-semibold leading-[1.1] tracking-[-0.01em] text-navy sm:text-[2.5rem]">
            {title}
          </h2>
          <p className="mt-5 text-[15px] leading-[1.85] text-[var(--muted)]">{intro}</p>
        </div>

        <div className="mx-auto mt-11 max-w-3xl divide-y divide-sand border-y border-sand">
          {items.map((item) => (
            <details key={item.question} className="group py-5">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 font-display text-base font-semibold text-navy sm:text-lg">
                {item.question}
                <span
                  className="mt-1 shrink-0 font-display text-xl leading-none text-accent transition-transform group-open:rotate-45"
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>
              <p className="mt-4 max-w-2xl text-sm leading-[1.9] text-[var(--muted)]">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
