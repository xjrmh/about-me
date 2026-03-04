import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/lib/language-context';
import { GoogleAnalytics } from '@next/third-parties/google';

const inter = Inter({ subsets: ['latin'] });

const baseUrl = process.env.SITE_URL ||
                (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: 'Li Zheng - Data Science | Product | AI',
  description:
    'Li Zheng (xjrmh) — Data Scientist, Co-Founder, and AI enthusiast. Explore my portfolio in data science, machine learning, real estate innovation, and AI. Former Staff Data Scientist at Meta. Chat with my AI to learn more.',
  keywords: [
    'Li Zheng',
    'xjrmh',
    'Data Scientist',
    'Seniot Data Scientist',
    'Staff Data Scientist',
    'Data Science',
    'Machine Learning',
    'AI',
    'Meta',
    'Duke University',
    'Portfolio',
    'Product',
    'Real Estate',
  ],
  authors: [{ name: 'Li Zheng' }],
  creator: 'Li Zheng',
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/profile.jpg', sizes: '32x32', type: 'image/jpeg' },
      { url: '/profile.jpg', sizes: '16x16', type: 'image/jpeg' },
    ],
    apple: { url: '/profile.jpg', sizes: '180x180', type: 'image/jpeg' },
    shortcut: '/profile.jpg',
  },
  openGraph: {
    title: 'Li Zheng (xjrmh) - Data Science | Product | AI',
    description:
      'Li Zheng (xjrmh) — Data Scientist, Co-Founder, and AI enthusiast. Portfolio featuring data science, machine learning, and AI projects. Former Staff Data Scientist at Meta.',
    type: 'website',
    url: '/',
    siteName: 'Li Zheng — xjrmh.com',
    locale: 'en_US',
    images: [
      {
        url: '/profile.jpg',
        width: 800,
        height: 800,
        alt: 'Li Zheng - Data Scientist and AI Enthusiast',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Li Zheng (xjrmh) - Data Science | Product | AI',
    description:
      'Li Zheng (xjrmh) — Data Scientist, Co-Founder, and AI enthusiast. Explore my portfolio and chat with my AI.',
    images: ['/profile.jpg'],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Li Zheng',
  alternateName: 'xjrmh',
  url: baseUrl,
  image: `${baseUrl}/profile.jpg`,
  jobTitle: 'Co-Founder',
  worksFor: {
    '@type': 'Organization',
    name: 'Flat Strategy',
  },
  alumniOf: [
    {
      '@type': 'CollegeOrUniversity',
      name: 'Duke University',
    },
    {
      '@type': 'CollegeOrUniversity',
      name: 'The Ohio State University',
    },
  ],
  sameAs: [
    'https://www.linkedin.com/in/li-zheng/',
    'https://github.com/xjrmh',
  ],
  knowsAbout: ['Data Science', 'Machine Learning', 'AI', 'Product Management', 'Real Estate Technology'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
      {process.env.NEXT_PUBLIC_GA_ID && <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />}
    </html>
  );
}
