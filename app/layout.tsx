import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google';
import { LanguageProvider } from '@/lib/language-context';
import { profileData } from '@/lib/profile-data';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

const baseUrl =
  process.env.SITE_URL ||
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000');

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: profileData.seo.title.en,
  description: profileData.seo.description.en,
  keywords: [
    'Li Zheng',
    'Flatre.ai',
    'AI product leader',
    'Data science',
    'Meta AI Search',
    'Experimentation',
    'Causal inference',
    'LLM evaluation',
    'Real estate AI',
  ],
  authors: [{ name: profileData.name.en }],
  creator: profileData.name.en,
  alternates: { canonical: '/' },
  icons: {
    icon: [
      { url: '/favicon-profile2-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-profile2-16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: {
      url: '/apple-touch-icon-profile2.png',
      sizes: '180x180',
      type: 'image/png',
    },
    shortcut: '/favicon-profile2-32.png',
  },
  openGraph: {
    title: profileData.seo.title.en,
    description: profileData.seo.description.en,
    type: 'website',
    url: '/',
    siteName: profileData.seo.title.en,
    locale: 'en_US',
    images: [
      {
        url: '/profile2.png',
        width: 800,
        height: 800,
        alt: profileData.seo.imageAlt.en,
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: profileData.seo.title.en,
    description: profileData.seo.description.en,
    images: [
      {
        url: '/profile2.png',
        alt: profileData.seo.imageAlt.en,
      },
    ],
  },
};

const currentRole = profileData.experience[0];
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: profileData.name.en,
  alternateName: 'xjrmh',
  url: baseUrl,
  image: `${baseUrl}/profile2.png`,
  description: profileData.seo.description.en,
  jobTitle: currentRole.role.en,
  worksFor: {
    '@type': 'Organization',
    name: 'Flatre, Inc.',
    url: currentRole.links?.[0]?.url,
  },
  alumniOf: profileData.education.map((item) => ({
    '@type': 'CollegeOrUniversity',
    name: item.school.en,
  })),
  sameAs: profileData.socialLinks
    .filter((link) => link.id === 'linkedin' || link.id === 'github')
    .map((link) => link.url),
  knowsAbout: [
    'Artificial intelligence',
    'Data science',
    'Product leadership',
    'Search',
    'Experimentation',
    'Causal inference',
    'LLM evaluation',
    'Real estate technology',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>
        <LanguageProvider>{children}</LanguageProvider>
        {process.env.NEXT_PUBLIC_GA_ID ? (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        ) : null}
      </body>
    </html>
  );
}
