import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
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

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();

  const currentIndex = caseStudies.findIndex(c => c.slug === cs.slug);
  const related = caseStudies.filter((_, i) => i !== currentIndex).slice(0, 2);

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: '20px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        background: 'var(--bg)', borderBottom: '1px solid var(--line)',
      }}>
        <Link href="/" style={{ fontSize: 15, fontWeight: 700, letterSpacing: '-0.01em' }}>Mohammed Izhan</Link>
        <Link href="/#projects" style={{ fontSize: 13, color: 'var(--fg-3)', display: 'flex', alignItems: 'center', gap: 6 }}>
          ← All case studies
        </Link>
      </nav>

      <main style={{ paddingTop: 80 }}>
        {/* Hero */}
        <div style={{
          padding: '80px 48px 64px',
          maxWidth: 1200, margin: '0 auto',
        }}>
          <div style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--fg-3)', marginBottom: 20 }}>
            Case Study {cs.number.replace('.', '')}
          </div>
          <h1 style={{ fontSize: 'clamp(40px, 6vw, 80px)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: 16 }}>
            {cs.title}
          </h1>
          <p style={{ fontSize: 20, color: 'var(--fg-2)', marginBottom: 48 }}>{cs.subtitle}</p>

          {/* Meta grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, auto)', gap: '0 64px', borderTop: '1px solid var(--line)', paddingTop: 32 }}>
            {[['Role', cs.role], ['Timeline', cs.timeline], ['Scale', cs.scale]].map(([label, val]) => (
              <div key={label}>
                <div style={{ fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--fg-4)', marginBottom: 6 }}>{label}</div>
                <div style={{ fontSize: 15, fontWeight: 600 }}>{val}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Cover image */}
        <div style={{ position: 'relative', height: 'clamp(280px, 40vw, 560px)', maxWidth: 1200, margin: '0 auto 64px', padding: '0 48px' }}>
          <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: 12, overflow: 'hidden', border: '1px solid var(--line)' }}>
            <Image src={cs.cover} alt={cs.title} fill style={{ objectFit: 'cover' }} priority sizes="(max-width: 1200px) 100vw, 1104px" />
          </div>
        </div>

        {/* Body */}
        <div style={{ maxWidth: 720, margin: '0 auto', padding: '0 48px 80px' }}>
          {cs.body.map((para, i) => (
            <p key={i} style={{ fontSize: 17, lineHeight: 1.75, color: 'var(--fg-2)', marginBottom: 24 }}>{para}</p>
          ))}

          <div style={{
            background: 'var(--bg-card)', border: '1px solid var(--line)',
            borderRadius: 8, padding: '24px 28px', marginTop: 48,
          }}>
            <div style={{ fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--fg-4)', marginBottom: 10 }}>Outcome</div>
            <p style={{ fontSize: 16, fontWeight: 600, lineHeight: 1.6 }}>{cs.outcome}</p>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div style={{ borderTop: '1px solid var(--line)', padding: '64px 48px', maxWidth: 1200, margin: '0 auto' }}>
            <div className="label" style={{ marginBottom: 32 }}>More case studies</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
              {related.map(r => (
                <Link key={r.slug} href={`/work/${r.slug}`} style={{
                  display: 'flex', alignItems: 'center', gap: 20,
                  padding: '20px 24px', background: 'var(--bg-card)',
                  border: '1px solid var(--line)', borderRadius: 8,
                  transition: 'border-color 0.2s',
                }}>
                  <div style={{ position: 'relative', width: 56, height: 56, flexShrink: 0, borderRadius: 6, overflow: 'hidden', border: '1px solid var(--line)' }}>
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
