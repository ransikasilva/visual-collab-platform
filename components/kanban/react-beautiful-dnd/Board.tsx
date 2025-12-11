'use client';

import { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { Plus } from 'lucide-react';

interface Task {
  id: string;
  content: string;
  priority: 'low' | 'medium' | 'high';
}

interface Column {
  id: string;
  title: string;
  taskIds: string[];
}

interface BoardData {
  tasks: Record<string, Task>;
  columns: Record<string, Column>;
  columnOrder: string[];
}

export default function BeautifulDndBoard() {
  const [data, setData] = useState<BoardData>({
    tasks: {
      'task-1': { id: 'task-1', content: 'Design system setup', priority: 'high' },
      'task-2': { id: 'task-2', content: 'Database schema', priority: 'medium' },
      'task-3': { id: 'task-3', content: 'API documentation', priority: 'low' },
      'task-4': { id: 'task-4', content: 'Code review', priority: 'medium' },
    },
    columns: {
      'col-1': { id: 'col-1', title: 'To Do', taskIds: ['task-1', 'task-2'] },
      'col-2': { id: 'col-2', title: 'In Progress', taskIds: ['task-3'] },
      'col-3': { id: 'col-3', title: 'Done', taskIds: ['task-4'] },
      'col-4': { id: 'col-4', title: 'Blocked', taskIds: [] },
    },
    columnOrder: ['col-1', 'col-2', 'col-3', 'col-4'],
  });

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const startColumn = data.columns[source.droppableId];
    const finishColumn = data.columns[destination.droppableId];

    if (startColumn === finishColumn) {
      const newTaskIds = Array.from(startColumn.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...startColumn,
        taskIds: newTaskIds,
      };

      setData({
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn,
        },
      });
      return;
    }

    const startTaskIds = Array.from(startColumn.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStartColumn = {
      ...startColumn,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finishColumn.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinishColumn = {
      ...finishColumn,
      taskIds: finishTaskIds,
    };

    setData({
      ...data,
      columns: {
        ...data.columns,
        [newStartColumn.id]: newStartColumn,
        [newFinishColumn.id]: newFinishColumn,
      },
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-4 h-full overflow-x-auto" suppressHydrationWarning>
        {data.columnOrder.map((columnId) => {
          const column = data.columns[columnId];
          const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);

          return (
            <div
              key={column.id}
              className="flex-shrink-0 w-[300px] bg-gray-100 rounded-lg p-4"
            >
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

              <Droppable droppableId={column.id} isDropDisabled={false} isCombineEnabled={false}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`space-y-3 min-h-[200px] transition-colors
                      ${snapshot.isDraggingOver ? 'bg-blue-50 rounded-lg p-2' : ''}`}
                  >
                    {tasks.map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`bg-white rounded-lg p-4 shadow-sm border border-gray-200
                              hover:shadow-md transition-all
                              ${snapshot.isDragging ? 'shadow-lg rotate-2' : ''}`}
                          >
                            <div className="flex items-start justify-between">
                              <p className="text-sm text-gray-900 flex-1">{task.content}</p>
                              <div
                                className={`ml-2 px-2 py-1 rounded text-xs font-medium
                                  ${
                                    task.priority === 'high'
                                      ? 'bg-red-100 text-red-700'
                                      : task.priority === 'medium'
                                      ? 'bg-yellow-100 text-yellow-700'
                                      : 'bg-green-100 text-green-700'
                                  }`}
                              >
                                {task.priority}
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          );
        })}
      </div>
    </DragDropContext>
  );
}
