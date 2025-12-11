'use client';

import FrappeGanttChart from '@/components/gantt/frappe/Chart';
import TechBadge from '@/components/layout/TechBadge';
import './frappe-gantt.css';

export default function FrappeGanttPage() {
  return (
    <div className="h-full flex flex-col">
      <div className="bg-white border-b px-6 py-4">
        <h2 className="text-2xl font-bold mb-2">Gantt Chart - Frappe Gantt</h2>
        <p className="text-gray-600 mb-3">
          Lightweight and interactive Gantt chart library
        </p>
        <div className="flex flex-wrap gap-2">
          <TechBadge name="frappe-gantt" variant="primary" />
          <TechBadge name="Lightweight" />
          <TechBadge name="Interactive" />
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <FrappeGanttChart />
      </div>
    </div>
  );
}
