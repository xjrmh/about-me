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
  title: 'Li Zheng - Data Science | Real Estate | AI',
  description:
    'Personal website and AI chatbot for Li Zheng. Explore my work in data science, real estate innovation, and AI. Chat with me to learn about my professional experience, skills, and projects.',
  keywords: [
    'Li Zheng',
    'Senior Data Scientist',
    'Data Science',
    'Machine Learning',
    'AI',
    'Portfolio',
  ],
  authors: [{ name: 'Li Zheng' }],
  icons: {
    icon: [
      { url: '/profile.jpg', sizes: '32x32', type: 'image/jpeg' },
      { url: '/profile.jpg', sizes: '16x16', type: 'image/jpeg' },
    ],
    apple: { url: '/profile.jpg', sizes: '180x180', type: 'image/jpeg' },
    shortcut: '/profile.jpg',
  },
  openGraph: {
    title: 'Li Zheng - Data Science | Real Estate | AI',
    description:
      'Explore my work in data science, real estate innovation, and AI. Chat with me to learn about my professional experience, skills, and projects.',
    type: 'website',
    images: ['/profile.jpg'],
  },
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
      </head>
      <body className={inter.className}>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
      {process.env.NEXT_PUBLIC_GA_ID && <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />}
    </html>
  );
}
