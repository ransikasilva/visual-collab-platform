'use client';

import { useDrop } from 'react-dnd';
import Card from './Card';
import { Plus } from 'lucide-react';

interface Task {
  id: string;
  content: string;
  priority: 'low' | 'medium' | 'high';
}

interface ColumnProps {
  column: {
    id: string;
    title: string;
    taskIds: string[];
  };
  tasks: Task[];
  moveTask: (taskId: string, sourceColumnId: string, targetColumnId: string, targetIndex: number) => void;
}

export default function Column({ column, tasks, moveTask }: ColumnProps) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'TASK',
    drop: (item: { id: string; columnId: string }, monitor) => {
      if (!monitor.didDrop()) {
        moveTask(item.id, item.columnId, column.id, tasks.length);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver({ shallow: true }),
    }),
  }));

  return (
    <div className="flex-shrink-0 w-[300px]">
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
            <Plus size={18} />
          </button>
        </div>

        {/* Drop Zone */}
        <div
          ref={drop}
          className={`flex-1 space-y-3 min-h-[200px] transition-colors rounded-lg p-2
            ${isOver ? 'bg-blue-50 border-2 border-blue-300 border-dashed' : ''}`}
        >
          {tasks.map((task, index) => (
            <Card
              key={task.id}
              task={task}
              columnId={column.id}
              index={index}
              moveTask={moveTask}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
