'use client';

import { useEffect, useRef } from 'react';
import { gantt } from 'dhtmlx-gantt';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';

export default function DHtmlxGanttChart() {
  const ganttContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ganttContainer.current) {
      gantt.config.date_format = '%Y-%m-%d';
      gantt.config.scale_unit = 'day';
      gantt.config.step = 1;
      gantt.config.date_scale = '%d %M';
      gantt.config.subscales = [
        { unit: 'month', step: 1, date: '%F %Y' }
      ];

      gantt.init(ganttContainer.current);

      gantt.parse({
        data: [
          {
            id: 1,
            text: 'Project Planning',
            start_date: '2024-01-01',
            duration: 15,
            progress: 1,
            open: true
          },
          {
            id: 2,
            text: 'Design Phase',
            start_date: '2024-01-10',
            duration: 15,
            progress: 0.8,
            parent: 1
          },
          {
            id: 3,
            text: 'Development Sprint 1',
            start_date: '2024-01-20',
            duration: 21,
            progress: 0.6,
            parent: 1
          },
          {
            id: 4,
            text: 'Development Sprint 2',
            start_date: '2024-02-05',
            duration: 20,
            progress: 0.4,
            parent: 1
          },
          {
            id: 5,
            text: 'Testing & QA',
            start_date: '2024-02-20',
            duration: 18,
            progress: 0.2,
            parent: 1
          },
          {
            id: 6,
            text: 'Deployment',
            start_date: '2024-03-05',
            duration: 10,
            progress: 0,
            parent: 1
          },
        ],
        links: [
          { id: 1, source: 1, target: 2, type: '0' },
          { id: 2, source: 2, target: 3, type: '0' },
          { id: 3, source: 3, target: 4, type: '0' },
          { id: 4, source: 4, target: 5, type: '0' },
          { id: 5, source: 5, target: 6, type: '0' },
        ]
      });
    }

    return () => {
      if (ganttContainer.current) {
        gantt.clearAll();
      }
    };
  }, []);

  return (
    <div className="w-full h-full">
      <div ref={ganttContainer} style={{ width: '100%', height: '100%' }}></div>
    </div>
  );
}
