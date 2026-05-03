'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0,
        zIndex: 100, padding: '20px 48px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        background: 'transparent',
        borderBottom: '1px solid var(--fg-2)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 48 }}>
          <Link href="/" style={{ fontSize: 15, fontWeight: 700, letterSpacing: '-0.01em', whiteSpace: 'nowrap' }}>
            Mohammed Izhan
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: 32, fontSize: 14, fontWeight: 600 }} className="nav-links">
            <Link href="#work" style={{ transition: 'opacity 0.2s' }}>Work</Link>
            <Link href="/about" style={{ transition: 'opacity 0.2s' }}>About</Link>
            <Link href="#projects" style={{ transition: 'opacity 0.2s' }}>Projects</Link>
            <Link href="#contact" style={{ transition: 'opacity 0.2s' }}>Contact</Link>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* CV */}
          <a href="/resume.pdf" target="_blank" rel="noreferrer"
            style={{ color: 'var(--fg)', display: 'flex', alignItems: 'center', transition: 'opacity 0.2s' }}
            title="View CV">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <path d="M8.5,12 A3,3 0 1,0 8.5,18"/>
              <polyline points="12,12 14.5,18 17,12"/>
            </svg>
          </a>
          {/* LinkedIn */}
          <a href="https://www.linkedin.com/in/mohmmedizhan/" target="_blank" rel="noreferrer"
            style={{ color: 'var(--fg)', display: 'flex', alignItems: 'center', transition: 'opacity 0.2s' }}
            title="LinkedIn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6.94 5a2 2 0 1 1-4-.002 2 2 0 0 1 4 .002zM7 8.48H3V21h4V8.48zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68z"/>
            </svg>
          </a>
          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Menu"
            style={{
              flexDirection: 'column', gap: 6,
              background: 'none', border: 'none', cursor: 'pointer', padding: 8,
            }}
            className="hamburger"
          >
            <span style={{ width: 24, height: 2, background: 'var(--fg)', display: 'block', transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)' }} />
            <span style={{ width: 24, height: 2, background: 'var(--fg)', display: 'block', transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)' }} />
            <span style={{ width: 24, height: 2, background: 'var(--fg)', display: 'block', transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)' }} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: 'fixed', inset: 0,
          background: 'var(--bg)',
          zIndex: 99,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: 48,
          fontSize: 32, fontWeight: 700,
        }}>
          <button onClick={() => setMenuOpen(false)} style={{ position: 'absolute', top: 24, right: 24, background: 'none', border: 'none', fontSize: 24, cursor: 'pointer', color: 'var(--fg)' }}>✕</button>
          {(['About','Work','Projects','Contact'] as const).map(label => (
            <Link key={label} href={label === 'About' ? '/about' : `#${label.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}>
              {label}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
