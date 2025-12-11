'use client';

import ForceGraphViewer from '@/components/mindmap/force-graph/Viewer';
import TechBadge from '@/components/layout/TechBadge';

export default function ForceGraphPage() {
  return (
    <div className="h-full flex flex-col">
      <div className="bg-white border-b px-6 py-4">
        <h2 className="text-2xl font-bold mb-2">Mind Map - Force Graph</h2>
        <p className="text-gray-600 mb-3">
          Network visualization with force-directed layout
        </p>
        <div className="flex flex-wrap gap-2">
          <TechBadge name="react-force-graph" variant="primary" />
          <TechBadge name="Network-based" />
          <TechBadge name="Interactive" />
        </div>
      </div>

      <div className="flex-1 p-6">
        <ForceGraphViewer />
      </div>
    </div>
  );
}
