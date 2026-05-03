import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { readFileSync } from 'fs';
import { join } from 'path';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { dispatches, getDispatch } from '@/lib/dispatches';

export function generateStaticParams() {
  return dispatches.map(d => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const d = getDispatch(slug);
  if (!d) return {};
  return {
    title: `${d.title} — Mohammed Izhan Shaikh`,
    description: d.subtitle,
    openGraph: {
      title: `${d.title} — Mohammed Izhan Shaikh`,
      description: d.subtitle,
      url: `https://mohmmedizhan.com/dispatches/${d.slug}`,
    },
  };
}

export default async function DispatchPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const d = getDispatch(slug);
  if (!d) notFound();

  const source = readFileSync(
    join(process.cwd(), 'src/content/dispatches', `${slug}.mdx`),
    'utf8'
  );

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: '20px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        background: 'var(--bg)', borderBottom: '1px solid var(--line)',
      }}>
        <Link href="/" style={{ fontSize: 15, fontWeight: 700, letterSpacing: '-0.01em' }}>Mohammed Izhan</Link>
        <Link href="/dispatches" style={{ fontSize: 13, color: 'var(--fg-3)' }}>← All dispatches</Link>
      </nav>

      <main style={{ maxWidth: 720, margin: '0 auto', padding: '120px 48px 120px' }}>
        <div style={{ marginBottom: 64 }}>
          <div style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
            <span style={{ fontSize: 11, color: 'var(--fg-4)', letterSpacing: '0.08em' }}>{d.date}</span>
            <span style={{ fontSize: 11, color: 'var(--fg-4)' }}>·</span>
            <span style={{ fontSize: 11, color: 'var(--fg-4)', letterSpacing: '0.08em' }}>{d.readTime}</span>
          </div>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: 16 }}>
            {d.title}
          </h1>
          <p style={{ fontSize: 18, color: 'var(--fg-2)', lineHeight: 1.5 }}>{d.subtitle}</p>
        </div>

        <article className="prose">
          <MDXRemote source={source} />
        </article>
      </main>
    </>
  );
}
