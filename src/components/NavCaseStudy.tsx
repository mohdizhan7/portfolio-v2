'use client';

import Link from 'next/link';
import NavShell from '@/components/NavShell';

export default function NavCaseStudy() {
  return (
    <NavShell
      // Over dark hero: white text; pill mode: dark text
      fg={(scrolled) => scrolled ? 'var(--fg)' : '#ffffff'}
    >
      {({ fg, menuOpen, close }) => ({
        left: (
          <Link href="/" style={{
            fontSize: 15, fontWeight: 700, letterSpacing: '-0.01em',
            whiteSpace: 'nowrap', color: fg,
            transition: 'color 0.4s',
          }}>
            Mohammed Izhan
          </Link>
        ),
        right: (
          <Link
            href="/"
            className="nav-links"
            style={{
              fontSize: 14, fontWeight: 600,
              color: fg,
              transition: 'opacity 0.2s, color 0.4s',
            }}
          >
            ← Back Home
          </Link>
        ),
        mobileMenu: (
          <Link
            href="/"
            onClick={close}
            style={{
              fontSize: 'clamp(32px, 9vw, 48px)',
              fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.15,
              color: 'var(--fg)',
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? 'none' : 'translateY(16px)',
              transition: 'opacity 0.4s cubic-bezier(0.16,1,0.3,1) 0.08s, transform 0.4s cubic-bezier(0.16,1,0.3,1) 0.08s',
            }}
          >
            ← Back Home
          </Link>
        ),
      })}
    </NavShell>
  );
}
