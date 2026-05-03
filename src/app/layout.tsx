import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import LenisProvider from '@/components/LenisProvider';
import ScrollProgress from '@/components/ScrollProgress';

const dmSans = localFont({
  src: [
    { path: '../../public/fonts/dm-sans-400.woff2', weight: '400', style: 'normal' },
    { path: '../../public/fonts/dm-sans-500.woff2', weight: '500', style: 'normal' },
    { path: '../../public/fonts/dm-sans-700.woff2', weight: '700', style: 'normal' },
    { path: '../../public/fonts/dm-sans-800.woff2', weight: '800', style: 'normal' },
  ],
  variable: '--font-dm-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Mohammed Izhan Shaikh — Project Manager',
  description: 'Senior Project & KAM professional specialising in supply chain, warehouse ops, and last-mile delivery at scale.',
  authors: [{ name: 'Mohammed Izhan Shaikh' }],
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Mohammed Izhan Shaikh — Project Manager',
    description: 'Senior Project & KAM professional specialising in supply chain, warehouse ops, and last-mile delivery at scale.',
    url: 'https://mohmmedizhan.com',
    siteName: 'mohmmedizhan.com',
    locale: 'en_GB',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body style={{ fontFamily: 'var(--font-dm-sans), -apple-system, BlinkMacSystemFont, sans-serif' }}>
        <LenisProvider>
          <ScrollProgress />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
