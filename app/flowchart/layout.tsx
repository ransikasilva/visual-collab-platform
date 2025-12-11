'use client';

import SubNavigation from '@/components/layout/SubNavigation';

const flowchartTabs = [
  { name: 'React Flow (Popular)', href: '/flowchart/react-flow' },
  { name: 'Mermaid (Text-based)', href: '/flowchart/mermaid' },
];

export default function FlowchartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full flex flex-col">
      <SubNavigation tabs={flowchartTabs} />
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  );
}
