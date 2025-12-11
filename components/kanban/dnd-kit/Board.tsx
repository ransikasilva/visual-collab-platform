'use client';

import { useState } from 'react';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
} from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import Column from './Column';
import Card from './Card';

interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  assignee?: string;
}

interface ColumnType {
  id: string;
  title: string;
  taskIds: string[];
}

export default function DndKitBoard() {
  const [tasks, setTasks] = useState<Record<string, Task>>({
    'task-1': {
      id: 'task-1',
      title: 'Design Homepage',
      description: 'Create wireframes and mockups',
      priority: 'high',
      assignee: 'John Doe',
    },
    'task-2': {
      id: 'task-2',
      title: 'API Integration',
      description: 'Connect frontend to backend',
      priority: 'medium',
    },
    'task-3': {
      id: 'task-3',
      title: 'Testing',
      description: 'Write unit tests',
      priority: 'low',
    },
  });

  const [columns, setColumns] = useState<Record<string, ColumnType>>({
    'col-1': { id: 'col-1', title: 'To Do', taskIds: ['task-1'] },
    'col-2': { id: 'col-2', title: 'In Progress', taskIds: ['task-2'] },
    'col-3': { id: 'col-3', title: 'Done', taskIds: ['task-3'] },
  });

  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    // Find columns
    const activeColumn = Object.values(columns).find((col) =>
      col.taskIds.includes(activeId)
    );
    const overColumn = Object.values(columns).find(
      (col) => col.id === overId || col.taskIds.includes(overId)
    );

    if (!activeColumn || !overColumn || activeColumn === overColumn) return;

    setColumns((prev) => {
      const activeItems = activeColumn.taskIds;
      const overItems = overColumn.taskIds;

      const activeIndex = activeItems.indexOf(activeId);
      const overIndex = overItems.indexOf(overId);

      const newActiveItems = activeItems.filter((id) => id !== activeId);
      const newOverItems = [...overItems];

      newOverItems.splice(overIndex >= 0 ? overIndex : overItems.length, 0, activeId);

      return {
        ...prev,
        [activeColumn.id]: { ...activeColumn, taskIds: newActiveItems },
        [overColumn.id]: { ...overColumn, taskIds: newOverItems },
      };
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-4 h-full" suppressHydrationWarning>
        {Object.values(columns).map((column) => (
          <Column
            key={column.id}
            column={column}
            tasks={column.taskIds.map((id) => tasks[id])}
          />
        ))}
      </div>

      <DragOverlay>
        {activeId ? (
          <Card task={tasks[activeId]} isDragging />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
