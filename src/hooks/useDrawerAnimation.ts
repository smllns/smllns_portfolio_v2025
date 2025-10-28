import { gsap } from 'gsap';
import { useEffect } from 'react';

export const useDrawerAnimation = (
  isDrawerOpen: boolean,
  isMounted: boolean,
  overlayRef: React.RefObject<HTMLDivElement | null>,
  drawerRef: React.RefObject<HTMLDivElement | null>
) => {
  useEffect(() => {
    if (!overlayRef.current || !drawerRef.current || !isMounted) return;

    const overlay = overlayRef.current;
    const drawer = drawerRef.current;

    if (isDrawerOpen) {
      // Ensure visibility before animation
      gsap.set([overlay, drawer], {
        visibility: 'visible',
        pointerEvents: 'auto',
      });

      // Double RAF for smooth start after mount
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          gsap.fromTo(
            overlay,
            { opacity: 0 },
            { opacity: 1, duration: 0.3, ease: 'power2.out' }
          );
          gsap.fromTo(
            drawer,
            { y: 100, opacity: 0, scale: 0.96 },
            { y: 0, opacity: 1, scale: 1, duration: 0.45, ease: 'power3.out' }
          );
        });
      });
    } else {
      // Animate out, then hide
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set([overlay, drawer], {
            visibility: 'hidden',
            pointerEvents: 'none',
          });
        },
      });

      tl.to(drawer, {
        y: 100,
        opacity: 0,
        scale: 0.97,
        duration: 0.45,
        ease: 'power3.in',
      }).to(overlay, { opacity: 0, duration: 0.45, ease: 'power2.in' }, '<');
    }

    return () => {
      gsap.killTweensOf([overlay, drawer]);
    };
  }, [isDrawerOpen, isMounted, overlayRef, drawerRef]);
};
