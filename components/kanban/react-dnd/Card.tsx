'use client';

import { useRef } from 'react';
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd';
import { GripVertical } from 'lucide-react';
import type { Identifier, XYCoord } from 'dnd-core';

interface Task {
  id: string;
  content: string;
  priority: 'low' | 'medium' | 'high';
}

interface CardProps {
  task: Task;
  columnId: string;
  index: number;
  moveTask: (taskId: string, sourceColumnId: string, targetColumnId: string, targetIndex: number) => void;
}

interface DragItem {
  id: string;
  columnId: string;
  index: number;
  type: string;
}

export default function Card({ task, columnId, index, moveTask }: CardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: 'TASK',
    item: () => {
      return { id: task.id, columnId, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ handlerId }, drop] = useDrop<DragItem, void, { handlerId: Identifier | null }>({
    accept: 'TASK',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor: DropTargetMonitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      const dragColumnId = item.columnId;
      const hoverColumnId = columnId;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex && dragColumnId === hoverColumnId) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragColumnId === hoverColumnId && dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragColumnId === hoverColumnId && dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      moveTask(item.id, dragColumnId, hoverColumnId, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
      item.columnId = hoverColumnId;
    },
  });

  drag(drop(ref));

  const priorityConfig = {
    high: { color: 'bg-red-100 text-red-700' },
    medium: { color: 'bg-yellow-100 text-yellow-700' },
    low: { color: 'bg-green-100 text-green-700' },
  };

  return (
    <div
      ref={ref}
      data-handler-id={handlerId}
      className={`bg-white rounded-lg p-4 shadow-sm border border-gray-200
                  hover:shadow-md transition-all cursor-move
                  ${isDragging ? 'opacity-50' : ''}`}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm text-gray-900 flex-1">{task.content}</p>
        <div className="flex items-center gap-2">
          <div
            className={`px-2 py-1 rounded text-xs font-medium ${priorityConfig[task.priority].color}`}
          >
            {task.priority}
          </div>
          <GripVertical size={16} className="text-gray-400 cursor-grab" />
        </div>
      </div>
    </div>
  );
}
