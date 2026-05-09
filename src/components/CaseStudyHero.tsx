'use client';

import Image from 'next/image';
import { m } from 'framer-motion';

type Props = {
  title: string;
  cover: string;
  status?: string;
  metaItems: [string, string][];
};

const ease = [0.16, 1, 0.3, 1] as const;

export default function CaseStudyHero({ title, cover, status, metaItems }: Props) {
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100vh',
      minHeight: 640,
      backgroundColor: '#0a0a0a',
      overflow: 'hidden',
    }}>
      {/* Background image */}
      <Image
        src={cover}
        alt={title}
        fill
        priority
        style={{ objectFit: 'cover', opacity: 0.7 }}
        sizes="100vw"
      />

      {/* Gradient */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.08) 20%, rgba(0,0,0,0.55) 55%, rgba(0,0,0,0.88) 100%)',
      }} />

      {/* ── Animated hero content — bottom-aligned ── */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        display: 'flex',
        alignItems: 'flex-end',
        padding: '0 clamp(24px, 4.5vw, 64px) clamp(40px, 7vh, 72px)',
      }}>
        <div>
          {/* Status badge */}
          {status && (
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease, delay: 0.15 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                fontSize: 11, fontWeight: 700, letterSpacing: '0.1em',
                textTransform: 'uppercase', color: '#fbbf24',
                background: 'rgba(251,191,36,0.12)',
                border: '1px solid rgba(251,191,36,0.3)',
                borderRadius: 20, padding: '4px 12px', marginBottom: 24,
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#fbbf24', flexShrink: 0 }} />
              {status}
            </m.div>
          )}

          {/* Title */}
          <m.h1
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: status ? 0.25 : 0.18 }}
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
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: status ? 0.42 : 0.35 }}
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
              <div key={label} style={{
                padding: '16px 28px',
                borderRight: i < metaItems.length - 1
                  ? '1px solid rgba(255,255,255,0.14)'
                  : 'none',
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
    </div>
  );
}
