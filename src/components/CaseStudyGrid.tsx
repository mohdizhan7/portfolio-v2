'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { m, useInView } from 'framer-motion';
import { caseStudies } from '@/lib/caseStudies';

function ProjectCard({ cs, index }: { cs: typeof caseStudies[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <m.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
    >
      <Link
        href={`/work/${cs.slug}`}
        className="project-card-inner"
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--line)',
          borderRadius: 16,
          overflow: 'hidden',
          textDecoration: 'none',
          color: 'var(--fg)',
          transition: 'border-color 0.3s',
        }}
        onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--fg-4)')}
        onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--line)')}
      >
        {/* Left: text content */}
        <div style={{
          padding: 'clamp(28px, 4vw, 48px)',
          display: 'flex',
          flexDirection: 'column',
          gap: 0,
        }}>
          {/* Number + optional status badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 }}>
            <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--fg-4)', letterSpacing: '0.04em' }}>
              {cs.number}
            </span>
            {cs.status && (
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                fontSize: 11, fontWeight: 700, letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#d97706',
                background: 'rgba(217,119,6,0.1)',
                border: '1px solid rgba(217,119,6,0.25)',
                borderRadius: 20, padding: '3px 10px',
              }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#d97706', flexShrink: 0 }} />
                {cs.status}
              </span>
            )}
          </div>

          {/* Client / Year */}
          <p style={{
            fontSize: 13, color: 'var(--fg-3)',
            letterSpacing: '0.02em', marginBottom: 14,
          }}>
            {cs.client} / {cs.year}
          </p>

          {/* Title */}
          <h3 style={{
            fontSize: 'clamp(22px, 2.6vw, 36px)',
            fontWeight: 700,
            letterSpacing: '-0.025em',
            lineHeight: 1.15,
            marginBottom: 20,
          }}>
            {cs.title}
          </h3>

          {/* Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 'auto' }}>
            {cs.tags.map(tag => (
              <span key={tag} style={{
                fontSize: 11, fontWeight: 600, letterSpacing: '0.08em',
                textTransform: 'uppercase',
                padding: '4px 10px',
                border: '1px solid var(--line)',
                borderRadius: 4,
                color: 'var(--fg-3)',
              }}>
                {tag}
              </span>
            ))}
          </div>

          {/* Metrics */}
          <div style={{
            display: 'flex', gap: 'clamp(24px, 4vw, 48px)',
            paddingTop: 32, marginTop: 32,
            borderTop: '1px solid var(--line)',
          }}>
            {cs.metrics.map(m => (
              <div key={m.label}>
                <div style={{
                  fontSize: 'clamp(22px, 2.8vw, 34px)',
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  lineHeight: 1,
                  marginBottom: 6,
                }}>
                  {m.value}
                </div>
                <div style={{ fontSize: 12, color: 'var(--fg-3)', lineHeight: 1.4 }}>
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: image */}
        <div className="project-card-image" style={{ position: 'relative', overflow: 'hidden' }}>
          <Image
            src={cs.cover}
            alt={cs.title}
            fill
            style={{ objectFit: 'cover', transition: 'transform 0.6s cubic-bezier(0.4,0,0.2,1)' }}
            sizes="(max-width: 768px) 100vw, 58vw"
            onMouseEnter={e => ((e.target as HTMLImageElement).style.transform = 'scale(1.04)')}
            onMouseLeave={e => ((e.target as HTMLImageElement).style.transform = 'scale(1)')}
          />
          {/* Arrow CTA */}
          <div style={{
            position: 'absolute', bottom: 20, right: 20,
            width: 40, height: 40,
            background: 'rgba(255,255,255,0.15)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.3)',
            borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
    <section id="projects" style={{ padding: '80px 64px 60px' }}>
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

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 64 }}>
          {caseStudies.map((cs, i) => <ProjectCard key={cs.slug} cs={cs} index={i} />)}
        </div>
      </div>
    </section>
  );
}
