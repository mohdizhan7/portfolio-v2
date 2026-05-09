'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { m, useMotionValue, animate } from 'framer-motion';
import { getFromData, clearFromData } from '@/lib/transitionStore';

type Props = {
  title: string;
  cover: string;
  status?: string;
  number: string;
  metaItems: [string, string][];
};

const EASE = [0.16, 1, 0.3, 1] as const;

export default function CaseStudyHero({ title, cover, status, number, metaItems }: Props) {
  const fromRect = typeof window !== 'undefined' ? getFromData() : null;
  const hasTransition = !!fromRect;

  const clipPath = useMotionValue('inset(0px 0px 0px 0px)');

  useEffect(() => {
    const d = getFromData();
    clearFromData();

    if (d) {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const start = `inset(${d.top}px ${w - d.right}px ${h - d.bottom}px ${d.left}px round 16px)`;

      clipPath.set(start);

      animate(clipPath, 'inset(0px 0px 0px 0px round 0px)', {
        duration: 0.72,
        ease: [0.16, 1, 0.3, 1],
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const td = (base: number) => (hasTransition ? base + 0.62 : base);

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100vh',
      minHeight: 640,
      backgroundColor: '#0a0a0a',
      overflow: 'hidden',
    }}>

      <m.div style={{ position: 'absolute', inset: 0, clipPath }}>
        <Image
          src={cover}
          alt={title}
          fill
          priority
          style={{ objectFit: 'cover', opacity: 0.7 }}
          sizes="100vw"
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.08) 20%, rgba(0,0,0,0.55) 55%, rgba(0,0,0,0.88) 100%)',
        }} />
      </m.div>

      <m.div
        className="cs-hero-numeral"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.0, delay: hasTransition ? 0.38 : 0.22 }}
        aria-hidden
        style={{
          position: 'absolute',
          right: 'clamp(20px, 4vw, 64px)',
          bottom: 'clamp(40px, 7vh, 80px)',
          fontSize: 'clamp(160px, 24vw, 300px)',
          fontWeight: 800,
          letterSpacing: '-0.06em',
          lineHeight: 1,
          color: 'transparent',
          WebkitTextStroke: '1.5px rgba(255,255,255,0.1)',
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      >
        {number}
      </m.div>

      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        display: 'flex', alignItems: 'flex-end',
        padding: '0 clamp(24px, 4.5vw, 64px) clamp(40px, 7vh, 72px)',
      }}>
        <div className="w-full min-w-0">
          {status && (
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE, delay: td(0.08) }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                fontSize: 11, fontWeight: 700, letterSpacing: '0.1em',
                textTransform: 'uppercase', color: '#fbbf24',
                background: 'rgba(251,191,36,0.12)',
                border: '1px solid rgba(251,191,36,0.3)',
                borderRadius: 20, padding: '4px 12px', marginBottom: 22,
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#fbbf24', flexShrink: 0 }} />
              {status}
            </m.div>
          )}

          <m.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, ease: EASE, delay: td(status ? 0.2 : 0.1) }}
            style={{
              fontSize: 'clamp(56px, 9vw, 128px)',
              fontWeight: 800, color: '#ffffff',
              lineHeight: 1.0, letterSpacing: '-0.04em',
              margin: '0 0 28px',
            }}
          >
            {title}
          </m.h1>

          <m.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: td(status ? 0.36 : 0.24) }}
            className="grid grid-cols-2 w-full overflow-hidden rounded-[14px] border border-white/[0.16] bg-white/[0.08] md:inline-flex md:w-auto"
            style={{ backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}
          >
            {metaItems.map(([label, val], i) => {
              const isRightCol  = i % 2 === 1;
              const isBottomRow = i >= metaItems.length - 2;
              const isLastItem  = i === metaItems.length - 1;
              return (
                <div
                  key={label}
                  className={[
                    'min-w-0 p-3 md:px-7 md:py-4 border-white/[0.14]',
                    !isRightCol  ? 'border-r'    : '',
                    !isBottomRow ? 'border-b'    : '',
                    isLastItem   ? 'md:border-r-0' : 'md:border-r',
                    'md:border-b-0',
                  ].join(' ')}
                >
                  <div className="mb-[7px] text-[10px] uppercase tracking-[0.18em] text-white/45">
                    {label}
                  </div>
                  <div className="truncate text-sm font-semibold text-white">
                    {val}
                  </div>
                </div>
              );
            })}
          </m.div>
        </div>
      </div>

      <m.div
        className="cs-hero-scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: td(0.6) }}
        aria-hidden
        style={{
          position: 'absolute',
          right: 28,
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 10,
          pointerEvents: 'none',
        }}
      >
        <span style={{
          writingMode: 'vertical-rl',
          fontSize: 9,
          fontWeight: 700,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.35)',
        }}>
          Scroll
        </span>
        <div style={{ width: 1, height: 48, background: 'rgba(255,255,255,0.18)' }} />
      </m.div>
    </div>
  );
}
