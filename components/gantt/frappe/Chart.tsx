'use client';

import { useEffect, useRef, useState } from 'react';
import Gantt from 'frappe-gantt';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

export default function FrappeGanttChart() {
  const ganttRef = useRef<HTMLDivElement>(null);
  const ganttInstance = useRef<any>(null);
  const [viewMode, setViewMode] = useState<'Quarter Day' | 'Half Day' | 'Day' | 'Week' | 'Month'>('Day');

  const tasks = [
    {
      id: 'task1',
      name: 'Project Planning',
      start: '2024-01-01',
      end: '2024-01-15',
      progress: 100,
      dependencies: '',
    },
    {
      id: 'task2',
      name: 'Design Phase',
      start: '2024-01-10',
      end: '2024-01-25',
      progress: 80,
      dependencies: 'task1',
    },
    {
      id: 'task3',
      name: 'Development Sprint 1',
      start: '2024-01-20',
      end: '2024-02-10',
      progress: 60,
      dependencies: 'task2',
    },
    {
      id: 'task4',
      name: 'Development Sprint 2',
      start: '2024-02-05',
      end: '2024-02-25',
      progress: 40,
      dependencies: 'task3',
    },
    {
      id: 'task5',
      name: 'Testing & QA',
      start: '2024-02-20',
      end: '2024-03-10',
      progress: 20,
      dependencies: 'task4',
    },
    {
      id: 'task6',
      name: 'Deployment',
      start: '2024-03-05',
      end: '2024-03-15',
      progress: 0,
      dependencies: 'task5',
    },
  ];

  useEffect(() => {
    if (ganttRef.current && !ganttInstance.current) {
      ganttInstance.current = new Gantt(ganttRef.current, tasks, {
        view_mode: viewMode,
        bar_height: 30,
        bar_corner_radius: 3,
        arrow_curve: 5,
        padding: 18,
        view_modes: ['Quarter Day', 'Half Day', 'Day', 'Week', 'Month'],
        on_click: (task: any) => {
          console.log('Task clicked:', task);
        },
        on_date_change: (task: any, start: any, end: any) => {
          console.log('Date changed:', task, start, end);
        },
        on_progress_change: (task: any, progress: any) => {
          console.log('Progress changed:', task, progress);
        },
      });
    }
  }, []);

  useEffect(() => {
    if (ganttInstance.current) {
      ganttInstance.current.change_view_mode(viewMode);
    }
  }, [viewMode]);

  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Toolbar */}
      <div className="bg-gray-100 rounded-lg p-4 flex items-center gap-3">
        <Calendar size={20} className="text-gray-600" />
        <span className="text-sm font-medium text-gray-700">View Mode:</span>
        <div className="flex gap-2">
          {(['Quarter Day', 'Half Day', 'Day', 'Week', 'Month'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                viewMode === mode
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-200'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Gantt Chart */}
      <div className="flex-1 bg-white rounded-lg shadow-sm border overflow-auto p-4">
        <div ref={ganttRef}></div>
      </div>

      {/* Legend */}
      <div className="bg-gray-100 rounded-lg p-4">
        <div className="text-sm font-medium text-gray-700 mb-2">Legend:</div>
        <div className="flex flex-wrap gap-4 text-xs text-gray-600">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded"></div>
            <span>Task Progress</span>
          </div>
          <div className="flex items-center gap-2">
            <ChevronRight size={16} className="text-gray-400" />
            <span>Dependencies</span>
          </div>
          <div className="flex items-center gap-2">
            <span>• Drag bars to adjust dates</span>
          </div>
          <div className="flex items-center gap-2">
            <span>• Drag progress bar to update completion</span>
          </div>
        </div>
      </div>
    </div>
  );
}
