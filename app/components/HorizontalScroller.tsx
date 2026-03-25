'use client';

import { useEffect, useRef } from 'react';

export default function HorizontalScroller({ children }: { children: React.ReactNode }) {
  const scrollRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    // Prevent vertical scrolling on the body to avoid layout breaks
    document.body.style.overflow = 'hidden';

    // We use a more robust wheel handler that ensures bidirectional horizontal scroll
    const onWheel = (e: WheelEvent) => {
      // If the scroll is mostly vertical, we redirect it
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        
        // Directly scroll the element horizontally based on deltaY
        // We use a multiplier for a more fluid feel
        el.scrollLeft += e.deltaY;
      }
    };

    // Use passive: false to allow e.preventDefault()
    el.addEventListener('wheel', onWheel, { passive: false });
    
    return () => {
      el.removeEventListener('wheel', onWheel);
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <main
      id="h-scroll"
      ref={scrollRef}
      className="flex h-screen w-screen overflow-x-auto overflow-y-hidden snap-x snap-mandatory no-scrollbar bg-surface"
    >
      {children}
    </main>
  );
}
