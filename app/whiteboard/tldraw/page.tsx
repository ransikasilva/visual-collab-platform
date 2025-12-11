'use client';

import dynamic from 'next/dynamic';
import TechBadge from '@/components/layout/TechBadge';
import 'tldraw/tldraw.css';

const Tldraw = dynamic(() => import('tldraw').then((mod) => mod.Tldraw), {
  ssr: false,
});

export default function TldrawPage() {
  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="bg-white border-b px-6 py-4 flex-shrink-0">
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

      <div className="flex-1 relative" style={{ minHeight: 0 }}>
        <div className="absolute inset-0">
          <Tldraw />
        </div>
      </div>
    </div>
  );
}
