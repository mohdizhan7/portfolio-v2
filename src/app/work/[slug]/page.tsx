import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import NavCaseStudy from '@/components/NavCaseStudy';
import CaseStudyHero from '@/components/CaseStudyHero';
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

/* ── Backlog visual components ──────────────────────────────────────── */

function SituationMetrics() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{
        padding: '28px 32px',
        background: 'var(--bg-card)',
        border: '1px solid var(--line)',
        borderRadius: 12,
      }}>
        <div style={{
          fontSize: 11, letterSpacing: '0.18em',
          textTransform: 'uppercase', color: 'var(--fg-4)', marginBottom: 16,
        }}>
          On-Time Delivery — Crisis Start
        </div>
        <div style={{
          fontSize: 'clamp(52px, 6vw, 72px)',
          fontWeight: 700, color: '#ef4444', lineHeight: 1, marginBottom: 16,
        }}>
          10%
        </div>
        <div style={{
          height: 6, background: 'rgba(239,68,68,0.12)',
          borderRadius: 4, marginBottom: 16,
        }}>
          <div style={{ height: '100%', width: '10%', background: '#ef4444', borderRadius: 4 }} />
        </div>
        <div style={{ fontSize: 13, color: 'var(--fg-3)', lineHeight: 1.65 }}>
          Staff had returned to their hometowns overnight. Shipments stacking on the floor
          with no data in the system.
        </div>
      </div>

      <div style={{
        padding: '28px 32px',
        background: 'var(--bg-card)',
        border: '1px solid var(--line)',
        borderRadius: 12,
      }}>
        <div style={{
          fontSize: 11, letterSpacing: '0.18em',
          textTransform: 'uppercase', color: 'var(--fg-4)', marginBottom: 16,
        }}>
          Shipments Backlogged
        </div>
        <div style={{
          fontSize: 'clamp(52px, 6vw, 72px)',
          fontWeight: 700, lineHeight: 1, marginBottom: 12,
        }}>
          150K
        </div>
        <div style={{ fontSize: 13, color: 'var(--fg-3)', lineHeight: 1.65 }}>
          SLA penalties mounting. No directive from above. No playbook. The call was mine.
        </div>
      </div>
    </div>
  );
}

function CallInsight() {
  return (
    <div style={{ borderLeft: '3px solid var(--fg)', paddingLeft: 32, paddingTop: 4 }}>
      <div style={{
        fontSize: 11, letterSpacing: '0.18em',
        textTransform: 'uppercase', color: 'var(--fg-4)', marginBottom: 24,
      }}>
        The Insight
      </div>
      <p style={{
        fontSize: 19, fontWeight: 600, lineHeight: 1.6,
        color: 'var(--fg)', margin: '0 0 24px',
      }}>
        If we could find vendors who already had authorised access to restricted government
        localities, we could deliver where no conventional last-mile network could reach.
      </p>
      <p style={{ fontSize: 14, color: 'var(--fg-3)', lineHeight: 1.65, margin: 0 }}>
        Standard couriers were being turned back at checkpoints. The access existed — it just
        wasn&apos;t visible to anyone who hadn&apos;t lived and worked inside those areas.
      </p>
    </div>
  );
}

