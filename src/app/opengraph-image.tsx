import { ImageResponse } from 'next/og';
import fs from 'node:fs';
import path from 'node:path';

export const runtime = 'nodejs';
export const alt = 'Mohammed Izhan Shaikh — Project Manager';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  const fontRegular = fs.readFileSync(
    path.join(process.cwd(), 'public/fonts/DM-Sans-400.ttf')
  );
  const fontBold = fs.readFileSync(
    path.join(process.cwd(), 'public/fonts/DM-Sans-700.ttf')
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#e8e8e4',
          display: 'flex',
          fontFamily: 'DM Sans',
        }}
      >
        {/* Left accent bar */}
        <div style={{ width: 7, height: '100%', background: '#2e64b0', flexShrink: 0 }} />

        {/* Main content */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            padding: '64px 80px',
          }}
        >
          {/* Top label */}
          <div
            style={{
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: '0.18em',
              color: '#2e64b0',
              textTransform: 'uppercase',
              marginBottom: 'auto',
            }}
          >
            Portfolio
          </div>

          {/* Name */}
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
            <span
              style={{
                fontSize: 96,
                fontWeight: 700,
                color: '#0a0a0a',
                letterSpacing: '-0.035em',
                lineHeight: 0.92,
              }}
            >
              Mohammed
            </span>
            <span
              style={{
                fontSize: 96,
                fontWeight: 700,
                color: '#0a0a0a',
                letterSpacing: '-0.035em',
                lineHeight: 0.92,
              }}
            >
              Izhan Shaikh
            </span>
          </div>

          {/* Blue rule */}
          <div
            style={{
              width: 52,
              height: 3,
              background: '#2e64b0',
              margin: '36px 0 32px',
              borderRadius: 2,
            }}
          />

          {/* Role + URL row */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <span
                style={{
                  fontSize: 26,
                  fontWeight: 700,
                  color: '#0a0a0a',
                  letterSpacing: '-0.02em',
                }}
              >
                Project Manager
              </span>
              <span
                style={{
                  fontSize: 17,
                  fontWeight: 400,
                  color: 'rgba(10,10,10,0.5)',
                  letterSpacing: '-0.005em',
                }}
              >
                Supply chain · Warehouse ops · Process design
              </span>
            </div>

            <span
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: 'rgba(10,10,10,0.35)',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}
            >
              mohmmedizhan.com
            </span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'DM Sans', data: fontRegular, weight: 400, style: 'normal' },
        { name: 'DM Sans', data: fontBold,    weight: 700, style: 'normal' },
      ],
    }
  );
}
