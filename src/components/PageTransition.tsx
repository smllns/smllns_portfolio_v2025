// page transition animations
'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

// 🎨 color map for routes
const routeColors: Record<string, string> = {
  '/portfolio/lunera': '#1a00c6',
  '/portfolio/film-club': '#8B5CF6',
  '/portfolio/moodflow': '#0be9f5',
  '/portfolio/crumb-bakery': '#016630',
  '/portfolio/fe-interview-hub': '#FF6FB5',
  '/': '#171717',
};

export default function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();

  const overlayTop = useRef<HTMLDivElement | null>(null);
  const overlayBottom = useRef<HTMLDivElement | null>(null);

  const pendingPathRef = useRef<string | null>(null);
  const isClosingRef = useRef(false);
  const currentColorRef = useRef<string>('#ff6fb5');

  const startTransition = useCallback(
    (to: string) => {
      if (!overlayTop.current || !overlayBottom.current || isClosingRef.current)
        return;

      isClosingRef.current = true;
      pendingPathRef.current = to;

      const color = routeColors[to] || routeColors['/'];
      currentColorRef.current = color;

      gsap.set([overlayTop.current, overlayBottom.current], {
        backgroundColor: color,
      });

      const tl = gsap.timeline({
        onComplete: () => {
          router.push(to);
        },
      });

      tl.to([overlayTop.current, overlayBottom.current], {
        height: '50%',
        duration: 0.8,
        ease: 'power4.inOut',
        stagger: 0.04,
      });
    },
    [router]
  );

  // exporting global function
  useEffect(() => {
    window.pageTransition = (to: string) => startTransition(to);
    return () => {
      delete window.pageTransition;
    };
  }, [startTransition]);

  useEffect(() => {
    const pending = pendingPathRef.current;
    if (!pending || !isClosingRef.current) return;

    if (pathname === pending) {
      if (!overlayTop.current || !overlayBottom.current) return;

      const tl = gsap.timeline({
        onComplete: () => {
          isClosingRef.current = false;
          pendingPathRef.current = null;
          gsap.set([overlayTop.current, overlayBottom.current], { height: 0 });
        },
      });

      tl.to([overlayTop.current, overlayBottom.current], {
        height: 0,
        duration: 0.5,
        ease: 'power4.inOut',
        stagger: 0.03,
        delay: 0.08,
      });
    }
  }, [pathname]);

  useEffect(() => {
    if (overlayTop.current && overlayBottom.current) {
      gsap.set([overlayTop.current, overlayBottom.current], { height: 0 });
    }
  }, []);

  return (
    <>
      <div
        ref={overlayTop}
        className='pointer-events-none fixed top-0 left-0 w-full h-0 z-9999 '
        style={{
          transformOrigin: 'top',
          backgroundColor: currentColorRef.current,
        }}
      />
      <div
        ref={overlayBottom}
        className='pointer-events-none fixed bottom-0 left-0 w-full h-0 z-9999'
        style={{
          transformOrigin: 'bottom',
          backgroundColor: currentColorRef.current,
        }}
      />
    </>
  );
}
