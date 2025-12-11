'use client';

import SubNavigation from '@/components/layout/SubNavigation';

const kanbanTabs = [
  { name: '@dnd-kit (Modern)', href: '/kanban/dnd-kit' },
  { name: 'react-beautiful-dnd (Jira)', href: '/kanban/react-beautiful-dnd' },
  { name: 'react-dnd (Advanced)', href: '/kanban/react-dnd' },
];

export default function KanbanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full flex flex-col">
      <SubNavigation tabs={kanbanTabs} />
      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  );
}
