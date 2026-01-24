import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/lib/language-context';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Li Zheng - Senior Data Scientist',
  description:
    'Personal website and AI chatbot for Li Zheng, Senior Data Scientist. Chat with me to learn about my professional experience, skills, and projects.',
  keywords: [
    'Li Zheng',
    'Senior Data Scientist',
    'Data Science',
    'Machine Learning',
    'AI',
    'Portfolio',
  ],
  authors: [{ name: 'Li Zheng' }],
  openGraph: {
    title: 'Li Zheng - Senior Data Scientist',
    description:
      'Chat with Li Zheng to learn about professional experience, skills, and projects in data science.',
    type: 'website',
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
    </html>
  );
}
