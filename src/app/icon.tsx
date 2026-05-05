import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: '#2e64b0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 7,
        }}
      >
        <span
          style={{
            color: '#ffffff',
            fontSize: 13,
            fontWeight: 700,
            fontFamily: 'sans-serif',
            letterSpacing: '-0.04em',
            marginTop: 1,
          }}
        >
          MI
        </span>
      </div>
    ),
    { width: 32, height: 32 }
  );
}
