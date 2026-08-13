import { cn } from "@/lib/utils";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
};

export function Reveal({ children, className, delayMs = 0 }: RevealProps) {
  return (
    <div className={cn("reveal-in", className)} style={{ animationDelay: `${delayMs}ms` }}>
      {children}
    </div>
  );
}
