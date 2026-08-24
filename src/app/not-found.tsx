import Link from 'next/link';

export default function NotFound() {
  return (
    <main style={{
      minHeight: '100svh',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      textAlign: 'center', padding: '24px', gap: 20,
    }}>
      <span style={{
        fontSize: 13, fontWeight: 700, letterSpacing: '0.2em',
        textTransform: 'uppercase', color: 'var(--fg-4)',
      }}>
        404
      </span>
      <h1 style={{
        fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 700,
        letterSpacing: '-0.03em', margin: 0,
      }}>
        Page not found.
      </h1>
      <p style={{ fontSize: 16, color: 'var(--fg-3)', maxWidth: 420, margin: 0 }}>
        The page you&apos;re looking for doesn&apos;t exist or has moved.
      </p>
      <Link
        href="/"
        style={{
          marginTop: 12, fontSize: 14, fontWeight: 600,
          color: 'var(--fg)', textDecoration: 'underline',
        }}
      >
        ← Back home
      </Link>
    </main>
  );
}
