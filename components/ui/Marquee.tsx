import { cn } from "@/lib/utils";

type MarqueeProps = {
  words: string[];
  className?: string;
  tone?: "navy" | "cream";
  tilt?: boolean;
};

/**
 * Full-bleed scrolling headline band. The word list is duplicated once so the
 * CSS translateX(-50%) loop is seamless.
 */
export function Marquee({ words, className, tone = "navy", tilt = true }: MarqueeProps) {
  const sequence = [...words, ...words];

  return (
    <div className={cn("relative overflow-hidden py-1", tone === "navy" ? "bg-navy text-white" : "bg-creamdeep text-navy", className)}>
      <div className={cn("marquee py-6 sm:py-8", tilt && "marquee-tilt")}>
        <div className="marquee-track" aria-hidden="true">
          {sequence.map((word, index) => (
            <span key={`${word}-${index}`} className="marquee-word">
              <span className={index % 2 === 1 ? "marquee-outline" : undefined}>{word}</span>
              <span className="text-accent" aria-hidden="true">
                &#9670;
              </span>
            </span>
          ))}
        </div>
      </div>
      <span className="sr-only">{words.join(". ")}</span>
    </div>
  );
}
