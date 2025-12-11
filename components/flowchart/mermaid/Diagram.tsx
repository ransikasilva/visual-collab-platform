'use client';

import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

export default function MermaidDiagram() {
  const mermaidRef = useRef<HTMLDivElement>(null);
  const [code, setCode] = useState(`flowchart TD
    Start([Start]) --> Process[Process Data]
    Process --> Decision{Valid?}
    Decision -->|Yes| Save[Save to DB]
    Decision -->|No| Error[Handle Error]
    Save --> End([End])
    Error --> End

    style Start fill:#10b981,stroke:#059669,stroke-width:2px,color:#fff
    style Process fill:#3b82f6,stroke:#2563eb,stroke-width:2px,color:#fff
    style Decision fill:#f59e0b,stroke:#d97706,stroke-width:2px,color:#fff
    style Save fill:#8b5cf6,stroke:#7c3aed,stroke-width:2px,color:#fff
    style Error fill:#ef4444,stroke:#dc2626,stroke-width:2px,color:#fff
    style End fill:#6b7280,stroke:#4b5563,stroke-width:2px,color:#fff
`);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: 'default',
      securityLevel: 'loose',
      flowchart: {
        useMaxWidth: true,
        htmlLabels: true,
        curve: 'basis',
      },
    });
  }, []);

  useEffect(() => {
    if (mermaidRef.current) {
      mermaidRef.current.removeAttribute('data-processed');
      mermaid.contentLoaded();
    }
  }, [code]);

  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Code Editor */}
      <div className="bg-gray-100 rounded-lg p-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Edit Mermaid Code:
        </label>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full h-48 font-mono text-sm p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          spellCheck={false}
        />
      </div>

      {/* Diagram Display */}
      <div className="flex-1 bg-white rounded-lg shadow-sm border p-6 overflow-auto">
        <div ref={mermaidRef} className="mermaid">
          {code}
        </div>
      </div>
    </div>
  );
}
