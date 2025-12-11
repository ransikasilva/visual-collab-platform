'use client';

import DndKitBoard from '@/components/kanban/dnd-kit/Board';
import TechBadge from '@/components/layout/TechBadge';

export default function DndKitKanbanPage() {
  const techs = ['@dnd-kit/core', '@dnd-kit/sortable', 'Tailwind CSS'];

  return (
    <div className="h-full flex flex-col">
      {/* Tech Stack Header */}
      <div className="bg-white border-b px-6 py-4">
        <h2 className="text-2xl font-bold mb-2">Kanban Board - @dnd-kit</h2>
        <p className="text-gray-600 mb-3">
          Modern drag-and-drop library with excellent TypeScript support
        </p>
        <div className="flex flex-wrap gap-2">
          {techs.map((tech) => (
            <TechBadge key={tech} name={tech} />
          ))}
        </div>
      </div>

      {/* Board */}
      <div className="flex-1 overflow-auto p-6">
        <DndKitBoard />
      </div>
    </div>
  );
}
