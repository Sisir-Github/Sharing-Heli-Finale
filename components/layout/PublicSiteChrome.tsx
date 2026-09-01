"use client";

import { usePathname } from "next/navigation";

export function PublicSiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // /zh renders its own Chinese header and footer from app/zh/layout.tsx.
  if (pathname === "/login" || pathname.startsWith("/admin") || pathname === "/zh" || pathname.startsWith("/zh/")) {
    return null;
  }

  return <>{children}</>;
}
