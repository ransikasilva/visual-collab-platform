'use client';

import DHtmlxGanttChart from '@/components/gantt/dhtmlx/Chart';
import TechBadge from '@/components/layout/TechBadge';

export default function DHtmlxGanttPage() {
  return (
    <div className="h-full flex flex-col">
      <div className="bg-white border-b px-6 py-4">
        <h2 className="text-2xl font-bold mb-2">Gantt Chart - DHTMLX Gantt</h2>
        <p className="text-gray-600 mb-3">
          Enterprise-grade Gantt chart with advanced features
        </p>
        <div className="flex flex-wrap gap-2">
          <TechBadge name="dhtmlx-gantt" variant="primary" />
          <TechBadge name="Enterprise" />
          <TechBadge name="Advanced" />
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <DHtmlxGanttChart />
      </div>
    </div>
  );
}
