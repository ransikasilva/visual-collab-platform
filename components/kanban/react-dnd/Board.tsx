'use client';

import { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Column from './Column';

interface Task {
  id: string;
  content: string;
  priority: 'low' | 'medium' | 'high';
}

interface ColumnData {
  id: string;
  title: string;
  taskIds: string[];
}

interface BoardData {
  tasks: Record<string, Task>;
  columns: Record<string, ColumnData>;
  columnOrder: string[];
}

export default function ReactDndBoard() {
  const [data, setData] = useState<BoardData>({
    tasks: {
      'task-1': { id: 'task-1', content: 'Implement authentication', priority: 'high' },
      'task-2': { id: 'task-2', content: 'Setup CI/CD pipeline', priority: 'medium' },
      'task-3': { id: 'task-3', content: 'Write documentation', priority: 'low' },
      'task-4': { id: 'task-4', content: 'Review pull requests', priority: 'medium' },
      'task-5': { id: 'task-5', content: 'Deploy to production', priority: 'high' },
    },
    columns: {
      'col-1': { id: 'col-1', title: 'To Do', taskIds: ['task-1', 'task-2'] },
      'col-2': { id: 'col-2', title: 'In Progress', taskIds: ['task-3'] },
      'col-3': { id: 'col-3', title: 'Review', taskIds: ['task-4'] },
      'col-4': { id: 'col-4', title: 'Done', taskIds: ['task-5'] },
    },
    columnOrder: ['col-1', 'col-2', 'col-3', 'col-4'],
  });

  const moveTask = (taskId: string, sourceColumnId: string, targetColumnId: string, targetIndex: number) => {
    setData((prevData) => {
      // Moving within the same column
      if (sourceColumnId === targetColumnId) {
        const column = prevData.columns[sourceColumnId];
        const taskIds = Array.from(column.taskIds);
        const currentIndex = taskIds.indexOf(taskId);

        // Don't do anything if position hasn't changed
        if (currentIndex === targetIndex) {
          return prevData;
        }

        // Remove from current position
        taskIds.splice(currentIndex, 1);
        // Insert at new position
        taskIds.splice(targetIndex, 0, taskId);

        return {
          ...prevData,
          columns: {
            ...prevData.columns,
            [sourceColumnId]: {
              ...column,
              taskIds,
            },
          },
        };
      } else {
        // Moving between different columns
        const sourceColumn = prevData.columns[sourceColumnId];
        const targetColumn = prevData.columns[targetColumnId];

        const sourceTaskIds = Array.from(sourceColumn.taskIds);
        const targetTaskIds = Array.from(targetColumn.taskIds);

        // Remove from source
        const taskIndex = sourceTaskIds.indexOf(taskId);
        if (taskIndex === -1) {
          return prevData; // Task not found
        }
        sourceTaskIds.splice(taskIndex, 1);

        // Add to target
        targetTaskIds.splice(targetIndex, 0, taskId);

        return {
          ...prevData,
          columns: {
            ...prevData.columns,
            [sourceColumnId]: {
              ...sourceColumn,
              taskIds: sourceTaskIds,
            },
            [targetColumnId]: {
              ...targetColumn,
              taskIds: targetTaskIds,
            },
          },
        };
      }
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex gap-4 h-full overflow-x-auto" suppressHydrationWarning>
        {data.columnOrder.map((columnId) => {
          const column = data.columns[columnId];
          const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);

          return (
            <Column
              key={column.id}
              column={column}
              tasks={tasks}
              moveTask={moveTask}
            />
          );
        })}
      </div>
    </DndProvider>
  );
}
