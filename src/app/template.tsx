'use client';

import { m } from 'framer-motion';
import { getFromData } from '@/lib/transitionStore';

export default function Template({ children }: { children: React.ReactNode }) {
  // When the hero clip-path transition is active, let it own the reveal.
  // Template just does a quick opacity fade so it doesn't fight the clipPath expand.
  const hasCardTransition = typeof window !== 'undefined' && !!getFromData();

  return (
    <m.div
      initial={{ opacity: 0, y: hasCardTransition ? 0 : 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: hasCardTransition ? 0.15 : 0.5,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </m.div>
  );
}
