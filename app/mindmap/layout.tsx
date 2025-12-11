'use client';

import SubNavigation from '@/components/layout/SubNavigation';

const mindmapTabs = [
  { name: 'Markmap (Markdown)', href: '/mindmap/markmap' },
  { name: 'Force Graph (Network)', href: '/mindmap/force-graph' },
  { name: 'React MindMap (Traditional)', href: '/mindmap/react-mindmap' },
];

export default function MindmapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full flex flex-col">
      <SubNavigation tabs={mindmapTabs} />
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  );
}
