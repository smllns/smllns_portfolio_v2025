// animation for list in about me section
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HighlighterRef } from '@/components/sections/AboutSection';

export function useListAnimation(
  trigger: HTMLElement | null,
  highlighterRefs: React.RefObject<HighlighterRef | null>[]
) {
  useEffect(() => {
    if (!trigger) return;

    const items = trigger.querySelectorAll('ul > li');
    if (items.length === 0) return;

    gsap.set(items, { y: 50, opacity: 0 });

    const st = ScrollTrigger.create({
      trigger,
      start: 'top 30%',
      end: 'top 10%',
      scrub: true,
      onEnter: () => {
        gsap.to(items, {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 0.8,
          ease: 'power2.out',
          onComplete: () => highlighterRefs.forEach((r) => r.current?.start()),
        });
      },
      onLeaveBack: () => {
        gsap.to(items, {
          y: 50,
          opacity: 0,
          stagger: 0.2,
          duration: 0.8,
          ease: 'power2.out',
          onComplete: () => highlighterRefs.forEach((r) => r.current?.reset()),
        });
      },
    });

    return () => st.kill();
  }, [trigger, highlighterRefs]);
}
