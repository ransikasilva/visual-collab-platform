'use client';

import KonvaCanvas from '@/components/whiteboard/konva/Canvas';
import TechBadge from '@/components/layout/TechBadge';

export default function KonvaPage() {
  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="bg-white border-b px-6 py-4 flex-shrink-0">
        <h2 className="text-2xl font-bold mb-2">Whiteboard - React Konva</h2>
        <p className="text-gray-600 mb-3">
          React wrapper for Konva.js - Canvas-based drawing with React-friendly API
        </p>
        <div className="flex flex-wrap gap-2">
          <TechBadge name="react-konva" variant="primary" />
          <TechBadge name="konva" />
          <TechBadge name="Canvas-based" />
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6" style={{ minHeight: '800px' }}>
        <KonvaCanvas />
      </div>
    </div>
  );
}
