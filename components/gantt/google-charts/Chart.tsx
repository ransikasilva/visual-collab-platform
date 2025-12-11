'use client';

import { useState, useRef, useEffect } from 'react';
import { Chart } from 'react-google-charts';
import { Plus, Edit2, Trash2 } from 'lucide-react';

interface Task {
  id: string;
  name: string;
  resource: string;
  startDate: Date;
  endDate: Date;
  progress: number;
  dependencies: string;
}

const initialTasks: Task[] = [
  {
    id: 'task1',
    name: 'Project Planning',
    resource: 'Planning',
    startDate: new Date(2024, 0, 1),
    endDate: new Date(2024, 0, 15),
    progress: 100,
    dependencies: '',
  },
  {
    id: 'task2',
    name: 'Design Phase',
    resource: 'Design',
    startDate: new Date(2024, 0, 10),
    endDate: new Date(2024, 0, 25),
    progress: 80,
    dependencies: 'task1',
  },
  {
    id: 'task3',
    name: 'Development Sprint 1',
    resource: 'Development',
    startDate: new Date(2024, 0, 20),
    endDate: new Date(2024, 1, 10),
    progress: 60,
    dependencies: 'task2',
  },
];

export default function GoogleChartsGantt() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const tableRef = useRef<HTMLDivElement>(null);

  const chartData = [
    [
      { type: 'string', label: 'Task ID' },
      { type: 'string', label: 'Task Name' },
      { type: 'string', label: 'Resource' },
      { type: 'date', label: 'Start Date' },
      { type: 'date', label: 'End Date' },
      { type: 'number', label: 'Duration' },
      { type: 'number', label: 'Percent Complete' },
      { type: 'string', label: 'Dependencies' },
    ],
    ...tasks.map((task) => [
      task.id,
      task.name,
      task.resource,
      task.startDate,
      task.endDate,
      null,
      task.progress,
      task.dependencies || null,
    ]),
  ];

  const options = {
    height: 400,
    gantt: {
      trackHeight: 30,
      criticalPathEnabled: true,
      criticalPathStyle: {
        stroke: '#e64a19',
        strokeWidth: 2,
      },
      innerGridHorizLine: {
        stroke: '#efefef',
        strokeWidth: 1,
      },
      innerGridTrack: { fill: '#f9f9f9' },
      innerGridDarkTrack: { fill: '#f0f0f0' },
      labelStyle: {
        fontName: 'Inter, sans-serif',
        fontSize: 12,
        color: '#1f2937',
      },
    },
  };

  const addTask = () => {
    const newTask: Task = {
      id: `task${tasks.length + 1}`,
      name: 'New Task',
      resource: 'Resource',
      startDate: new Date(),
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      progress: 0,
      dependencies: '',
    };
    setTasks([...tasks, newTask]);
    setEditingTask(newTask);
  };

  // Scroll to bottom when a new task is added
  useEffect(() => {
    if (editingTask && tableRef.current) {
      setTimeout(() => {
        tableRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }, 100);
    }
  }, [editingTask]);

  const updateTask = (updatedTask: Task) => {
    setTasks(tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
    setEditingTask(null);
  };

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter((t) => t.id !== taskId));
    if (editingTask?.id === taskId) {
      setEditingTask(null);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Toolbar */}
      <div className="bg-gray-100 rounded-lg p-4 flex items-center gap-3">
        <button
          onClick={addTask}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
        >
          <Plus size={16} />
          Add Task
        </button>
        <div className="flex-1"></div>
        <span className="text-xs text-gray-600">
          Click Add Task to create • Edit tasks in the table below
        </span>
      </div>

      {/* Chart */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <Chart chartType="Gantt" width="100%" height="400px" data={chartData} options={options} />
      </div>

      {/* Task List/Editor */}
      <div ref={tableRef} className="bg-white rounded-lg shadow-sm border overflow-auto max-h-96">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Task Name</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Resource</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Start Date</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">End Date</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Progress</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Dependencies</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id} className="border-b hover:bg-gray-50">
                {editingTask?.id === task.id ? (
                  <>
                    <td className="px-4 py-3">
                      <input
                        type="text"
                        value={editingTask.name}
                        onChange={(e) => setEditingTask({ ...editingTask, name: e.target.value })}
                        className="w-full px-2 py-1 border rounded"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="text"
                        value={editingTask.resource}
                        onChange={(e) => setEditingTask({ ...editingTask, resource: e.target.value })}
                        className="w-full px-2 py-1 border rounded"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="date"
                        value={editingTask.startDate.toISOString().split('T')[0]}
                        onChange={(e) => setEditingTask({ ...editingTask, startDate: new Date(e.target.value) })}
                        className="w-full px-2 py-1 border rounded"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="date"
                        value={editingTask.endDate.toISOString().split('T')[0]}
                        onChange={(e) => setEditingTask({ ...editingTask, endDate: new Date(e.target.value) })}
                        className="w-full px-2 py-1 border rounded"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={editingTask.progress}
                        onChange={(e) => setEditingTask({ ...editingTask, progress: Number(e.target.value) })}
                        className="w-full px-2 py-1 border rounded"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="text"
                        value={editingTask.dependencies}
                        onChange={(e) => setEditingTask({ ...editingTask, dependencies: e.target.value })}
                        className="w-full px-2 py-1 border rounded"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => updateTask(editingTask)}
                        className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-xs mr-2"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingTask(null)}
                        className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 text-xs"
                      >
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="px-4 py-3">{task.name}</td>
                    <td className="px-4 py-3">{task.resource}</td>
                    <td className="px-4 py-3">{task.startDate.toISOString().split('T')[0]}</td>
                    <td className="px-4 py-3">{task.endDate.toISOString().split('T')[0]}</td>
                    <td className="px-4 py-3">{task.progress}%</td>
                    <td className="px-4 py-3">{task.dependencies || '-'}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => setEditingTask(task)}
                        className="p-1 text-blue-500 hover:bg-blue-50 rounded mr-2"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="p-1 text-red-500 hover:bg-red-50 rounded"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
