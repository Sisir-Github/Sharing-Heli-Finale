"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

import { trackEvent } from "@/lib/analytics";

type PageEngagementTrackerProps = {
  eventName?: string;
  trackGuideScroll?: boolean;
};

export function PageEngagementTracker({ eventName, trackGuideScroll = false }: PageEngagementTrackerProps) {
  const pathname = usePathname();
  const sentGuideEvent = useRef(false);

  useEffect(() => {
    if (!eventName) {
      return;
    }

    const timeout = window.setTimeout(() => {
      trackEvent(eventName, {
        path: pathname,
        engaged_seconds: 15
      });
    }, 15000);

    return () => window.clearTimeout(timeout);
  }, [eventName, pathname]);

  useEffect(() => {
    if (!trackGuideScroll) {
      return;
    }

    const onScroll = () => {
      if (sentGuideEvent.current) {
        return;
      }

      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;

      if (totalHeight <= 0) {
        return;
      }

      const progress = scrollTop / totalHeight;
      if (progress >= 0.75) {
        trackEvent("guide_scroll_75", {
          path: pathname,
          scroll_percent: 75
        });
        sentGuideEvent.current = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, [trackGuideScroll, pathname]);

  return null;
}
