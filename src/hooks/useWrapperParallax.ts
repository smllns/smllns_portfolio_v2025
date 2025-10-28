// parallax animation for about section
import gsap from 'gsap';
import { useEffect } from 'react';

export function useWrapperParallax(
  wrapperRef: React.RefObject<HTMLDivElement | null>,
  trigger: HTMLElement | null
) {
  useEffect(() => {
    if (!trigger || !wrapperRef.current) return;

    const targetY = window.innerWidth < 640 ? 300 : 500;

    gsap.fromTo(
      wrapperRef.current,
      { y: 0 },
      {
        y: targetY,
        ease: 'power1.out',
        scrollTrigger: {
          trigger,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
          invalidateOnRefresh: true,
        },
      }
    );
  }, [wrapperRef, trigger]);
}