function ExecutionTimeline() {
  const phases = [
    {
      label: 'Pre-Launch',
      color: '#6b7280',
      title: 'Build the access network',
      desc: 'Source vendors with existing government-locality access. Brief them, negotiate per-shipment rates (COVID meant fair pricing was fast), arrange official movement passes so routes would not be stopped at checkpoints.',
    },
    {
      label: 'Day 1',
      color: '#3b82f6',
      title: 'Letters & documents — live network test',
      desc: '~100 shipments per vendor. Delivered to security personnel (office staff absent due to lockdown). Leadership approves the handover protocol. Network confirmed operational.',
    },
    {
      label: 'Days 2 – 3',
      color: '#3b82f6',
      title: 'Full document push',
      desc: 'Scale to 300–400 shipments per vendor per day. Entire document backlog cleared within two days.',
    },
    {
      label: 'Day 4',
      color: '#f59e0b',
      title: 'Larger parcels & residential addresses',
      desc: 'Direct calls to recipients — most request RTO; rest approved for security handover. Vegetable and newspaper vendors (already on daily rounds through the same streets) take the residential addresses.',
    },
    {
      label: 'Days 5 – 7',
      color: '#22c55e',
      title: 'Full clear',
      desc: 'All remaining shipments delivered or returned to origin. Every open CRM ticket closed. Network stood down.',
    },
  ];

  return (
    <div style={{ marginTop: 56, paddingTop: 48, borderTop: '1px solid var(--line)' }}>
      <div style={{
        fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase',
        color: 'var(--fg-4)', marginBottom: 40, fontWeight: 600,
      }}>
        Execution — Phase by Phase
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {phases.map((phase, i) => (
          <div
            key={phase.label}
            style={{ display: 'flex', gap: 24, paddingBottom: i < phases.length - 1 ? 36 : 0 }}
          >
            {/* Dot + connecting line */}
            <div style={{
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', flexShrink: 0, width: 16,
            }}>
              <div style={{
                width: 10, height: 10, borderRadius: '50%',
                background: phase.color, flexShrink: 0, marginTop: 5,
              }} />
              {i < phases.length - 1 && (
                <div style={{
                  width: 1, flex: 1, background: 'var(--line)', marginTop: 8,
                }} />
              )}
            </div>
            {/* Text */}
            <div style={{ paddingBottom: 4 }}>
              <div style={{
                fontSize: 11, fontWeight: 700, letterSpacing: '0.12em',
                textTransform: 'uppercase', color: phase.color, marginBottom: 6,
              }}>
                {phase.label}
              </div>
              <div style={{
                fontSize: 15, fontWeight: 600, marginBottom: 8,
                color: 'var(--fg)', lineHeight: 1.35,
              }}>
                {phase.title}
              </div>
              <div style={{ fontSize: 14, color: 'var(--fg-3)', lineHeight: 1.7 }}>
                {phase.desc}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ImpactChart() {
  const bars = [
    { label: 'Before — Operations collapsed', value: 10, color: '#ef4444' },
    { label: 'After — Alternative network live', value: 70, color: '#22c55e' },
  ];

  return (
    <div style={{
      padding: '32px',
      background: 'var(--bg-card)',
      border: '1px solid var(--line)',
      borderRadius: 12,
    }}>
      <div style={{
        fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase',
        color: 'var(--fg-4)', marginBottom: 32,
      }}>
        On-Time Delivery — Crisis Recovery
      </div>

      {bars.map((bar, i) => (
        <div key={bar.label} style={{ marginBottom: i < bars.length - 1 ? 32 : 0 }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'baseline', marginBottom: 12,
          }}>
            <span style={{ fontSize: 13, color: 'var(--fg-3)', lineHeight: 1.4, maxWidth: '62%' }}>
              {bar.label}
            </span>
            <span style={{ fontSize: 28, fontWeight: 700, color: bar.color }}>
              {bar.value}%
            </span>
          </div>
          <div style={{ height: 8, background: 'rgba(128,128,128,0.12)', borderRadius: 4 }}>
            <div style={{
              height: '100%', width: `${bar.value}%`,
              background: bar.color, borderRadius: 4,
            }} />
          </div>
        </div>
      ))}

      <div style={{
        marginTop: 32, paddingTop: 24, borderTop: '1px solid var(--line)',
        fontSize: 13, color: 'var(--fg-4)', lineHeight: 1.65,
      }}>
        Some RTO was unavoidable — government offices remained shut. The real comparison
        is 70% vs. the alternative: 0%.
      </div>
    </div>
  );
}

/* ── Page ───────────────────────────────────────────────────────────── */

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();

  const currentIndex = caseStudies.findIndex(c => c.slug === cs.slug);
  const related = caseStudies.filter((_, i) => i !== currentIndex).slice(0, 2);
  const isBacklog = cs.slug === 'the-backlog';

  const metaItems: [string, string][] = [
    ['Company', cs.client],
    ['Year', cs.year],
    ['Type', cs.tags.join(' · ')],
    ['Role', cs.role],
  ];

  return (
    <>
      <NavCaseStudy />
      <main>

      {/* ── Hero ── */}
      <CaseStudyHero
        title={cs.title}
        cover={cs.cover}
        status={cs.status}
        metaItems={metaItems}
      />

      {/* ── 5-section body ──────────────────────────────────────────── */}
      {SECTIONS.map(s => {
        const isLesson = s.key === 'lesson';
        const text = cs.sections[s.key];
        const paragraphs = text.split('\n\n').filter(Boolean);

        // Backlog: sections that get a side visual (two-column)
        const hasSideVisual =
          isBacklog && (s.key === 'situation' || s.key === 'call' || s.key === 'impact');
        // Backlog: execution gets a full-width timeline below the text
        const hasBottomTimeline = isBacklog && s.key === 'execution';

        let sideVisual = null;
        if (isBacklog) {
          if (s.key === 'situation') sideVisual = <SituationMetrics />;
          else if (s.key === 'call')  sideVisual = <CallInsight />;
          else if (s.key === 'impact') sideVisual = <ImpactChart />;
        }

        return (
          <section
            key={s.key}
            style={{
              borderBottom: '1px solid var(--line)',
              padding: 'clamp(56px, 8vw, 96px) clamp(24px, 5vw, 64px)',
              maxWidth: 1200, margin: '0 auto',
            }}
          >
            {/* Section label */}
            <div style={{
              fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase',
              color: 'var(--fg-4)', marginBottom: 40, fontWeight: 600,
            }}>
              {s.number} — {s.title}
            </div>

            {/* Body */}
            {isLesson ? (
              <blockquote style={{
                margin: 0, padding: '28px 32px',
                background: 'var(--bg-card)',
                border: '1px solid var(--line)',
                borderLeft: '3px solid var(--fg)',
                borderRadius: '0 8px 8px 0',
                maxWidth: 760,
              }}>
                {paragraphs.map((para, pi) => (
                  <p key={pi} style={{
                    fontSize: 19, fontWeight: 500, lineHeight: 1.65,
                    color: 'var(--fg)', fontStyle: 'italic',
                    margin: pi > 0 ? '16px 0 0' : 0,
                  }}>
                    {para}
                  </p>
                ))}
              </blockquote>
            ) : hasSideVisual ? (
              /* Two-column: text left, visual right */
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
                gap: 'clamp(32px, 5vw, 72px)',
                alignItems: 'start',
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  {paragraphs.map((para, pi) => (
                    <p key={pi} style={{
                      fontSize: 17, lineHeight: 1.85, color: 'var(--fg-2)', margin: 0,
                    }}>
                      {para}
                    </p>
                  ))}
                </div>
                <div>{sideVisual}</div>
              </div>
            ) : (
              /* Single column */
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 760 }}>
                {paragraphs.map((para, pi) => (
                  <p key={pi} style={{
                    fontSize: 17, lineHeight: 1.85, color: 'var(--fg-2)', margin: 0,
                  }}>
                    {para}
                  </p>
                ))}
              </div>
            )}

            {/* Execution phase timeline (Backlog only) */}
            {hasBottomTimeline && <ExecutionTimeline />}
          </section>
        );
      })}

      {/* ── Related case studies ─────────────────────────────────────── */}
      {related.length > 0 && (
        <div style={{
          borderTop: '1px solid var(--line)',
          padding: 'clamp(48px, 6vw, 80px) clamp(24px, 4.5vw, 64px)',
          maxWidth: 1200, margin: '0 auto',
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
