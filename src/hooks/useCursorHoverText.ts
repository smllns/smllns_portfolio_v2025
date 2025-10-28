import { useEffect } from 'react';
import { gsap } from 'gsap';

type HoverMap = Record<string, string>;

const HOVER_TEXT: HoverMap = {
  '.grabme': 'grab me',
  '.read': 'checkout my goodreads',
  '.watch': 'visit my letterboxd',
  '.avatar': 'spin me',
  '.livevers': 'see it in action',
  '.learn': 'click to learn more',
};

export const useCursorHoverText = (
  labelRef: React.RefObject<HTMLDivElement | null> | null
) => {
  useEffect(() => {
    if (!labelRef || !labelRef.current) return;

    const handleEnter = (e: PointerEvent) => {
      const el = e.target as HTMLElement;
      const selector = Object.keys(HOVER_TEXT).find((s) => el.closest(s));
      if (!selector) return;

      const text = HOVER_TEXT[selector];
      labelRef.current!.textContent = text;

      const isDark = [
        '.read',
        '.watch',
        '.avatar',
        '.livevers',
        '.learn',
      ].includes(selector);
      gsap.set(labelRef.current, {
        backgroundColor: isDark ? '#000000c7' : 'rgba(255,255,255,0.8)',
        color: isDark ? '#fff' : '#000',
        left: selector === '.grabme' ? '90px' : '120px',
      });

      gsap.to(labelRef.current, {
        opacity: 1,
        y: -30,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleLeave = (e: PointerEvent) => {
      const el = e.target as HTMLElement;
      const selector = Object.keys(HOVER_TEXT).find((s) => el.closest(s));
      if (!selector) return;

      gsap.to(labelRef.current, {
        opacity: 0,
        y: 0,
        duration: 0.3,
        ease: 'power2.in',
      });
    };

    window.addEventListener('pointerover', handleEnter);
    window.addEventListener('pointerout', handleLeave);

    return () => {
      window.removeEventListener('pointerover', handleEnter);
      window.removeEventListener('pointerout', handleLeave);
    };
  }, [labelRef]);
};
