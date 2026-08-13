import type { FaqItem } from "@/lib/seo/types";

type FaqSectionProps = {
  title?: string;
  intro?: string;
  items: FaqItem[];
};

export function FaqSection({
  title = "Frequently Asked Questions",
  intro = "Answers from our operations team to help you plan your helicopter mission in Nepal.",
  items
}: FaqSectionProps) {
  return (
    <section className="section-space bg-canvas pt-8" id="faq">
      <div className="shell">
        <div className="max-w-3xl">
          <h2 className="headline text-balance">{title}</h2>
          <p className="copy mt-4">{intro}</p>
        </div>

        <div className="mt-8 grid gap-4">
          {items.map((item) => (
            <details key={item.question} className="surface-card p-5">
              <summary className="cursor-pointer list-none pr-4 text-lg font-semibold text-ink">{item.question}</summary>
              <p className="copy mt-3 text-sm">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
