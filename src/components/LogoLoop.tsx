'use client';

import { useEffect, useRef, useCallback } from 'react';
import type { ReactNode, CSSProperties } from 'react';
import './LogoLoop.css';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface LogoItem {
  /** URL of the logo image */
  src?: string;
  /** Alt text for image */
  alt?: string;
  /** Custom React node (used instead of src) */
  node?: ReactNode;
  /** Wraps the item in a link */
  href?: string;
}

interface LogoLoopProps {
  logos: LogoItem[];
  /** px/s — higher = faster */
  speed?: number;
  pauseOnHover?: boolean;
  fade?: boolean;
  /** Override CSS var --logoloop-gap (px) */
  gap?: number;
  /** Override CSS var --logoloop-logoHeight (px) */
  logoHeight?: number;
  style?: CSSProperties;
  className?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function LogoLoop({
  logos,
  speed = 50,
  pauseOnHover = true,
  fade = true,
  gap,
  logoHeight,
  style,
  className = '',
}: LogoLoopProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(0);
  const rafRef = useRef<number>(0);
  const pausedRef = useRef(false);
  const lastTimeRef = useRef<number | null>(null);

  // Duplicate logos for seamless loop
  const items = [...logos, ...logos];

  const animate = useCallback((time: number) => {
    if (lastTimeRef.current === null) lastTimeRef.current = time;
    const delta = time - lastTimeRef.current;
    lastTimeRef.current = time;

    if (!pausedRef.current && trackRef.current) {
      const track = trackRef.current;
      const totalWidth = track.scrollWidth / 2;

      if (totalWidth === 0) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      const step = (speed * delta) / 1000;
      posRef.current += step;

      // Wrap around at the half-point so it loops seamlessly
      if (posRef.current >= totalWidth) posRef.current -= totalWidth;

      track.style.transform = `translate3d(${-posRef.current}px, 0, 0)`;
    }

    rafRef.current = requestAnimationFrame(animate);
  }, [speed]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [animate]);

  // Build class names
  const classes = [
    'logoloop',
    fade ? 'logoloop--fade' : '',
    className,
  ].filter(Boolean).join(' ');

  // CSS custom property overrides
  const cssVars: CSSProperties = {
    ...(gap !== undefined && { '--logoloop-gap': `${gap}px` } as CSSProperties),
    ...(logoHeight !== undefined && { '--logoloop-logoHeight': `${logoHeight}px` } as CSSProperties),
  };

  return (
    <div
      ref={containerRef}
      className={classes}
      style={{ ...cssVars, ...style }}
      onMouseEnter={pauseOnHover ? () => { pausedRef.current = true; } : undefined}
      onMouseLeave={pauseOnHover ? () => { pausedRef.current = false; lastTimeRef.current = null; } : undefined}
    >
      <div ref={trackRef} className="logoloop__track">
        <ul className="logoloop__list" aria-hidden="false">
          {items.map((logo, i) => (
            <li key={i} className="logoloop__item">
              {logo.href ? (
                <a
                  href={logo.href}
                  className="logoloop__link"
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={i >= logos.length ? -1 : 0}
                >
                  {logo.node
                    ? <span className="logoloop__node">{logo.node}</span>
                    : logo.src
                      ? <img src={logo.src} alt={logo.alt ?? ''} loading="lazy" />
                      : null}
                </a>
              ) : logo.node ? (
                <span className="logoloop__node">{logo.node}</span>
              ) : logo.src ? (
                <img src={logo.src} alt={logo.alt ?? ''} loading="lazy" />
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
