'use client';

import BeautifulDndBoard from '@/components/kanban/react-beautiful-dnd/Board';
import TechBadge from '@/components/layout/TechBadge';

export default function ReactBeautifulDndPage() {
  const techs = ['react-beautiful-dnd', 'Tailwind CSS', 'Used by Jira/Atlassian'];

  return (
    <div className="h-full flex flex-col">
      <div className="bg-white border-b px-6 py-4">
        <h2 className="text-2xl font-bold mb-2">
          Kanban Board - react-beautiful-dnd (Jira's Library)
        </h2>
        <p className="text-gray-600 mb-3">
          The same drag-and-drop library used by Atlassian in Jira and Trello
        </p>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-3">
          <p className="text-sm text-yellow-800">
            ⚠️ <strong>Note:</strong> react-beautiful-dnd has compatibility issues with React 19.
            This library is in maintenance mode. For a fully working drag-and-drop experience,
            check out the <a href="/kanban/dnd-kit" className="underline font-medium">@dnd-kit implementation</a>.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {techs.map((tech) => (
            <TechBadge key={tech} name={tech} variant="jira" />
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <BeautifulDndBoard />
      </div>
    </div>
  );
}
