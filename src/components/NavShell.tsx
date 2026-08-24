'use client';

import { useState, useEffect, type ReactNode } from 'react';
import { m } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1] as const;

type NavShellProps = {
  fg: string | ((scrolled: boolean) => string);
  animateIn?: boolean;
  children: (ctx: { fg: string; menuOpen: boolean; close: () => void }) => {
    left: ReactNode;
    right: ReactNode;
    mobileMenu: ReactNode;
  };
};

export default function NavShell({ fg, animateIn = false, children }: NavShellProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const check = () => setScrolled(window.scrollY > 60);
    check();
    window.addEventListener('scroll', check, { passive: true });
    return () => window.removeEventListener('scroll', check);
  }, []);

  const resolvedFg = typeof fg === 'function' ? fg(scrolled) : fg;
  const close = () => setMenuOpen(false);
  const { left, right, mobileMenu } = children({ fg: resolvedFg, menuOpen, close });

  return (
    <>
      {/* ── Outer: provides the floating top-offset padding when scrolled ── */}
      <div style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 100,
        padding: scrolled ? '12px clamp(12px, 2vw, 24px)' : '0',
        pointerEvents: 'none',
        transition: 'padding 0.45s cubic-bezier(0.16,1,0.3,1)',
      }}>
        {/* ── Inner: transitions from full-width bar → centered pill ── */}
        <m.nav
          initial={animateIn ? { opacity: 0, y: -10 } : false}
          animate={animateIn ? { opacity: 1, y: 0 } : undefined}
          transition={animateIn ? { duration: 0.5, ease: EASE, delay: 0.6 } : undefined}
          style={{
            pointerEvents: 'auto',
            maxWidth: scrolled ? 1140 : 9999,
            margin: '0 auto',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: scrolled ? '16px 32px' : '20px clamp(20px, 4.5vw, 64px)',
            background: scrolled ? 'rgba(255,255,255,0.72)' : 'transparent',
            backdropFilter: scrolled ? 'blur(24px)' : 'none',
            WebkitBackdropFilter: scrolled ? 'blur(24px)' : 'none',
            borderRadius: scrolled ? 100 : 0,
            border: scrolled ? '1px solid rgba(0,0,0,0.08)' : '1px solid transparent',
            boxShadow: scrolled ? '0 2px 24px rgba(0,0,0,0.07)' : 'none',
            transition: [
              'max-width 0.45s cubic-bezier(0.16,1,0.3,1)',
              'padding 0.45s cubic-bezier(0.16,1,0.3,1)',
              'background 0.4s',
              'border-radius 0.45s cubic-bezier(0.16,1,0.3,1)',
              'border-color 0.4s',
              'box-shadow 0.4s',
            ].join(', '),
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
            {left}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {right}

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(v => !v)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              style={{
                display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 7,
                background: 'none', border: 'none', cursor: 'pointer', padding: 8,
                width: 44, height: 44,
              }}
              className="hamburger"
            >
              {([
                menuOpen ? 'translateY(9px) rotate(45deg)' : 'none',
                'none',
                menuOpen ? 'translateY(-9px) rotate(-45deg)' : 'none',
              ] as const).map((transform, i) => (
                <span key={i} style={{
                  width: 26, height: 2, background: resolvedFg, display: 'block', borderRadius: 1,
                  transition: 'transform 0.35s cubic-bezier(0.16,1,0.3,1), opacity 0.2s, background 0.4s',
                  transform,
                  opacity: i === 1 && menuOpen ? 0 : 1,
                }} />
              ))}
            </button>
          </div>
        </m.nav>
      </div>

      {/* Mobile menu overlay */}
      <div style={{
        position: 'fixed', inset: 0,
        background: 'var(--bg)',
        zIndex: 99,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        pointerEvents: menuOpen ? 'auto' : 'none',
        opacity: menuOpen ? 1 : 0,
        transform: menuOpen ? 'none' : 'translateY(-12px)',
        transition: 'opacity 0.35s cubic-bezier(0.16,1,0.3,1), transform 0.35s cubic-bezier(0.16,1,0.3,1)',
      }}>
        {mobileMenu}
      </div>
    </>
  );
}
