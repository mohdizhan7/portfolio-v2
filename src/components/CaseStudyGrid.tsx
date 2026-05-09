'use client';

import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { m, useInView } from 'framer-motion';
import { caseStudies } from '@/lib/caseStudies';
import { setFromData } from '@/lib/transitionStore';

function ProjectCard({ cs, index }: { cs: typeof caseStudies[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const router = useRouter();

  // Refs for the image container and the custom cursor element
  const imageRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  /* ── Custom cursor: direct DOM updates for 60fps tracking ── */
  const onImageMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cursorRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    cursorRef.current.style.left = `${e.clientX - rect.left}px`;
    cursorRef.current.style.top  = `${e.clientY - rect.top}px`;
  };

  const onImageMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.cursor = 'none';
    if (cursorRef.current) {
      cursorRef.current.style.opacity   = '1';
      cursorRef.current.style.transform = 'translate(-50%, -50%) scale(1)';
    }
  };

  const onImageMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.cursor = '';
    if (cursorRef.current) {
      cursorRef.current.style.opacity   = '0';
      cursorRef.current.style.transform = 'translate(-50%, -50%) scale(0.5)';
    }
  };

  /* ── Click: capture image rect → store → navigate ── */
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (imageRef.current) {
      const r = imageRef.current.getBoundingClientRect();
      setFromData({ top: r.top, right: r.right, bottom: r.bottom, left: r.left });
    }
    router.push(`/work/${cs.slug}`);
  };

  return (
    <m.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
    >
      <Link
        href={`/work/${cs.slug}`}
        className="project-card-inner"
        onClick={handleClick}
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--line)',
          borderRadius: 16,
          overflow: 'hidden',
          textDecoration: 'none',
          color: 'var(--fg)',
          transition: 'border-color 0.25s, box-shadow 0.25s',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = 'rgba(10,10,10,0.2)';
          e.currentTarget.style.boxShadow   = '0 8px 32px rgba(0,0,0,0.08)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = 'var(--line)';
          e.currentTarget.style.boxShadow   = 'none';
        }}
      >
        {/* ── Left: text content ───────────────────── */}
        <div style={{ padding: 'clamp(20px, 2vw, 28px)', display: 'flex', flexDirection: 'column' }}>

          {/* Row 1: number + status */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--fg-4)', letterSpacing: '0.04em' }}>
              {cs.number}
            </span>
            {cs.status && (
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 5,
                fontSize: 10, fontWeight: 700, letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#d97706',
                background: 'rgba(217,119,6,0.08)',
                border: '1px solid rgba(217,119,6,0.22)',
                borderRadius: 20, padding: '3px 9px',
              }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#d97706', flexShrink: 0 }} />
                {cs.status}
              </span>
            )}
          </div>

          {/* Row 2: client / year */}
          <p style={{ fontSize: 13, color: 'var(--fg-3)', marginBottom: 6, lineHeight: 1.4 }}>
            {cs.client} / {cs.year}
          </p>

          {/* Row 3: title */}
          <h3 style={{
            fontSize: 'clamp(18px, 1.8vw, 26px)',
            fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1.15, marginBottom: 12,
          }}>
            {cs.title}
          </h3>

          {/* Row 4: tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 'auto' }}>
            {cs.tags.map(tag => (
              <span key={tag} style={{
                fontSize: 10, fontWeight: 600, letterSpacing: '0.1em',
                textTransform: 'uppercase',
                padding: '3px 8px',
                border: '1px solid var(--line)',
                borderRadius: 4, color: 'var(--fg-3)',
              }}>
                {tag}
              </span>
            ))}
          </div>

          {/* Row 5: metrics */}
          <div style={{
            display: 'flex', gap: 'clamp(16px, 2.5vw, 28px)',
            paddingTop: 16, marginTop: 16, borderTop: '1px solid var(--line)',
          }}>
            {cs.metrics.map(m => (
              <div key={m.label}>
                <div style={{
                  fontSize: 'clamp(16px, 1.4vw, 20px)',
                  fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: 4,
                }}>
                  {m.value}
                </div>
                <div style={{ fontSize: 11, color: 'var(--fg-3)', lineHeight: 1.45, maxWidth: 120 }}>
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right: image with custom cursor ──────── */}
        <div
          ref={imageRef}
          className="project-card-image"
          style={{ position: 'relative', overflow: 'hidden' }}
          onMouseMove={onImageMouseMove}
          onMouseEnter={onImageMouseEnter}
          onMouseLeave={onImageMouseLeave}
        >
          <Image
            className="project-card-img"
            src={cs.cover}
            alt={cs.title}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, 55vw"
          />

          {/* Custom tracking cursor — white circle with arrow */}
          <div
            ref={cursorRef}
            style={{
              position: 'absolute',
              top: 0, left: 0,
              width: 60, height: 60,
              borderRadius: '50%',
              background: '#ffffff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              /* start hidden + small; enter/leave toggle via direct style mutations */
              transform: 'translate(-50%, -50%) scale(0.5)',
              opacity: 0,
              transition: 'opacity 0.22s ease, transform 0.28s cubic-bezier(0.16,1,0.3,1)',
              pointerEvents: 'none',
              zIndex: 10,
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="#0a0a0a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="7" y1="17" x2="17" y2="7"/>
              <polyline points="7 7 17 7 17 17"/>
            </svg>
          </div>
        </div>
      </Link>
    </m.div>
  );
}

export default function CaseStudyGrid() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' });

  return (
    <section id="projects" style={{ padding: '80px clamp(24px, 4.5vw, 64px) 60px' }}>
      <div style={{ maxWidth: 1100, width: '100%', margin: '0 auto' }}>
        <m.div
          ref={headerRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="label" style={{ marginBottom: 16 }}>Selected Projects</div>
          <h2 style={{ fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.05 }}>
            Projects.
          </h2>
        </m.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 64 }}>
          {caseStudies.map((cs, i) => (
            <ProjectCard key={cs.slug} cs={cs} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
