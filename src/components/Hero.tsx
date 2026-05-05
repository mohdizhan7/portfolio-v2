'use client';

import { useEffect, useRef } from 'react';
import { m } from 'framer-motion';

// ─── Live IST clock ──────────────────────────────────────────────────────────
function LiveClock() {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    function tick() {
      if (!ref.current) return;
      ref.current.textContent = new Intl.DateTimeFormat('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit', minute: '2-digit', second: '2-digit',
        hour12: true,
      }).format(new Date()).toUpperCase();
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <span
      ref={ref}
      style={{ fontWeight: 700, color: 'var(--fg)', fontVariantNumeric: 'tabular-nums' }}
      suppressHydrationWarning
    />
  );
}

// ─── Skills ticker ───────────────────────────────────────────────────────────
const TICKER_ITEMS = [
  'WMS IMPLEMENTATION', 'TMS ROLLOUT', 'SQL', 'METABASE', 'SETU', 'POSTMAN',
  '50+ SITE DEPLOYMENTS', 'NESTLÉ', 'P&G', 'ITC', 'UAT', 'KPI DASHBOARDS',
  'WAREHOUSE OPS', 'PROCESS DESIGN', 'BRD DOCUMENTATION', 'CHANGE MANAGEMENT',
  'LEAN SIX SIGMA', 'LAST-MILE LOGISTICS', 'GO-LIVE COORDINATION', 'PTL SYSTEMS',
];

function SkillsTicker() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div style={{ overflow: 'hidden', borderTop: '1px solid rgba(0,0,0,0.12)' }}>
      <div className="ticker-track">
        {items.map((item, i) => (
          <span key={i} className="ticker-item">
            {item}
            <span className="ticker-sep">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Animation ───────────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: (delay = 0) => ({
    opacity: 1, y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      delay,
    },
  }),
};

// ─── Hero ────────────────────────────────────────────────────────────────────
export default function Hero() {
  return (
    <section
      className="hero-padding"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--hero-bg)',
      }}
    >
      {/* Grain noise overlay */}
      <svg
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          opacity: 0.45, pointerEvents: 'none', zIndex: 0,
        }}
      >
        <filter id="hero-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#hero-noise)" />
      </svg>

      <div style={{
        maxWidth: 1100, width: '100%', margin: '0 auto',
        position: 'relative', zIndex: 1,
        paddingTop: 'clamp(140px, 16vw, 230px)',
        paddingBottom: 'clamp(32px, 4vw, 48px)',
        flex: 1, display: 'flex', flexDirection: 'column',
      }}>

        {/* ── Meta bar: location + status ──────────────────────────────── */}
        <m.div
          variants={fadeUp} initial="hidden" animate="visible" custom={0}
          className="hero-topbar"
          style={{
            fontSize: 'clamp(16px, 1.8vw, 18px)',
            fontWeight: 400,
            color: 'var(--fg)',
            letterSpacing: '0.01em',
            marginBottom: 'clamp(24px, 2vw, 32px)',
          }}
        >
          <span>Mumbai, India → <LiveClock /></span>
          <span className="hero-topbar-status">
            ✦ Status → <b style={{ fontWeight: 700, color: 'var(--fg)' }}>Open to Work</b>
          </span>
        </m.div>

        {/* ── Divider ───────────────────────────────────────────────────── */}
        <m.div
          variants={fadeUp} initial="hidden" animate="visible" custom={0.05}
          style={{
            borderBottom: '2px solid #000',
            marginBottom: 'clamp(32px, 4vw, 48px)',
          }}
        />

        {/* ── H1 ────────────────────────────────────────────────────────── */}
        <m.h1
          variants={fadeUp} initial="hidden" animate="visible" custom={0.12}
          style={{
            fontSize: 'clamp(62px, 13vw, 100px)',
            fontWeight: 600,
            lineHeight: 1.04,
            letterSpacing: '-0.03em',
            color: 'var(--fg)',
            maxWidth: 900,
            marginBottom: 'clamp(70px, 8vw, 110px)',
          }}
        >
          Hi, this is<br />Mohammed Izhan.
        </m.h1>

        {/* ── Info rows ────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(6px, 1vw, 10px)' }}>
          {([
            ['Currently →',  ' Project Manager @ StackBox', 0.22],
            ['Previously →', ' Edgistify · Mindseed · DTDC', 0.3],
            ['Delivering →', ' End-to-end, every time 📦', 0.38],
          ] as const).map(([label, value, delay]) => (
            <m.div
              key={label}
              variants={fadeUp} initial="hidden" animate="visible" custom={delay}
              style={{
                fontSize: 'clamp(17px, 2.2vw, 20px)',
                fontWeight: 400,
                color: 'var(--fg)',
                lineHeight: 1.45,
                padding: '3px 0',
              }}
            >
              <span>{label} </span>
              <b style={{ fontWeight: 700, color: 'var(--fg)' }}>{value.trim()}</b>
            </m.div>
          ))}
        </div>

        {/* ── Skills ticker pinned to bottom ───────────────────────────── */}
        <div style={{ marginTop: 'auto', paddingTop: 'clamp(32px, 5vw, 56px)' }}>
          <m.div variants={fadeUp} initial="hidden" animate="visible" custom={0.46}>
            <SkillsTicker />
          </m.div>
        </div>

      </div>
    </section>
  );
}
