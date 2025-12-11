'use client';

import { useState } from 'react';
import { ChevronRight, ChevronDown, Plus, Edit2 } from 'lucide-react';

interface MindMapNode {
  text: string;
  children?: MindMapNode[];
}

const initialData: MindMapNode = {
  text: 'Project Management',
  children: [
    {
      text: 'Planning',
      children: [
        { text: 'Define Objectives' },
        { text: 'Set Milestones' },
        { text: 'Allocate Resources' },
      ],
    },
    {
      text: 'Development',
      children: [
        {
          text: 'Frontend',
          children: [
            { text: 'React Components' },
            { text: 'Tailwind CSS' },
            { text: 'State Management' },
          ],
        },
        {
          text: 'Backend',
          children: [
            { text: 'API Development' },
            { text: 'Database Design' },
            { text: 'Authentication' },
          ],
        },
      ],
    },
    {
      text: 'Testing',
      children: [
        { text: 'Unit Tests' },
        { text: 'Integration Tests' },
        { text: 'E2E Tests' },
      ],
    },
    {
      text: 'Deployment',
      children: [
        { text: 'CI/CD Pipeline' },
        { text: 'Monitoring' },
        { text: 'Maintenance' },
      ],
    },
  ],
};

function MindMapNodeComponent({
  node,
  level = 0,
}: {
  node: MindMapNode;
  level?: number;
}) {
  const [isExpanded, setIsExpanded] = useState(true);
  const hasChildren = node.children && node.children.length > 0;

  const colorClasses = [
    'bg-blue-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-500',
  ];

  const bgColor = colorClasses[level % colorClasses.length];

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        {hasChildren && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            {isExpanded ? (
              <ChevronDown size={16} className="text-gray-600" />
            ) : (
              <ChevronRight size={16} className="text-gray-600" />
            )}
          </button>
        )}
        <div
          className={`${bgColor} text-white px-4 py-2 rounded-lg shadow-sm font-medium text-sm ${
            level === 0 ? 'text-lg px-6 py-3' : ''
          }`}
        >
          {node.text}
        </div>
      </div>

      {hasChildren && isExpanded && (
        <div className={`ml-${level === 0 ? '8' : '6'} border-l-2 border-gray-300 pl-4 flex flex-col gap-2`}>
          {node.children!.map((child, index) => (
            <MindMapNodeComponent key={index} node={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function ReactMindmapViewer() {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 h-full overflow-auto">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Project Mind Map</h3>
        <p className="text-sm text-gray-600">
          Traditional hierarchical mind map - Click arrows to expand/collapse branches
        </p>
      </div>
      <div className="py-4">
        <MindMapNodeComponent node={initialData} />
      </div>
    </div>
  );
}
