'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

export default function HorizontalScroller({ children }: { children: React.ReactNode }) {
  const scrollRef = useRef<HTMLElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    // Initialize Lenis for smooth horizontal scrolling
    // 'gestureOrientation: both' handles vertical-to-horizontal mapping natively
    const lenis = new Lenis({
      wrapper: el, // Bind to our scroll container
      content: el, // Content is also the container in this flex layout
      orientation: 'horizontal',
      gestureOrientation: 'both',
      smoothWheel: true,
      wheelMultiplier: 1.2,
      touchMultiplier: 1.5,
      infinite: false,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Prevent vertical scrolling on the body globally to keep focus on our horizontal track
    document.body.style.overflow = 'hidden';

    return () => {
      lenis.destroy();
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <main
      id="h-scroll"
      ref={scrollRef}
      className="flex h-screen w-screen overflow-x-hidden overflow-y-hidden no-scrollbar bg-surface select-none"
    >
      <div className="flex h-full w-fit">
        {children}
      </div>
    </main>
  );
}
