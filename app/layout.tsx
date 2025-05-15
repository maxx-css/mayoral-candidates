import type React from 'react';
import type { Metadata } from 'next/types';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'NYC Mayoral Candidate Arena',
  description: 'A place to learn about the NYC 2025 mayoral candidates',
  keywords: [
    'NYC',
    'mayor',
    'election',
    'candidates',
    'politics',
    '3D',
    'interactive',
  ],
  authors: [{ name: 'NYC Votes 3D Team' }],
  viewport: 'width=device-width, initial-scale=1 maximum-scale=1, user-scalable=no',
  icons: {
    // icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className={`${inter.variable}`} suppressHydrationWarning>
      <body
        className={`min-h-screen bg-gray-900 text-white antialiased`}
      >
        <ThemeProvider attribute='class' defaultTheme='dark' enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
