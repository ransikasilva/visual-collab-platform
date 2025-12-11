'use client';

import { useCallback, useState } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  BackgroundVariant,
  Panel,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Plus, Square, Circle, Diamond, Trash2 } from 'lucide-react';

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Start' },
    position: { x: 250, y: 50 },
    style: { background: '#10b981', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px' },
  },
  {
    id: '2',
    data: { label: 'Process Data' },
    position: { x: 250, y: 150 },
    style: { background: '#3b82f6', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px' },
  },
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
];

let nodeId = 3;

export default function ReactFlowDiagram() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const addNode = (type: 'default' | 'input' | 'output', color: string) => {
    const newNode: Node = {
      id: `${nodeId++}`,
      type: type,
      data: { label: `Node ${nodeId - 1}` },
      position: { x: Math.random() * 400 + 100, y: Math.random() * 400 + 100 },
      style: {
        background: color,
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '8px'
      },
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const deleteSelected = () => {
    setNodes((nds) => nds.filter((node) => !node.selected));
    setEdges((eds) => eds.filter((edge) => !edge.selected));
  };

  return (
    <div className="w-full h-full bg-gray-50">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        nodesDraggable={true}
        nodesConnectable={true}
        elementsSelectable={true}
      >
        <Controls />
        <MiniMap />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />

        {/* Toolbar Panel */}
        <Panel position="top-left" className="bg-white rounded-lg shadow-lg p-3">
          <div className="flex flex-col gap-2">
            <div className="text-sm font-semibold text-gray-700 mb-2">Add Nodes</div>
            <button
              onClick={() => addNode('input', '#10b981')}
              className="flex items-center gap-2 px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm"
            >
              <Circle size={16} />
              Start Node
            </button>
            <button
              onClick={() => addNode('default', '#3b82f6')}
              className="flex items-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
            >
              <Square size={16} />
              Process Node
            </button>
            <button
              onClick={() => addNode('default', '#f59e0b')}
              className="flex items-center gap-2 px-3 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors text-sm"
            >
              <Diamond size={16} />
              Decision Node
            </button>
            <button
              onClick={() => addNode('output', '#ef4444')}
              className="flex items-center gap-2 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
            >
              <Circle size={16} />
              End Node
            </button>
            <div className="border-t border-gray-200 my-2"></div>
            <button
              onClick={deleteSelected}
              className="flex items-center gap-2 px-3 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm"
            >
              <Trash2 size={16} />
              Delete Selected
            </button>
          </div>
        </Panel>

        {/* Instructions Panel */}
        <Panel position="top-right" className="bg-white rounded-lg shadow-lg p-3 max-w-xs">
          <div className="text-xs text-gray-600">
            <div className="font-semibold mb-2">How to use:</div>
            <ul className="space-y-1">
              <li>• Click buttons to add nodes</li>
              <li>• Drag nodes to move them</li>
              <li>• Connect nodes by dragging from edge circles</li>
              <li>• Select & delete nodes/edges</li>
              <li>• Scroll to zoom, drag to pan</li>
            </ul>
          </div>
        </Panel>
      </ReactFlow>
    </div>
  );
}
