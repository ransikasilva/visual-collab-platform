'use client';

import { useEffect, useRef, useState } from 'react';
import { Transformer } from 'markmap-lib';
import { Markmap } from 'markmap-view';
import { Edit2 } from 'lucide-react';

const defaultMarkdown = `# Project Management

## Planning Phase
- Define objectives
- Set milestones
- Allocate resources

## Development
### Frontend
- React Components
- Tailwind CSS
- State Management
### Backend
- API Development
- Database Design
- Authentication

## Testing
- Unit Tests
- Integration Tests
- E2E Tests

## Deployment
- CI/CD Pipeline
- Monitoring
- Maintenance
`;

export default function MarkmapViewer() {
  const svgRef = useRef<SVGSVGElement>(null);
  const markmapRef = useRef<Markmap | null>(null);
  const [markdown, setMarkdown] = useState(defaultMarkdown);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (svgRef.current) {
      const transformer = new Transformer();
      const { root } = transformer.transform(markdown);

      if (!markmapRef.current) {
        markmapRef.current = Markmap.create(svgRef.current, {
          duration: 500,
          maxWidth: 0,
          initialExpandLevel: 2,
          paddingX: 80,
          spacingVertical: 10,
          spacingHorizontal: 80,
          zoom: true,
          pan: true,
        });
      }

      markmapRef.current.setData(root);

      // Fit with some padding and zoom out
      setTimeout(() => {
        if (markmapRef.current && markmapRef.current.svg) {
          markmapRef.current.fit();
          // Apply zoom scale to zoom out
          const svg = markmapRef.current.svg;
          const g = svg.select('g');
          const currentTransform = g.attr('transform') || '';
          // Replace or adjust scale in transform
          if (currentTransform.includes('scale')) {
            g.attr('transform', currentTransform.replace(/scale\([^)]+\)/, 'scale(0.65)'));
          } else {
            g.attr('transform', currentTransform + ' scale(0.65)');
          }
        }
      }, 150);
    }
  }, [markdown]);

  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Toolbar */}
      <div className="bg-gray-100 rounded-lg p-4 flex items-center gap-3">
        <button
          onClick={() => setIsEditing(!isEditing)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-sm ${
            isEditing
              ? 'bg-blue-500 text-white hover:bg-blue-600'
              : 'bg-white text-gray-700 hover:bg-gray-200'
          }`}
        >
          <Edit2 size={16} />
          {isEditing ? 'View Mode' : 'Edit Markdown'}
        </button>
        <div className="flex-1"></div>
        <span className="text-xs text-gray-600">
          Write markdown to generate mind map • Click nodes to expand/collapse
        </span>
      </div>

      <div className="flex-1 flex gap-4">
        {/* Editor */}
        {isEditing && (
          <div className="w-1/2 bg-white rounded-lg shadow-sm border p-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Markdown Editor:
            </label>
            <textarea
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              className="w-full h-[calc(100%-2rem)] font-mono text-sm p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              spellCheck={false}
            />
          </div>
        )}

        {/* Mind Map */}
        <div className={`${isEditing ? 'w-1/2' : 'w-full'} bg-white rounded-lg shadow-sm border p-4`}>
          <svg ref={svgRef} style={{ width: '100%', height: '100%' }} />
        </div>
      </div>
    </div>
  );
}
