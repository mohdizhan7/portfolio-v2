'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { LazyMotion, domAnimation } from 'framer-motion';
import { lenisInstance } from '@/lib/lenisInstance';

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Skip on touch/mobile — native scroll is smoother and faster
    const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 0.8,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
    });
    lenisInstance.current = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisInstance.current = null;
    };
  }, []);

  return <LazyMotion features={domAnimation} strict>{children}</LazyMotion>;
}
