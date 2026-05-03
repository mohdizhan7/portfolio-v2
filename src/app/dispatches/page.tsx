import type { Metadata } from 'next';
import Link from 'next/link';
import { dispatches } from '@/lib/dispatches';

export const metadata: Metadata = {
  title: 'Dispatches — Mohammed Izhan Shaikh',
  description: 'Writing on supply chain, warehouse operations, and building systems that scale.',
  openGraph: {
    title: 'Dispatches — Mohammed Izhan Shaikh',
    description: 'Writing on supply chain, warehouse operations, and building systems that scale.',
    url: 'https://mohmmedizhan.com/dispatches',
  },
};

export default function DispatchesPage() {
  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: '20px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        background: 'var(--bg)', borderBottom: '1px solid var(--line)',
      }}>
        <Link href="/" style={{ fontSize: 15, fontWeight: 700, letterSpacing: '-0.01em' }}>Mohammed Izhan</Link>
        <Link href="/#work" style={{ fontSize: 13, color: 'var(--fg-3)' }}>← Back</Link>
      </nav>

      <main style={{ maxWidth: 720, margin: '0 auto', padding: '120px 48px 120px' }}>
        <div className="label" style={{ marginBottom: 16 }}>Dispatches</div>
        <h1 style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: 16 }}>
          Writing.
        </h1>
        <p style={{ fontSize: 16, color: 'var(--fg-2)', marginBottom: 80 }}>
          On supply chain, warehouse operations, and building systems that scale.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid var(--line)' }}>
          {dispatches.map(d => (
            <Link key={d.slug} href={`/dispatches/${d.slug}`} style={{
              display: 'block', padding: '32px 0',
              borderBottom: '1px solid var(--line)',
              transition: 'opacity 0.2s',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 24, marginBottom: 10 }}>
                <h2 style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.01em' }}>{d.title}</h2>
                <span style={{ fontSize: 11, color: 'var(--fg-4)', whiteSpace: 'nowrap', letterSpacing: '0.08em' }}>{d.date}</span>
              </div>
              <p style={{ fontSize: 14, color: 'var(--fg-2)', lineHeight: 1.6, marginBottom: 12 }}>{d.subtitle}</p>
              <span style={{ fontSize: 11, color: 'var(--fg-4)', letterSpacing: '0.08em' }}>{d.readTime}</span>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
