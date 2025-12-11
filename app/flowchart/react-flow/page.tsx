'use client';

import ReactFlowDiagram from '@/components/flowchart/react-flow/Diagram';
import TechBadge from '@/components/layout/TechBadge';

export default function ReactFlowPage() {
  return (
    <div className="h-full flex flex-col">
      <div className="bg-white border-b px-6 py-4">
        <h2 className="text-2xl font-bold mb-2">Flowchart - React Flow</h2>
        <p className="text-gray-600 mb-3">
          Most popular library for node-based diagrams and flowcharts
        </p>
        <div className="flex flex-wrap gap-2">
          <TechBadge name="reactflow" variant="primary" />
          <TechBadge name="Node-based" />
          <TechBadge name="Most Popular" />
        </div>
      </div>

      <div className="flex-1">
        <ReactFlowDiagram />
      </div>
    </div>
  );
}
