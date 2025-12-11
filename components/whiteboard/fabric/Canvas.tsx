'use client';

import { useEffect, useRef, useState } from 'react';
import { Square, Circle, Type, Pencil, Trash2, Download, MousePointer } from 'lucide-react';

export default function FabricCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const [tool, setTool] = useState<'select' | 'rect' | 'circle' | 'text' | 'draw'>('select');
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth - 100;
    canvas.height = window.innerHeight - 300;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = '#1f2937';
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctxRef.current = ctx;
    }
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (tool !== 'draw') return;
    setIsDrawing(true);
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      setLastX(e.clientX - rect.left);
      setLastY(e.clientY - rect.top);
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || tool !== 'draw' || !ctxRef.current) return;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;

    ctxRef.current.beginPath();
    ctxRef.current.moveTo(lastX, lastY);
    ctxRef.current.lineTo(currentX, currentY);
    ctxRef.current.stroke();

    setLastX(currentX);
    setLastY(currentY);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!ctxRef.current || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (tool === 'rect') {
      ctxRef.current.fillStyle = '#3b82f6';
      ctxRef.current.globalAlpha = 0.8;
      ctxRef.current.fillRect(x - 75, y - 50, 150, 100);
      ctxRef.current.strokeStyle = '#1d4ed8';
      ctxRef.current.lineWidth = 2;
      ctxRef.current.strokeRect(x - 75, y - 50, 150, 100);
      ctxRef.current.globalAlpha = 1;
    } else if (tool === 'circle') {
      ctxRef.current.fillStyle = '#ef4444';
      ctxRef.current.globalAlpha = 0.8;
      ctxRef.current.beginPath();
      ctxRef.current.arc(x, y, 50, 0, Math.PI * 2);
      ctxRef.current.fill();
      ctxRef.current.strokeStyle = '#b91c1c';
      ctxRef.current.lineWidth = 2;
      ctxRef.current.stroke();
      ctxRef.current.globalAlpha = 1;
    } else if (tool === 'text') {
      ctxRef.current.fillStyle = '#1f2937';
      ctxRef.current.font = '24px Arial';
      ctxRef.current.fillText('Click to add text', x, y);
    }
  };

  const clearCanvas = () => {
    if (!ctxRef.current || !canvasRef.current) return;
    ctxRef.current.fillStyle = '#ffffff';
    ctxRef.current.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  const downloadCanvas = () => {
    if (!canvasRef.current) return;
    const dataURL = canvasRef.current.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = 'whiteboard.png';
    link.href = dataURL;
    link.click();
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
          <Circle size={18} />
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
          onClick={downloadCanvas}
          className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all shadow-md"
        >
          <Download size={18} />
          Export
        </button>
        <button
          onClick={clearCanvas}
          className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all shadow-md"
        >
          <Trash2 size={18} />
          Clear
        </button>
      </div>

      {/* Canvas */}
      <div className="flex-1 bg-white rounded-lg shadow-lg border-2 border-gray-200 overflow-auto flex items-center justify-center">
        <canvas
          ref={canvasRef}
          className="border border-gray-300 shadow-inner cursor-crosshair"
          onClick={handleCanvasClick}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
        />
      </div>
    </div>
  );
}
