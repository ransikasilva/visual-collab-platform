'use client';

import SubNavigation from '@/components/layout/SubNavigation';

const whiteboardTabs = [
  { name: 'Excalidraw (Hand-drawn)', href: '/whiteboard/excalidraw' },
  { name: 'Tldraw (Figma-like)', href: '/whiteboard/tldraw' },
  { name: 'Fabric.js (Full Control)', href: '/whiteboard/fabric' },
  { name: 'React Konva (Canvas)', href: '/whiteboard/konva' },
];

export default function WhiteboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full flex flex-col">
      <SubNavigation tabs={whiteboardTabs} />
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  );
}
