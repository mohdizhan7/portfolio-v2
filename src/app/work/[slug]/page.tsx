import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Nav from '@/components/Nav';
import { caseStudies, getCaseStudy } from '@/lib/caseStudies';

export function generateStaticParams() {
  return caseStudies.map(cs => ({ slug: cs.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) return {};
  return {
    title: `${cs.title} — Mohammed Izhan Shaikh`,
    description: cs.metaDescription,
    openGraph: {
      title: `${cs.title} — Mohammed Izhan Shaikh`,
      description: cs.metaDescription,
      url: `https://mohmmedizhan.com/work/${cs.slug}`,
      images: [{ url: cs.cover }],
    },
  };
}

const SECTIONS = [
  { number: '01', title: 'The Situation', key: 'situation' as const },
  { number: '02', title: 'The Call',      key: 'call'      as const },
  { number: '03', title: 'The Execution', key: 'execution' as const },
  { number: '04', title: 'The Impact',    key: 'impact'    as const },
  { number: '05', title: 'The Lesson',    key: 'lesson'    as const },
];

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();

  const currentIndex = caseStudies.findIndex(c => c.slug === cs.slug);
  const related = caseStudies.filter((_, i) => i !== currentIndex).slice(0, 2);

  return (
    <>
      <Nav />

      <main style={{ paddingTop: 80 }}>

        {/* ── Header ──────────────────────────────────────────────────── */}
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '80px clamp(24px, 4.5vw, 64px) 64px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
            <Link
              href="/#projects"
              style={{ fontSize: 13, color: 'var(--fg-3)', display: 'inline-flex', alignItems: 'center', gap: 6 }}
            >
              ← Projects
            </Link>
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

          <div style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--fg-3)', marginBottom: 16 }}>
            Case Study {cs.number}
          </div>

          <h1 style={{
            fontSize: 'clamp(40px, 6vw, 80px)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            marginBottom: 16,
          }}>
            {cs.title}
          </h1>

          <p style={{ fontSize: 20, color: 'var(--fg-2)', maxWidth: 640, lineHeight: 1.55, marginBottom: 48 }}>
            {cs.subtitle}
          </p>

          {/* Meta */}
          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: '16px 48px',
            borderTop: '1px solid var(--line)', paddingTop: 28,
          }}>
            {[['Client', cs.client], ['Role', cs.role], ['Timeline', cs.timeline], ['Scale', cs.scale]].map(([label, val]) => (
              <div key={label}>
                <div style={{ fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--fg-4)', marginBottom: 5 }}>
                  {label}
                </div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{val}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Cover image ─────────────────────────────────────────────── */}
        <div style={{ maxWidth: 1100, margin: '0 auto 80px', padding: '0 clamp(24px, 4.5vw, 64px)' }}>
          <div style={{
            position: 'relative', width: '100%',
            height: 'clamp(260px, 38vw, 520px)',
            borderRadius: 12, overflow: 'hidden',
            border: '1px solid var(--line)',
          }}>
            <Image src={cs.cover} alt={cs.title} fill style={{ objectFit: 'cover' }} priority sizes="(max-width: 1100px) 100vw, 1036px" />
          </div>
        </div>

        {/* ── Metrics row ─────────────────────────────────────────────── */}
        <div style={{
          maxWidth: 1100, margin: '0 auto 80px',
          padding: '0 clamp(24px, 4.5vw, 64px)',
          display: 'flex', gap: 'clamp(32px, 6vw, 80px)',
        }}>
          {cs.metrics.map(m => (
            <div key={m.label}>
              <div style={{
                fontSize: 'clamp(36px, 5vw, 56px)',
                fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1,
                marginBottom: 8,
              }}>
                {m.value}
              </div>
              <div style={{ fontSize: 13, color: 'var(--fg-3)', lineHeight: 1.4 }}>{m.label}</div>
            </div>
          ))}
        </div>

        {/* ── 5-section body ──────────────────────────────────────────── */}
        <div style={{ maxWidth: 720, margin: '0 auto', padding: '0 clamp(24px, 4.5vw, 64px) 120px' }}>
          {SECTIONS.map((s, i) => {
            const isLesson = s.key === 'lesson';
            const text = cs.sections[s.key];
            return (
              <div
                key={s.key}
                style={{
                  paddingTop: i === 0 ? 0 : 56,
                  paddingBottom: 56,
                  borderBottom: isLesson ? 'none' : '1px solid var(--line)',
                }}
              >
                {/* Section label */}
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  marginBottom: 20,
                }}>
                  <span style={{
                    fontSize: 11, fontWeight: 700,
                    letterSpacing: '0.15em', textTransform: 'uppercase',
                    color: 'var(--fg-4)',
                  }}>
                    {s.number}
                  </span>
                  <span style={{
                    fontSize: 11, fontWeight: 700,
                    letterSpacing: '0.15em', textTransform: 'uppercase',
                    color: 'var(--fg-3)',
                  }}>
                    {s.title}
                  </span>
                </div>

                {/* Body — lesson gets special treatment */}
                {isLesson ? (
                  <blockquote style={{
                    margin: 0,
                    padding: '24px 28px',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--line)',
                    borderLeft: '3px solid var(--fg)',
                    borderRadius: '0 8px 8px 0',
                  }}>
                    <p style={{
                      fontSize: 18,
                      fontWeight: 500,
                      lineHeight: 1.65,
                      color: 'var(--fg)',
                      fontStyle: 'italic',
                      margin: 0,
                    }}>
                      {text}
                    </p>
                  </blockquote>
                ) : (
                  <p style={{
                    fontSize: 17,
                    lineHeight: 1.8,
                    color: 'var(--fg-2)',
                    margin: 0,
                  }}>
                    {text}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* ── Related ─────────────────────────────────────────────────── */}
        {related.length > 0 && (
          <div style={{
            borderTop: '1px solid var(--line)',
            padding: 'clamp(48px, 6vw, 80px) clamp(24px, 4.5vw, 64px)',
            maxWidth: 1100, margin: '0 auto',
          }}>
            <div className="label" style={{ marginBottom: 28 }}>More case studies</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
              {related.map(r => (
                <Link key={r.slug} href={`/work/${r.slug}`} className="related-card">
                  <div style={{
                    position: 'relative', width: 56, height: 56, flexShrink: 0,
                    borderRadius: 6, overflow: 'hidden',
                    border: '1px solid var(--line)',
                  }}>
                    <Image src={r.cover} alt={r.title} fill style={{ objectFit: 'cover' }} sizes="56px" />
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>{r.title}</div>
                    <div style={{ fontSize: 12, color: 'var(--fg-3)' }}>{r.subtitle}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </main>
    </>
  );
}
