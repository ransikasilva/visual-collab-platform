'use client';

import MermaidDiagram from '@/components/flowchart/mermaid/Diagram';
import TechBadge from '@/components/layout/TechBadge';

export default function MermaidPage() {
  return (
    <div className="h-full flex flex-col">
      <div className="bg-white border-b px-6 py-4">
        <h2 className="text-2xl font-bold mb-2">Flowchart - Mermaid</h2>
        <p className="text-gray-600 mb-3">
          Create diagrams from text - used by GitHub, Notion, and GitLab
        </p>
        <div className="flex flex-wrap gap-2">
          <TechBadge name="mermaid" variant="primary" />
          <TechBadge name="Text-based" />
          <TechBadge name="Used by GitHub" />
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <MermaidDiagram />
      </div>
    </div>
  );
}
