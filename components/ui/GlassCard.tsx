import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type GlassCardProps = {
  className?: string;
  children: ReactNode;
};

export function GlassCard({ className, children }: GlassCardProps) {
  return <article className={cn("surface-card surface-card-hover p-6", className)}>{children}</article>;
}
