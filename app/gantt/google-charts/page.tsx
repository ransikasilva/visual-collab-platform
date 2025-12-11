'use client';

import GoogleChartsGantt from '@/components/gantt/google-charts/Chart';
import TechBadge from '@/components/layout/TechBadge';

export default function GoogleChartsGanttPage() {
  return (
    <div className="h-full flex flex-col">
      <div className="bg-white border-b px-6 py-4">
        <h2 className="text-2xl font-bold mb-2">Gantt Chart - Google Charts</h2>
        <p className="text-gray-600 mb-3">
          Simple Gantt chart using Google Charts library
        </p>
        <div className="flex flex-wrap gap-2">
          <TechBadge name="react-google-charts" variant="primary" />
          <TechBadge name="Simple" />
          <TechBadge name="Google Ecosystem" />
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <GoogleChartsGantt />
      </div>
    </div>
  );
}
