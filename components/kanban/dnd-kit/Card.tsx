'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, ArrowUp, ArrowDown, Minus } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  assignee?: string;
}

interface CardProps {
  task: Task;
  isDragging?: boolean;
}

export default function Card({ task, isDragging = false }: CardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isSortableDragging ? 0.5 : 1,
  };

  const priorityConfig = {
    high: { icon: ArrowUp, color: 'text-red-500', bg: 'bg-red-50' },
    medium: { icon: Minus, color: 'text-yellow-500', bg: 'bg-yellow-50' },
    low: { icon: ArrowDown, color: 'text-green-500', bg: 'bg-green-50' },
  };

  const PriorityIcon = priorityConfig[task.priority].icon;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`bg-white rounded-lg p-4 shadow-sm border border-gray-200
                  hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing
                  ${isDragging ? 'rotate-3 shadow-lg' : ''}`}
    >
      {/* Card Content */}
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <h4 className="font-medium text-gray-900 mb-1">{task.title}</h4>
          <p className="text-sm text-gray-600">{task.description}</p>
        </div>
        <div className="flex items-center">
          <GripVertical size={16} className="text-gray-400" />
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-3">
        {/* Priority */}
        <div
          className={`flex items-center gap-1 px-2 py-1 rounded ${
            priorityConfig[task.priority].bg
          }`}
        >
          <PriorityIcon size={14} className={priorityConfig[task.priority].color} />
          <span className={`text-xs font-medium ${priorityConfig[task.priority].color}`}>
            {task.priority}
          </span>
        </div>

        {/* Assignee */}
        {task.assignee && (
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-medium">
              {task.assignee.charAt(0)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
