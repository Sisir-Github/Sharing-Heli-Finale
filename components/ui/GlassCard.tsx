import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type GlassCardProps = {
  className?: string;
  children: ReactNode;
};

export function GlassCard({ className, children }: GlassCardProps) {
  return <article className={cn("glass rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1", className)}>{children}</article>;
}
