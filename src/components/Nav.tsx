'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [onHero, setOnHero] = useState(true);

  useEffect(() => {
    const check = () => setOnHero(window.scrollY < window.innerHeight * 0.85);
    check();
    window.addEventListener('scroll', check, { passive: true });
    return () => window.removeEventListener('scroll', check);
  }, []);

  // Slight light tint on hero so the bottom border is visible against the gradient
  const fg       = 'var(--fg)';
  const bg       = onHero ? 'transparent' : 'rgba(232,232,228,0.88)';
  const backdrop = onHero ? 'none' : 'blur(14px)';
  const line     = onHero ? 'rgba(0,0,0,0.55)' : 'var(--line)';

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0,
        zIndex: 100,
        padding: '0 clamp(20px, 4.5vw, 64px)',
        background: bg,
        backdropFilter: backdrop,
        WebkitBackdropFilter: backdrop,
        borderBottom: `1px solid ${line}`,
        transition: 'background 0.4s, border-color 0.4s, backdrop-filter 0.4s',
      }}>
        {/* Inner container — same max-width as page sections */}
        <div style={{
          maxWidth: 1100, width: '100%', margin: '0 auto',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '20px 0',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 48 }}>
            <Link href="/" style={{ fontSize: 15, fontWeight: 700, letterSpacing: '-0.01em', whiteSpace: 'nowrap', color: fg, transition: 'color 0.4s' }}>
              Mohammed Izhan
            </Link>
            <div style={{ display: 'flex', alignItems: 'center', gap: 32, fontSize: 14, fontWeight: 600, color: fg, transition: 'color 0.4s' }} className="nav-links">
              <Link href="#work" style={{ transition: 'opacity 0.2s', color: fg }}>Work</Link>
              <Link href="/about" style={{ transition: 'opacity 0.2s', color: fg }}>About</Link>
              <Link href="#projects" style={{ transition: 'opacity 0.2s', color: fg }}>Projects</Link>
              <Link href="#contact" style={{ transition: 'opacity 0.2s', color: fg }}>Contact</Link>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div className="nav-icons" style={{ alignItems: 'center', gap: 12 }}>
              <a href="/resume.pdf" target="_blank" rel="noreferrer"
                style={{ color: fg, display: 'flex', alignItems: 'center', transition: 'opacity 0.2s, color 0.4s' }}
                title="View CV">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <path d="M8.5,12 A3,3 0 1,0 8.5,18"/>
                  <polyline points="12,12 14.5,18 17,12"/>
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/mohmmedizhan/" target="_blank" rel="noreferrer"
                style={{ color: fg, display: 'flex', alignItems: 'center', transition: 'opacity 0.2s, color 0.4s' }}
                title="LinkedIn">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6.94 5a2 2 0 1 1-4-.002 2 2 0 0 1 4 .002zM7 8.48H3V21h4V8.48zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68z"/>
                </svg>
              </a>
            </div>
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
              <span style={{
                width: 26, height: 2, background: fg, display: 'block', borderRadius: 1,
                transition: 'transform 0.35s cubic-bezier(0.16,1,0.3,1), opacity 0.2s, background 0.4s',
                transform: menuOpen ? 'translateY(9px) rotate(45deg)' : 'none',
              }} />
              <span style={{
                width: 26, height: 2, background: fg, display: 'block', borderRadius: 1,
                transition: 'opacity 0.2s, background 0.4s',
                opacity: menuOpen ? 0 : 1,
              }} />
              <span style={{
                width: 26, height: 2, background: fg, display: 'block', borderRadius: 1,
                transition: 'transform 0.35s cubic-bezier(0.16,1,0.3,1), opacity 0.2s, background 0.4s',
                transform: menuOpen ? 'translateY(-9px) rotate(-45deg)' : 'none',
              }} />
            </button>
          </div>
        </div>
      </nav>

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
        <nav style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          {(['Work','About','Projects','Contact'] as const).map((label, i) => (
            <Link
              key={label}
              href={label === 'About' ? '/about' : `#${label.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              style={{
                fontSize: 'clamp(32px, 9vw, 48px)',
                fontWeight: 700,
                letterSpacing: '-0.03em',
                lineHeight: 1.15,
                color: 'var(--fg)',
                textDecoration: 'none',
                display: 'block',
                padding: '8px 0',
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? 'none' : 'translateY(16px)',
                transition: `opacity 0.4s cubic-bezier(0.16,1,0.3,1) ${0.08 + i * 0.06}s, transform 0.4s cubic-bezier(0.16,1,0.3,1) ${0.08 + i * 0.06}s`,
              }}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Social icons pinned to bottom */}
        <div style={{
          position: 'absolute', bottom: 48, left: '50%', transform: menuOpen ? 'translateX(-50%)' : 'translateX(-50%) translateY(12px)',
          display: 'flex', gap: 28,
          opacity: menuOpen ? 1 : 0,
          transition: 'opacity 0.4s cubic-bezier(0.16,1,0.3,1) 0.32s, transform 0.4s cubic-bezier(0.16,1,0.3,1) 0.32s',
        }}>
          <a href="/resume.pdf" target="_blank" rel="noreferrer"
            style={{ color: 'var(--fg)', display: 'flex', alignItems: 'center' }} title="CV">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <path d="M8.5,12 A3,3 0 1,0 8.5,18"/>
              <polyline points="12,12 14.5,18 17,12"/>
            </svg>
          </a>
          <a href="https://www.linkedin.com/in/mohmmedizhan/" target="_blank" rel="noreferrer"
            style={{ color: 'var(--fg)', display: 'flex', alignItems: 'center' }} title="LinkedIn">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6.94 5a2 2 0 1 1-4-.002 2 2 0 0 1 4 .002zM7 8.48H3V21h4V8.48zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68z"/>
            </svg>
          </a>
        </div>
      </div>
    </>
  );
}
