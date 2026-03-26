'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

export default function HorizontalScroller({ children }: { children: React.ReactNode }) {
  const scrollRef = useRef<HTMLElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const lenis = new Lenis({
      wrapper: el,
      content: el,
      orientation: 'horizontal',
      gestureOrientation: 'both',
      smoothWheel: true,
      wheelMultiplier: 1.2,
      touchMultiplier: 1.5,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Expose lenis to window for external navigation triggers (like HOME button)
    (window as any).lenisHorizontal = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    document.body.style.overflow = 'hidden';

    return () => {
      lenis.destroy();
      document.body.style.overflow = '';
      delete (window as any).lenisHorizontal;
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
