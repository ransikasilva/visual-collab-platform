'use client';

import ReactDndBoard from '@/components/kanban/react-dnd/Board';
import TechBadge from '@/components/layout/TechBadge';

export default function ReactDndPage() {
  return (
    <div className="h-full flex flex-col">
      <div className="bg-white border-b px-6 py-4">
        <h2 className="text-2xl font-bold mb-2">Kanban Board - react-dnd</h2>
        <p className="text-gray-600 mb-3">
          Low-level library for complex drag-and-drop interactions
        </p>
        <div className="flex flex-wrap gap-2">
          <TechBadge name="react-dnd" variant="primary" />
          <TechBadge name="HTML5 Backend" />
          <TechBadge name="Tailwind CSS" />
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <ReactDndBoard />
      </div>
    </div>
  );
}
