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

        {/* ── Full-bleed hero image ────────────────────────────────────── */}
        <div style={{ position: 'relative', width: '100%', height: 'clamp(280px, 44vw, 580px)' }}>
          <Image
            src={cs.cover}
            alt={cs.title}
            fill
            priority
            style={{ objectFit: 'cover' }}
            sizes="100vw"
          />
          {/* subtle bottom fade so title reads clean */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, transparent 55%, var(--bg) 100%)',
          }} />
        </div>

        {/* ── Title block ─────────────────────────────────────────────── */}
        <div style={{
          maxWidth: 800,
          margin: '0 auto',
          padding: '0 clamp(24px, 4.5vw, 48px)',
          textAlign: 'center',
        }}>
          {/* breadcrumb + status */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: 12, marginBottom: 32,
          }}>
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

          <p style={{
            fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase',
            color: 'var(--fg-4)', marginBottom: 16,
          }}>
            Case Study {cs.number}
          </p>

          <h1 style={{
            fontSize: 'clamp(36px, 5.5vw, 72px)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            lineHeight: 1.06,
            marginBottom: 20,
          }}>
            {cs.title}
          </h1>

          <p style={{
            fontSize: 'clamp(16px, 2vw, 20px)',
            color: 'var(--fg-2)',
            lineHeight: 1.55,
            marginBottom: 48,
          }}>
            {cs.subtitle}
          </p>

          {/* Meta strip */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '12px 0',
            borderTop: '1px solid var(--line)',
            borderBottom: '1px solid var(--line)',
            padding: '24px 0',
            marginBottom: 72,
          }}>
            {[['Client', cs.client], ['Role', cs.role], ['Timeline', cs.timeline], ['Scale', cs.scale]].map(([label, val], i, arr) => (
              <div key={label} style={{
                textAlign: 'center',
                padding: '0 clamp(16px, 3vw, 40px)',
                borderRight: i < arr.length - 1 ? '1px solid var(--line)' : 'none',
              }}>
                <div style={{
                  fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase',
                  color: 'var(--fg-4)', marginBottom: 6,
                }}>
                  {label}
                </div>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--fg)' }}>{val}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Metrics row ─────────────────────────────────────────────── */}
        <div style={{
          maxWidth: 900,
          margin: '0 auto 96px',
          padding: '0 clamp(24px, 4.5vw, 48px)',
          display: 'flex',
          flexWrap: 'wrap',
          gap: 'clamp(32px, 5vw, 0px)',
          justifyContent: 'space-around',
        }}>
          {cs.metrics.map(m => (
            <div key={m.label} style={{ textAlign: 'center', flex: '1 1 160px' }}>
              <div style={{
                fontSize: 'clamp(40px, 5.5vw, 64px)',
                fontWeight: 700,
                letterSpacing: '-0.035em',
                lineHeight: 1,
                marginBottom: 10,
              }}>
                {m.value}
              </div>
              <div style={{
                fontSize: 13,
                color: 'var(--fg-3)',
                lineHeight: 1.4,
                maxWidth: 160,
                margin: '0 auto',
              }}>
                {m.label}
              </div>
            </div>
          ))}
        </div>

        {/* ── 5-section body ──────────────────────────────────────────── */}
        <div style={{
          maxWidth: 760,
          margin: '0 auto',
          padding: '0 clamp(24px, 4.5vw, 48px) 140px',
        }}>
          {SECTIONS.map((s, i) => {
            const isLesson = s.key === 'lesson';
            const text = cs.sections[s.key];
            // Support multi-paragraph content (separated by \n\n)
            const paragraphs = text.split('\n\n').filter(Boolean);

            return (
              <div
                key={s.key}
                style={{
                  paddingTop: i === 0 ? 0 : 80,
                  paddingBottom: isLesson ? 0 : 80,
                  borderBottom: isLesson ? 'none' : '1px solid var(--line)',
                }}
              >
                {/* Section anchor label */}
                <div style={{ marginBottom: 28 }}>
                  <span style={{
                    fontSize: 'clamp(52px, 7vw, 80px)',
                    fontWeight: 700,
                    letterSpacing: '-0.04em',
                    color: 'var(--line)',
                    lineHeight: 1,
                    display: 'block',
                    marginBottom: 4,
                  }}>
                    {s.number}
                  </span>
                  <span style={{
                    fontSize: 13,
                    fontWeight: 700,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'var(--fg-3)',
                  }}>
                    {s.title}
                  </span>
                </div>

                {/* Body */}
                {isLesson ? (
                  <blockquote style={{
                    margin: 0,
                    padding: '28px 32px',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--line)',
                    borderLeft: '3px solid var(--fg)',
                    borderRadius: '0 8px 8px 0',
                  }}>
                    {paragraphs.map((para, pi) => (
                      <p key={pi} style={{
                        fontSize: 19,
                        fontWeight: 500,
                        lineHeight: 1.65,
                        color: 'var(--fg)',
                        fontStyle: 'italic',
                        margin: pi > 0 ? '16px 0 0' : 0,
                      }}>
                        {para}
                      </p>
                    ))}
                  </blockquote>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    {paragraphs.map((para, pi) => (
                      <p key={pi} style={{
                        fontSize: 17,
                        lineHeight: 1.85,
                        color: 'var(--fg-2)',
                        margin: 0,
                      }}>
                        {para}
                      </p>
                    ))}
                  </div>
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
