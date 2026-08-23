'use client';

import { useEffect, useRef } from 'react';
import { formatTenure } from '@/lib/tenure';

/**
 * Renders a live "X yr Y mo" tenure for an ongoing role, computed on the
 * client at load time so it's always current without a manual monthly edit.
 * Mirrors the LiveClock pattern in Hero.tsx: empty on the server, filled
 * in on mount, to avoid hydration mismatches from date-sensitive text.
 */
export default function Tenure({ start }: { start: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.textContent = formatTenure(new Date(start));
    }
  }, [start]);

  return <span ref={ref} suppressHydrationWarning />;
}
