import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import MainNavigation from '@/components/layout/MainNavigation';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Visual Collaboration Platform',
  description: 'Showcasing various project management visualization techniques',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col h-screen">
          <header className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 border-b border-blue-800 shadow-lg">
            <div className="container mx-auto px-6 py-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-white tracking-tight mb-1">
                    Visual Collaboration Platform
                  </h1>
                  <p className="text-sm text-blue-200 font-medium">
                    Comparing Multiple Technologies for Project Management & Visualization
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-blue-300 font-light">
                    Developed by <span className="font-semibold text-blue-100">Ransika Silva</span>
                  </p>
                  <p className="text-xs text-blue-400 mt-0.5">
                    for OCTAVE Design Purposes
                  </p>
                </div>
              </div>
            </div>
          </header>

          <MainNavigation />

          <main className="flex-1 overflow-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}
