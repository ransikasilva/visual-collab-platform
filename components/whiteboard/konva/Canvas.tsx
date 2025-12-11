'use client';

import { useState } from 'react';
import { Stage, Layer, Rect, Circle, Text, Line } from 'react-konva';
import { Square, Circle as CircleIcon, Type, Pencil, Trash2, MousePointer } from 'lucide-react';

interface Shape {
  id: string;
  type: 'rect' | 'circle' | 'text';
  x: number;
  y: number;
  fill?: string;
  width?: number;
  height?: number;
  radius?: number;
  text?: string;
}

interface DrawLine {
  id: string;
  points: number[];
  stroke: string;
}

export default function KonvaCanvas() {
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [lines, setLines] = useState<DrawLine[]>([]);
  const [tool, setTool] = useState<'select' | 'rect' | 'circle' | 'text' | 'draw'>('select');
  const [isDrawing, setIsDrawing] = useState(false);

  const handleStageClick = (e: any) => {
    if (tool === 'select' || tool === 'draw') return;

    const stage = e.target.getStage();
    const point = stage.getPointerPosition();

    const newShape: Shape = {
      id: `shape-${Date.now()}`,
      type: tool,
      x: point.x,
      y: point.y,
    };

    switch (tool) {
      case 'rect':
        newShape.width = 150;
        newShape.height = 100;
        newShape.fill = '#3b82f6';
        break;
      case 'circle':
        newShape.radius = 50;
        newShape.fill = '#ef4444';
        break;
      case 'text':
        newShape.text = 'Double click to edit';
        newShape.fill = '#1f2937';
        break;
    }

    setShapes([...shapes, newShape]);
  };

  const handleMouseDown = (e: any) => {
    if (tool !== 'draw') return;
    setIsDrawing(true);
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    setLines([...lines, { id: `line-${Date.now()}`, points: [point.x, point.y], stroke: '#1f2937' }]);
  };

  const handleMouseMove = (e: any) => {
    if (!isDrawing || tool !== 'draw') return;
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    const lastLine = lines[lines.length - 1];
    lastLine.points = lastLine.points.concat([point.x, point.y]);
    setLines([...lines.slice(0, -1), lastLine]);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    setShapes([]);
    setLines([]);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4 mb-4 flex items-center gap-2 border border-gray-200 shadow-sm">
        <button
          onClick={() => setTool('select')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all border ${
            tool === 'select'
              ? 'bg-blue-500 text-white border-blue-600 shadow-md'
              : 'bg-white hover:bg-gray-50 border-gray-300'
          }`}
        >
          <MousePointer size={18} />
          Select
        </button>
        <div className="w-px h-8 bg-gray-300 mx-1" />
        <button
          onClick={() => setTool('rect')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all border ${
            tool === 'rect'
              ? 'bg-blue-500 text-white border-blue-600 shadow-md'
              : 'bg-white hover:bg-gray-50 border-gray-300'
          }`}
        >
          <Square size={18} />
          Rectangle
        </button>
        <button
          onClick={() => setTool('circle')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all border ${
            tool === 'circle'
              ? 'bg-blue-500 text-white border-blue-600 shadow-md'
              : 'bg-white hover:bg-gray-50 border-gray-300'
          }`}
        >
          <CircleIcon size={18} />
          Circle
        </button>
        <button
          onClick={() => setTool('text')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all border ${
            tool === 'text'
              ? 'bg-blue-500 text-white border-blue-600 shadow-md'
              : 'bg-white hover:bg-gray-50 border-gray-300'
          }`}
        >
          <Type size={18} />
          Text
        </button>
        <button
          onClick={() => setTool('draw')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all border ${
            tool === 'draw'
              ? 'bg-blue-500 text-white border-blue-600 shadow-md'
              : 'bg-white hover:bg-gray-50 border-gray-300'
          }`}
        >
          <Pencil size={18} />
          Draw
        </button>
        <div className="flex-1" />
        <button
          onClick={clearCanvas}
          className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all shadow-md"
        >
          <Trash2 size={18} />
          Clear
        </button>
      </div>

      {/* Canvas */}
      <div className="flex-1 bg-white rounded-lg shadow-lg border-2 border-gray-200 overflow-hidden">
        <Stage
          width={window.innerWidth - 100}
          height={window.innerHeight - 300}
          onClick={handleStageClick}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          <Layer>
            {/* Render shapes */}
            {shapes.map((shape) => {
              if (shape.type === 'rect') {
                return (
                  <Rect
                    key={shape.id}
                    x={shape.x}
                    y={shape.y}
                    width={shape.width}
                    height={shape.height}
                    fill={shape.fill}
                    draggable={tool === 'select'}
                    stroke="#1d4ed8"
                    strokeWidth={2}
                    opacity={0.8}
                  />
                );
              }
              if (shape.type === 'circle') {
                return (
                  <Circle
                    key={shape.id}
                    x={shape.x}
                    y={shape.y}
                    radius={shape.radius}
                    fill={shape.fill}
                    draggable={tool === 'select'}
                    stroke="#b91c1c"
                    strokeWidth={2}
                    opacity={0.8}
                  />
                );
              }
              if (shape.type === 'text') {
                return (
                  <Text
                    key={shape.id}
                    x={shape.x}
                    y={shape.y}
                    text={shape.text}
                    fontSize={24}
                    fill={shape.fill}
                    draggable={tool === 'select'}
                  />
                );
              }
              return null;
            })}

            {/* Render lines */}
            {lines.map((line) => (
              <Line
                key={line.id}
                points={line.points}
                stroke={line.stroke}
                strokeWidth={3}
                tension={0.5}
                lineCap="round"
                lineJoin="round"
              />
            ))}
          </Layer>
        </Stage>
      </div>
    </div>
  );
}
