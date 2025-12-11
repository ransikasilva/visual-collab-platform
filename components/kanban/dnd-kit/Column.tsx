'use client';

import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import Card from './Card';
import { Plus } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  assignee?: string;
}

interface ColumnProps {
  column: {
    id: string;
    title: string;
    taskIds: string[];
  };
  tasks: Task[];
}

export default function Column({ column, tasks }: ColumnProps) {
  const { setNodeRef } = useDroppable({ id: column.id });

  return (
    <div className="flex-1 min-w-[300px] max-w-[350px]">
      <div className="bg-gray-100 rounded-lg p-4 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-gray-800">{column.title}</h3>
            <span className="bg-gray-300 text-gray-700 text-xs px-2 py-1 rounded-full">
              {tasks.length}
            </span>
          </div>
          <button className="p-1 hover:bg-gray-200 rounded">
            <Plus size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Task List */}
        <div ref={setNodeRef} className="flex-1 space-y-3 overflow-y-auto">
          <SortableContext
            items={tasks.map((t) => t.id)}
            strategy={verticalListSortingStrategy}
          >
            {tasks.map((task) => (
              <Card key={task.id} task={task} />
            ))}
          </SortableContext>
        </div>
      </div>
    </div>
  );
}
