'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import TechBadge from '@/components/layout/TechBadge';
import '@excalidraw/excalidraw/index.css';

// Import Excalidraw dynamically (client-side only)
const Excalidraw = dynamic(
  () => import('@excalidraw/excalidraw').then((mod) => mod.Excalidraw),
  { ssr: false }
);

export default function ExcalidrawPage() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight - 220, // Subtract header height
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="bg-white border-b px-6 py-4 flex-shrink-0">
        <h2 className="text-2xl font-bold mb-2">Whiteboard - Excalidraw</h2>
        <p className="text-gray-600 mb-3">
          Hand-drawn style whiteboard, perfect for brainstorming and diagrams
        </p>
        <div className="flex flex-wrap gap-2">
          <TechBadge name="@excalidraw/excalidraw" variant="primary" />
          <TechBadge name="Hand-drawn Style" />
          <TechBadge name="Collaborative" />
        </div>
      </div>

      <div className="flex-1 min-h-0" style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <Excalidraw
            initialData={{
              appState: { viewBackgroundColor: '#ffffff' },
            }}
          />
        </div>
      </div>
    </div>
  );
}
