import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import LenisProvider from '@/components/LenisProvider';
import ScrollProgress from '@/components/ScrollProgress';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Mohammed Izhan Shaikh — Supply Chain Project Manager',
  description: 'Senior Project & KAM professional specialising in supply chain, warehouse ops, and last-mile delivery at scale.',
  authors: [{ name: 'Mohammed Izhan Shaikh' }],
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Mohammed Izhan Shaikh — Supply Chain Project Manager',
    description: 'Senior Project & KAM professional specialising in supply chain, warehouse ops, and last-mile delivery at scale.',
    url: 'https://mohmmedizhan.com',
    siteName: 'mohmmedizhan.com',
    locale: 'en_GB',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body style={{ fontFamily: 'var(--font-inter), -apple-system, BlinkMacSystemFont, sans-serif' }}>
        <LenisProvider>
          <ScrollProgress />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
