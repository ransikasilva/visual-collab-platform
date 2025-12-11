'use client';

import { Suspense, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import TechBadge from '@/components/layout/TechBadge';
import 'tldraw/tldraw.css';

const Tldraw = dynamic(
  () =>
    import('tldraw').then((mod) => {
      console.log('✅ Tldraw module loaded successfully');
      return mod.Tldraw;
    }),
  {
    ssr: false,
  }
);

export default function TldrawPage() {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Global error handler to catch any errors
    const handleError = (event: ErrorEvent) => {
      console.error('❌ Global error caught:', event.error);
      setError(event.error?.message || 'An error occurred');
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error('❌ Unhandled promise rejection:', event.reason);
      setError(event.reason?.message || 'An error occurred');
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  if (error) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div className="bg-white border-b px-6 py-4">
          <h2 className="text-2xl font-bold mb-2">Whiteboard - Tldraw</h2>
        </div>
        <div className="flex-1 flex items-center justify-center bg-red-50">
          <div className="text-center p-6 max-w-lg">
            <h3 className="text-xl font-bold text-red-600 mb-2">Error Detected</h3>
            <p className="text-red-800 mb-4">{error}</p>
            <button
              onClick={() => {
                setError(null);
                window.location.reload();
              }}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Reload Page
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      <div className="bg-white border-b px-6 py-4" style={{ flexShrink: 0 }}>
        <h2 className="text-2xl font-bold mb-2">Whiteboard - Tldraw</h2>
        <p className="text-gray-600 mb-3">
          Modern whiteboard with smooth UX, similar to Figma's FigJam
        </p>
        <div className="flex flex-wrap gap-2">
          <TechBadge name="tldraw" variant="primary" />
          <TechBadge name="Modern UI" />
          <TechBadge name="Figma-like" />
        </div>
      </div>

      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        <Tldraw />
      </div>
    </div>
  );
}
