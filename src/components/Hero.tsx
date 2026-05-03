'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

function useLiveClock() {
  const [time, setTime] = useState('--:--:-- --');
  useEffect(() => {
    function tick() {
      const ist = new Intl.DateTimeFormat('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit', minute: '2-digit', second: '2-digit',
        hour12: true,
      }).format(new Date()).toUpperCase();
      setTime(ist);
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: [0, 0, 0.2, 1] as [number, number, number, number], delay },
  }),
};

export default function Hero() {
  const clock = useLiveClock();
  const blobRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const blob = blobRef.current;
    if (!blob) return;
    function onMove(e: MouseEvent) {
      blob!.style.transform = `translate(${e.clientX - 250}px, ${e.clientY - 250}px)`;
    }
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <section className="hero-padding" style={{
      minHeight: '100vh',
      padding: '0 64px',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
      background: 'var(--hero-bg)',
    }}>
      {/* Mouse-tracking blob */}
      <div ref={blobRef} style={{
        position: 'absolute',
        width: 500, height: 500,
        borderRadius: '50%',
        background: 'radial-gradient(circle at center, rgba(255,255,255,0.07) 0%, transparent 70%)',
        filter: 'blur(50px)',
        pointerEvents: 'none',
        top: 0, left: 0,
        zIndex: 0,
        willChange: 'transform',
        transform: 'translate(calc(50vw - 250px), calc(50vh - 250px))',
      }} />

      <div style={{ maxWidth: 1100, width: '100%', margin: '0 auto', position: 'relative', zIndex: 1, paddingTop: 64 }}>

        {/* Topbar */}
        <motion.div
          variants={fadeUp} initial="hidden" animate="visible" custom={0}
          className="hero-topbar"
          style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            paddingBottom: 14,
            borderBottom: '1px solid var(--fg-2)',
            marginBottom: 64,
            fontSize: 13.5, fontWeight: 400,
            color: 'var(--fg-2)', letterSpacing: '0.01em',
          }}>
          <span>Mumbai, India → <b style={{ fontWeight: 700, color: 'var(--fg)', fontVariantNumeric: 'tabular-nums' }}>{clock}</b></span>
          <span>✦ Status → <b style={{ fontWeight: 700, color: 'var(--fg)' }}>Open to work</b></span>
        </motion.div>

        {/* H1 — character reveal */}
        <motion.h1
          variants={fadeUp} initial="hidden" animate="visible" custom={0.1}
          style={{
            fontSize: 'clamp(56px, 7.5vw, 100px)',
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: '-0.025em',
            color: 'var(--fg)',
            marginBottom: 96,
          }}>
          Hi, this is Mohammed Izhan.
        </motion.h1>

        {/* Rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {[
            ['Currently →', ' Project Manager @ StackBox'],
            ['Previously →', ' Edgistify • Mindseed • DTDC'],
            ['Delivering →', ' Warehouse ops at scale 📦'],
          ].map(([label, value], i) => (
            <motion.div
              key={label}
              variants={fadeUp} initial="hidden" animate="visible" custom={0.2 + i * 0.1}
              style={{
                fontSize: 20, fontWeight: 400,
                color: 'var(--fg-2)',
                padding: '18px 0',
                borderBottom: '1px solid var(--line)',
              }}>
              {label}<b style={{ fontWeight: 700, color: 'var(--fg)' }}>{value}</b>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
