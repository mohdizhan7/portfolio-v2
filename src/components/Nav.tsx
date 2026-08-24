'use client';

import Link from 'next/link';
import NavShell from '@/components/NavShell';

export default function Nav() {
  const fg = 'var(--fg)'; // home hero is light, always dark text

  return (
    <NavShell
      fg={fg}
      animateIn
    >
      {({ menuOpen, close }) => ({
        left: (
          <>
            <Link href="/" style={{
              fontSize: 15, fontWeight: 700, letterSpacing: '-0.01em',
              whiteSpace: 'nowrap', color: fg,
            }}>
              Mohammed Izhan
            </Link>

            <div className="nav-links" style={{
              display: 'flex', gap: 32,
              fontSize: 14, fontWeight: 600, color: fg,
            }}>
              <Link href="/#work"     style={{ color: fg, transition: 'opacity 0.2s' }}>Work</Link>
              <Link href="/about"    style={{ color: fg, transition: 'opacity 0.2s' }}>About</Link>
              <Link href="/#projects" style={{ color: fg, transition: 'opacity 0.2s' }}>Projects</Link>
              <Link href="/#contact"  style={{ color: fg, transition: 'opacity 0.2s' }}>Contact</Link>
            </div>
          </>
        ),
        right: (
          <div className="nav-icons" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <a href="/resume.pdf" target="_blank" rel="noreferrer"
              style={{ color: fg, display: 'flex', alignItems: 'center', transition: 'opacity 0.2s' }}
              title="View CV">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <path d="M8.5,12 A3,3 0 1,0 8.5,18"/>
                <polyline points="12,12 14.5,18 17,12"/>
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/mohmmedizhan/" target="_blank" rel="noreferrer"
              style={{ color: fg, display: 'flex', alignItems: 'center', transition: 'opacity 0.2s' }}
              title="LinkedIn">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6.94 5a2 2 0 1 1-4-.002 2 2 0 0 1 4 .002zM7 8.48H3V21h4V8.48zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68z"/>
              </svg>
            </a>
          </div>
        ),
        mobileMenu: (
          <>
            <nav style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              {(['Work', 'About', 'Projects', 'Contact'] as const).map((label, i) => (
                <Link
                  key={label}
                  href={label === 'About' ? '/about' : `/#${label.toLowerCase()}`}
                  onClick={close}
                  style={{
                    fontSize: 'clamp(32px, 9vw, 48px)',
                    fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.15,
                    color: 'var(--fg)', display: 'block', padding: '8px 0',
                    opacity: menuOpen ? 1 : 0,
                    transform: menuOpen ? 'none' : 'translateY(16px)',
                    transition: `opacity 0.4s cubic-bezier(0.16,1,0.3,1) ${0.08 + i * 0.06}s, transform 0.4s cubic-bezier(0.16,1,0.3,1) ${0.08 + i * 0.06}s`,
                  }}
                >
                  {label}
                </Link>
              ))}
            </nav>

            <div style={{
              position: 'absolute', bottom: 48, left: '50%',
              transform: menuOpen ? 'translateX(-50%)' : 'translateX(-50%) translateY(12px)',
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
          </>
        ),
      })}
    </NavShell>
  );
}
