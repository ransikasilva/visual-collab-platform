'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import TechBadge from '@/components/layout/TechBadge';
import 'tldraw/tldraw.css';

const Tldraw = dynamic(() => import('tldraw').then((mod) => mod.Tldraw), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading whiteboard...</p>
      </div>
    </div>
  ),
});

export default function TldrawPage() {

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
        <Suspense fallback={
          <div className="w-full h-full flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading whiteboard...</p>
            </div>
          </div>
        }>
          <Tldraw />
        </Suspense>
      </div>
    </div>
  );
}
