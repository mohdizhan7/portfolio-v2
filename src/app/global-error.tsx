'use client';

import { useEffect } from 'react';

export default function GlobalError({
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
    <html lang="en">
      <body>
        <main style={{
          minHeight: '100svh',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          textAlign: 'center', padding: '24px', gap: 20,
          fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
        }}>
          <h1 style={{ fontSize: 32, fontWeight: 700, margin: 0 }}>
            Something went wrong.
          </h1>
          <p style={{ fontSize: 16, color: '#666', maxWidth: 420, margin: 0 }}>
            An unexpected error occurred while loading this page.
          </p>
          <button
            onClick={reset}
            style={{
              fontSize: 14, fontWeight: 600, marginTop: 12,
              background: 'none', border: '1px solid #ccc',
              borderRadius: 6, padding: '8px 16px', cursor: 'pointer',
            }}
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
