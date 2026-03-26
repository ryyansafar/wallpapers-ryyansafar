'use client';

import { useEffect, useRef } from 'react';

export default function HorizontalScroller({ children }: { children: React.ReactNode }) {
  const scrollRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    // Prevent vertical scrolling on the body globally
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100vh';

    const onWheel = (e: WheelEvent) => {
      // Catch ALL wheel events on the window to ensure we don't miss any translation
      // deltaY is for vertical scroll (our trigger), deltaX is for native horizontal
      if (Math.abs(e.deltaY) > 0 || Math.abs(e.deltaX) > 0) {
        e.preventDefault();
        
        // Combine deltaY and deltaX for a unified horizontal experience
        // We use a slight multiplier (1.0 - 1.5) if it feels too slow, but raw is usually best for precision
        el.scrollLeft += (e.deltaY + e.deltaX);
      }
    };

    // Use window listener to ensure it's captured everywhere
    window.addEventListener('wheel', onWheel, { passive: false });
    
    return () => {
      window.removeEventListener('wheel', onWheel);
      document.body.style.overflow = '';
      document.body.style.height = '';
    };
  }, []);

  return (
    <main
      id="h-scroll"
      ref={scrollRef}
      className="flex h-screen w-screen overflow-x-auto overflow-y-hidden snap-x snap-mandatory no-scrollbar bg-surface select-none"
    >
      {children}
    </main>
  );
}
