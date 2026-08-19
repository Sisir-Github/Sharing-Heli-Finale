import { cn } from "@/lib/utils";

type PageIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
  headingLevel?: 1 | 2;
  tone?: "cream" | "cream-deep" | "white";
  centered?: boolean;
};

const toneClass = {
  cream: "band-cream",
  "cream-deep": "band-cream-deep",
  white: "band-white"
} as const;

export function PageIntro({
  eyebrow,
  title,
  description,
  headingLevel = 1,
  tone = "cream",
  centered = true
}: PageIntroProps) {
  const HeadingTag = headingLevel === 1 ? "h1" : "h2";

  return (
    <section className={cn("band-tight", toneClass[tone])}>
      <div className="shell">
        <div className={cn(centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl")}>
          <p className={cn("eyebrow", centered && "justify-center")}>
            <span className="inline-block h-px w-7 bg-current align-middle" aria-hidden="true" />
            {eyebrow}
          </p>
          <HeadingTag className="mt-5 font-display text-[2rem] font-semibold leading-[1.08] tracking-[-0.01em] text-navy sm:text-[2.8rem]">
            {title}
          </HeadingTag>
          <p className="mt-5 text-base leading-[1.85] text-[var(--muted)]">{description}</p>
        </div>
      </div>
    </section>
  );
}
