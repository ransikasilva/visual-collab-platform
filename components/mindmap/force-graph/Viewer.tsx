'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Plus, Trash2 } from 'lucide-react';

const ForceGraph2D = dynamic(() => import('react-force-graph-2d'), { ssr: false });

interface Node {
  id: string;
  name: string;
  val: number;
  color: string;
}

interface Link {
  source: string;
  target: string;
}

const initialData = {
  nodes: [
    { id: '1', name: 'Project', val: 30, color: '#3b82f6' },
    { id: '2', name: 'Planning', val: 20, color: '#10b981' },
    { id: '3', name: 'Development', val: 20, color: '#f59e0b' },
    { id: '4', name: 'Testing', val: 20, color: '#8b5cf6' },
    { id: '5', name: 'Deployment', val: 20, color: '#ef4444' },
    { id: '6', name: 'Frontend', val: 15, color: '#06b6d4' },
    { id: '7', name: 'Backend', val: 15, color: '#ec4899' },
    { id: '8', name: 'Database', val: 15, color: '#14b8a6' },
  ],
  links: [
    { source: '1', target: '2' },
    { source: '1', target: '3' },
    { source: '1', target: '4' },
    { source: '1', target: '5' },
    { source: '3', target: '6' },
    { source: '3', target: '7' },
    { source: '3', target: '8' },
  ],
};

const colors = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444', '#06b6d4', '#ec4899', '#14b8a6'];

export default function ForceGraphViewer() {
  const [data, setData] = useState(initialData);
  const [newNodeName, setNewNodeName] = useState('');
  const [selectedParent, setSelectedParent] = useState('1');

  const addNode = () => {
    if (!newNodeName.trim()) return;

    const newNode: Node = {
      id: `${data.nodes.length + 1}`,
      name: newNodeName,
      val: 15,
      color: colors[data.nodes.length % colors.length],
    };

    setData({
      nodes: [...data.nodes, newNode],
      links: [...data.links, { source: selectedParent, target: newNode.id }],
    });
    setNewNodeName('');
  };

  const clearGraph = () => {
    setData({
      nodes: [{ id: '1', name: 'Root', val: 30, color: '#3b82f6' }],
      links: [],
    });
    setSelectedParent('1');
  };

  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Toolbar */}
      <div className="bg-gray-100 rounded-lg p-4">
        <div className="flex items-center gap-3 mb-3">
          <input
            type="text"
            value={newNodeName}
            onChange={(e) => setNewNodeName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addNode()}
            placeholder="Enter node name..."
            className="px-3 py-2 border rounded-lg text-sm flex-1 max-w-xs"
          />
          <select
            value={selectedParent}
            onChange={(e) => setSelectedParent(e.target.value)}
            className="px-3 py-2 border rounded-lg text-sm"
          >
            {data.nodes.map((node) => (
              <option key={node.id} value={node.id}>
                Connect to: {node.name}
              </option>
            ))}
          </select>
          <button
            onClick={addNode}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
          >
            <Plus size={16} />
            Add Node
          </button>
          <button
            onClick={clearGraph}
            className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm"
          >
            <Trash2 size={16} />
            Clear
          </button>
        </div>
        <div className="text-xs text-gray-600">
          Enter node name, select parent to connect, then click Add • Drag nodes to rearrange • Scroll to zoom
        </div>
      </div>

      {/* Graph */}
      <div className="flex-1 bg-white rounded-lg shadow-sm border" style={{ height: '700px' }}>
        <ForceGraph2D
          graphData={data}
          nodeLabel="name"
          width={1400}
          height={700}
          nodeCanvasObject={(node: any, ctx, globalScale) => {
            const label = node.name;
            const fontSize = 12 / globalScale;
            ctx.font = `${fontSize}px Sans-Serif`;

            // Draw circle with node's color
            ctx.fillStyle = node.color;
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.val / 2, 0, 2 * Math.PI, false);
            ctx.fill();

            // Add border
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 2 / globalScale;
            ctx.stroke();

            // Draw label
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = '#fff';
            ctx.font = `bold ${fontSize}px Sans-Serif`;
            ctx.fillText(label, node.x, node.y);
          }}
          linkColor={() => '#999'}
          linkWidth={2}
          backgroundColor="#ffffff"
          warmupTicks={100}
          cooldownTicks={0}
          d3VelocityDecay={0.3}
        />
      </div>
    </div>
  );
}
