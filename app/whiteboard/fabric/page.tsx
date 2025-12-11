'use client';

import FabricCanvas from '@/components/whiteboard/fabric/Canvas';
import TechBadge from '@/components/layout/TechBadge';

export default function FabricPage() {
  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="bg-white border-b px-6 py-4 flex-shrink-0">
        <h2 className="text-2xl font-bold mb-2">Whiteboard - Fabric.js</h2>
        <p className="text-gray-600 mb-3">
          Powerful canvas library with complete control over drawing
        </p>
        <div className="flex flex-wrap gap-2">
          <TechBadge name="fabric.js" variant="primary" />
          <TechBadge name="Canvas API" />
          <TechBadge name="Full Control" />
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6" style={{ minHeight: '800px' }}>
        <FabricCanvas />
      </div>
    </div>
  );
}
