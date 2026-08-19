import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  centered?: boolean;
  tone?: "dark" | "light";
  as?: "h1" | "h2" | "h3";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  centered = false,
  tone = "dark",
  as = "h2",
  className
}: SectionHeadingProps) {
  const Heading = as;
  const light = tone === "light";

  return (
    <div className={cn(centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl", className)}>
      {eyebrow ? (
        <p className={cn("eyebrow", light && "text-white/60")}>
          <span className="inline-block h-px w-7 bg-current align-middle" aria-hidden="true" />
          {eyebrow}
        </p>
      ) : null}
      <Heading className={cn("mt-5 font-display text-[2.1rem] font-semibold leading-[1.08] tracking-[-0.01em] sm:text-5xl", light ? "text-white" : "text-navy")}>
        {title}
      </Heading>
      {description ? (
        <p className={cn("mt-5 text-base leading-[1.85]", light ? "text-white/72" : "text-[var(--muted)]")}>{description}</p>
      ) : null}
    </div>
  );
}
