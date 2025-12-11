'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutGrid, Paintbrush, Workflow, Calendar, Brain } from 'lucide-react';

const tabs = [
  { name: 'Kanban Boards', href: '/kanban/dnd-kit', icon: LayoutGrid, base: '/kanban' },
  { name: 'Whiteboards', href: '/whiteboard/excalidraw', icon: Paintbrush, base: '/whiteboard' },
  { name: 'Flowcharts', href: '/flowchart/react-flow', icon: Workflow, base: '/flowchart' },
  { name: 'Gantt Charts', href: '/gantt/frappe', icon: Calendar, base: '/gantt' },
  { name: 'Mind Maps', href: '/mindmap/markmap', icon: Brain, base: '/mindmap' },
];

export default function MainNavigation() {
  const pathname = usePathname();

  return (
    <nav className="bg-white border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center space-x-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = pathname.startsWith(tab.base);

            return (
              <Link
                key={tab.name}
                href={tab.href}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors
                  ${
                    isActive
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                  }`}
              >
                <Icon size={18} />
                {tab.name}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
