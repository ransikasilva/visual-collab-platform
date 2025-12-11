'use client';

import ReactMindmapViewer from '@/components/mindmap/react-mindmap/Viewer';
import TechBadge from '@/components/layout/TechBadge';

export default function ReactMindmapPage() {
  return (
    <div className="h-full flex flex-col">
      <div className="bg-white border-b px-6 py-4">
        <h2 className="text-2xl font-bold mb-2">Mind Map - React MindMap</h2>
        <p className="text-gray-600 mb-3">
          Traditional hierarchical mind map layout
        </p>
        <div className="flex flex-wrap gap-2">
          <TechBadge name="react-mindmap" variant="primary" />
          <TechBadge name="Traditional" />
          <TechBadge name="Hierarchical" />
        </div>
      </div>

      <div className="flex-1 p-6">
        <ReactMindmapViewer />
      </div>
    </div>
  );
}
