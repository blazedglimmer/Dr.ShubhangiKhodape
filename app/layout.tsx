import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

export const metadata: Metadata = {
  // metadataBase: new URL(siteConfig.url),
  title: 'Dr. Shubhangi Khodape - Aesthetic Physician',
  description:
    'Book consultations with Dr. Shubhangi Khodape, specialist in Skin, Beauty, Hair, and Lifestyle treatments.',
  keywords: [
    'Shubhangi Khodape ',
    'Dr. Shubhangi Khodape',
    'Aesthetic Physician',
  ],
  authors: [
    {
      name: 'Shubhangi Khodape ',
      url: 'https://dr-shubhangi-khodape.vercel.app/',
    },
  ],
  creator: 'Shubhangi Khodape ',
  openGraph: {
    type: 'profile',
    locale: 'en_US',
    url: 'https://dr-shubhangi-khodape.vercel.app/',
    title: 'Dr. Shubhangi Khodape - Aesthetic Physician',
    description:
      'Book consultations with Dr. Shubhangi Khodape, specialist in Skin, Beauty, Hair, and Lifestyle treatments.',
    siteName: 'Dr. Shubhangi Khodape',
    images: [
      {
        url: 'https://res.cloudinary.com/dhyds1gcy/image/upload/v1761092022/Screenshot_2025-10-22_at_5.41.13_AM_x5dpzl.png',
        width: 1200,
        height: 630,
        alt: 'Dr. Shubhangi Khodape',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dr. Shubhangi Khodape - Aesthetic Physician',
    description:
      'Book consultations with Dr. Shubhangi Khodape, specialist in Skin, Beauty, Hair, and Lifestyle treatments.',
    images: [
      'https://res.cloudinary.com/dhyds1gcy/image/upload/v1761092022/Screenshot_2025-10-22_at_5.41.13_AM_x5dpzl.png',
    ],
    creator: '@' + 'shubhangikhodape16',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: `https://dr-shubhangi-khodape.vercel.app/site.webmanifest`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
