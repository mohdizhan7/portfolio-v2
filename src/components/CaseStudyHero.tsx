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
  /**
   * Read the stored card-image rect synchronously.
   * - Client-side nav: window is defined, getFromData() returns the stored rect.
   * - Direct URL / SSR:  window is undefined → null, no transition.
   * No hydration mismatch because for direct loads getFromData() is null on both
   * server and client (nothing was stored).
   */
  const fromRect = typeof window !== 'undefined' ? getFromData() : null;
  const vw = typeof window !== 'undefined' ? window.innerWidth : 1440;
  const vh = typeof window !== 'undefined' ? window.innerHeight : 900;
  const hasTransition = !!fromRect;

  /**
   * clipPath motion value — starts at full-screen (SSR-safe default).
   * useEffect imperatively snaps it to the card position then animates out.
   */
  const clipPath = useMotionValue('inset(0px 0px 0px 0px)');

  useEffect(() => {
    const d = getFromData(); // re-read (covers the case where window wasn't ready at render)
    clearFromData();

    if (d) {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const start = `inset(${d.top}px ${w - d.right}px ${h - d.bottom}px ${d.left}px round 16px)`;

      // Snap to card bounds immediately (before browser paints the next frame)
      clipPath.set(start);

      // Then animate to full-screen
      animate(clipPath, 'inset(0px 0px 0px 0px round 0px)', {
        duration: 0.72,
        ease: [0.16, 1, 0.3, 1],
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Text element delays shift later when the clip animation is playing,
   * so they don't appear before the image finishes expanding.
   */
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

      {/* ── Image — controlled by the clipPath motion value ── */}
      <m.div style={{ position: 'absolute', inset: 0, clipPath }}>
        <Image
          src={cover}
          alt={title}
          fill
          priority
          style={{ objectFit: 'cover', opacity: 0.7 }}
          sizes="100vw"
        />
        {/* Gradient: transparent top → dark bottom */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.08) 20%, rgba(0,0,0,0.55) 55%, rgba(0,0,0,0.88) 100%)',
        }} />
      </m.div>

      {/* ── Background numeral (large outlined, low opacity) ── */}
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

      {/* ── Text content — bottom-anchored ── */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        display: 'flex', alignItems: 'flex-end',
        padding: '0 clamp(24px, 4.5vw, 64px) clamp(40px, 7vh, 72px)',
      }}>
        <div>
          {/* Status badge */}
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

          {/* Title */}
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

          {/* Floating meta table */}
          <m.div
            className="cs-meta"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: td(status ? 0.36 : 0.24) }}
            style={{
              display: 'inline-flex',
              background: 'rgba(255,255,255,0.08)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(255,255,255,0.16)',
              borderRadius: 14,
              overflow: 'hidden',
            }}
          >
            {metaItems.map(([label, val], i) => (
              <div key={label} className="cs-meta-cell" style={{
                padding: '16px 28px',
                borderRight: i < metaItems.length - 1 ? '1px solid rgba(255,255,255,0.14)' : 'none',
              }}>
                <div style={{
                  fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.45)', marginBottom: 7,
                }}>
                  {label}
                </div>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#ffffff', whiteSpace: 'nowrap' }}>
                  {val}
                </div>
              </div>
            ))}
          </m.div>
        </div>
      </div>

      {/* ── Scroll indicator — right edge ── */}
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
