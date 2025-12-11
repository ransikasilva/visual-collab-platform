'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import MainNavigation from '@/components/layout/MainNavigation';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col h-screen">
          <header className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 border-b border-blue-800 shadow-lg">
            <div className="container mx-auto px-6 py-6">
              <div className="flex items-center justify-between">
                <Link href="/" className="group cursor-pointer">
                  <h1 className="text-3xl font-bold text-white tracking-tight mb-1 group-hover:text-blue-300 transition-colors">
                    Visual Collaboration Platform
                  </h1>
                  <p className="text-sm text-blue-200 font-medium group-hover:text-blue-100 transition-colors">
                    Comparing Multiple Technologies for Project Management & Visualization
                  </p>
                </Link>
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

          {!isHomePage && <MainNavigation />}

          <main className="flex-1 overflow-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}
