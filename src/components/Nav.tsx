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
          <a href="/resume/Resume_Izhan.pdf" target="_blank" rel="noreferrer"
            style={{ color: 'var(--fg)', display: 'flex', alignItems: 'center', transition: 'opacity 0.2s' }}
            title="View CV">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="12" y1="11" x2="12" y2="17"/>
              <line x1="9" y1="14" x2="15" y2="14"/>
            </svg>
          </a>
          {/* LinkedIn */}
          <a href="https://www.linkedin.com/in/mohmmedizhan/" target="_blank" rel="noreferrer"
            style={{ color: 'var(--fg)', display: 'flex', alignItems: 'center', transition: 'opacity 0.2s' }}
            title="LinkedIn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"/>
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
