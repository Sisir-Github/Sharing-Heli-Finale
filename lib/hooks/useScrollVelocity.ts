"use client";

import { useEffect, useRef } from "react";
import type { MutableRefObject } from "react";

type ScrollVelocityState = {
  velocityRef: MutableRefObject<number>;
  normalizedVelocityRef: MutableRefObject<number>;
  isScrollingRef: MutableRefObject<boolean>;
};

const MAX_REFERENCE_SPEED = 2400;

export function useScrollVelocity(): ScrollVelocityState {
  const velocityRef = useRef(0);
  const normalizedVelocityRef = useRef(0);
  const isScrollingRef = useRef(false);

  useEffect(() => {
    let rafId = 0;
    let previousY = window.scrollY;
    let previousTs = performance.now();
    let lastScrollTs = performance.now();
    let filteredVelocity = 0;

    const onScroll = () => {
      lastScrollTs = performance.now();
      isScrollingRef.current = true;
    };

    const loop = (ts: number) => {
      const currentY = window.scrollY;
      const deltaY = currentY - previousY;
      const deltaTime = Math.max((ts - previousTs) / 1000, 1 / 120);

      const rawVelocity = deltaY / deltaTime;
      filteredVelocity += (rawVelocity - filteredVelocity) * 0.16;

      if (Math.abs(filteredVelocity) < 4) {
        filteredVelocity = 0;
      }

      velocityRef.current = filteredVelocity;
      normalizedVelocityRef.current = Math.min(Math.abs(filteredVelocity) / MAX_REFERENCE_SPEED, 1);

      if (ts - lastScrollTs > 120) {
        isScrollingRef.current = false;
      }

      previousY = currentY;
      previousTs = ts;
      rafId = window.requestAnimationFrame(loop);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    rafId = window.requestAnimationFrame(loop);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return {
    velocityRef,
    normalizedVelocityRef,
    isScrollingRef
  };
}
