import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { CanvasProvider } from '@/lib/canvas-context';
import GlobalCanvas from '@/components/global-canvas';
import StableCanvasRoot from '@/components/stable-canvas-root';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'NYC Mayoral Candidate Arena',
  description: 'A place to learn about the NYC 2025 mayoral candidates',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CanvasProvider>
          <StableCanvasRoot/>
          <GlobalCanvas />
          {children}
        </CanvasProvider>
      </body>
    </html>
  );
}
