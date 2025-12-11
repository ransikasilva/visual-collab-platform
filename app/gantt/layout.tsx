'use client';

import SubNavigation from '@/components/layout/SubNavigation';

const ganttTabs = [
  { name: 'Frappe Gantt (Lightweight)', href: '/gantt/frappe' },
  { name: 'DHTMLX Gantt (Enterprise)', href: '/gantt/dhtmlx' },
  { name: 'Google Charts (Simple)', href: '/gantt/google-charts' },
];

export default function GanttLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full flex flex-col">
      <SubNavigation tabs={ganttTabs} />
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  );
}
