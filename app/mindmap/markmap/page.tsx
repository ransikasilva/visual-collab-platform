'use client';

import MarkmapViewer from '@/components/mindmap/markmap/Viewer';
import TechBadge from '@/components/layout/TechBadge';

export default function MarkmapPage() {
  return (
    <div className="h-full flex flex-col">
      <div className="bg-white border-b px-6 py-4">
        <h2 className="text-2xl font-bold mb-2">Mind Map - Markmap</h2>
        <p className="text-gray-600 mb-3">
          Convert Markdown to interactive mind maps
        </p>
        <div className="flex flex-wrap gap-2">
          <TechBadge name="markmap-lib" variant="primary" />
          <TechBadge name="Markdown-based" />
          <TechBadge name="Auto-layout" />
        </div>
      </div>

      <div className="flex-1 p-6">
        <MarkmapViewer />
      </div>
    </div>
  );
}
