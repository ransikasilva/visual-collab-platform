'use client';

import { Suspense, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import TechBadge from '@/components/layout/TechBadge';
import 'tldraw/tldraw.css';

const Tldraw = dynamic(
  () =>
    import('tldraw').then((mod) => {
      console.log('✅ Tldraw module loaded successfully');
      console.log('Tldraw component:', mod.Tldraw);
      return mod.Tldraw;
    }),
  {
    ssr: false,
    loading: () => {
      console.log('⏳ Tldraw is loading...');
      return (
        <div className="w-full h-full flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading whiteboard...</p>
          </div>
        </div>
      );
    },
  }
);

export default function TldrawPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    console.log('📍 TldrawPage mounted');
    setMounted(true);

    // Check if CSS is loaded
    const links = document.querySelectorAll('link[rel="stylesheet"]');
    console.log('📄 Loaded stylesheets:', Array.from(links).map(l => l.getAttribute('href')));

    // Check for tldraw-specific styles
    const styles = document.querySelectorAll('style');
    console.log('📝 Style tags count:', styles.length);

    // Check if tldraw classes exist
    const hasTldrawClasses = document.querySelector('.tl-container');
    console.log('🎨 Has tldraw classes in DOM:', !!hasTldrawClasses);

    // Check computed styles
    setTimeout(() => {
      const tldrawDiv = document.querySelector('[data-tldraw]');
      if (tldrawDiv) {
        const computed = window.getComputedStyle(tldrawDiv);
        console.log('💅 Tldraw div computed position:', computed.position);
        console.log('💅 Tldraw div computed display:', computed.display);
      }
    }, 1000);

    return () => {
      console.log('📍 TldrawPage unmounted');
    };
  }, []);

  useEffect(() => {
    if (mounted) {
      console.log('🎨 Tldraw container rendered');
      const container = document.querySelector('.tldraw');
      console.log('Tldraw container element:', container);
    }
  }, [mounted]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      <div className="bg-white border-b px-6 py-4" style={{ flexShrink: 0 }}>
        <h2 className="text-2xl font-bold mb-2">Whiteboard - Tldraw</h2>
        <p className="text-gray-600 mb-3">
          Modern whiteboard with smooth UX, similar to Figma's FigJam
        </p>
        <div className="flex flex-wrap gap-2">
          <TechBadge name="tldraw" variant="primary" />
          <TechBadge name="Modern UI" />
          <TechBadge name="Figma-like" />
        </div>
      </div>

      <div
        style={{ flex: 1, position: 'relative', overflow: 'hidden' }}
        ref={(el) => {
          if (el) {
            console.log('📦 Tldraw container div dimensions:', {
              width: el.offsetWidth,
              height: el.offsetHeight,
              clientWidth: el.clientWidth,
              clientHeight: el.clientHeight,
            });
          }
        }}
      >
        <Suspense fallback={
          <div className="w-full h-full flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading whiteboard...</p>
            </div>
          </div>
        }>
          {mounted ? (
            <>
              {console.log('🚀 Rendering Tldraw component')}
              <Tldraw onMount={() => console.log('✨ Tldraw onMount callback fired')} />
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-50">
              <p className="text-gray-600">Initializing...</p>
            </div>
          )}
        </Suspense>
      </div>
    </div>
  );
}
