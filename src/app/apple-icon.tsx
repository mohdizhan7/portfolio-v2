import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          background: '#2e64b0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 40,
        }}
      >
        <span
          style={{
            color: '#ffffff',
            fontSize: 76,
            fontWeight: 700,
            fontFamily: 'sans-serif',
            letterSpacing: '-0.04em',
            marginTop: 4,
          }}
        >
          MI
        </span>
      </div>
    ),
    { width: 180, height: 180 }
  );
}
