'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

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
        Error
      </span>
      <h1 style={{
        fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 700,
        letterSpacing: '-0.03em', margin: 0,
      }}>
        Something went wrong.
      </h1>
      <p style={{ fontSize: 16, color: 'var(--fg-3)', maxWidth: 420, margin: 0 }}>
        An unexpected error occurred. You can try again, or head back home.
      </p>
      <div style={{ display: 'flex', gap: 16, marginTop: 12 }}>
        <button
          onClick={reset}
          style={{
            fontSize: 14, fontWeight: 600, color: 'var(--fg)',
            background: 'none', border: '1px solid var(--line)',
            borderRadius: 6, padding: '8px 16px', cursor: 'pointer',
          }}
        >
          Try again
        </button>
        <Link
          href="/"
          style={{ fontSize: 14, fontWeight: 600, color: 'var(--fg)', textDecoration: 'underline', alignSelf: 'center' }}
        >
          ← Back home
        </Link>
      </div>
    </main>
  );
}
