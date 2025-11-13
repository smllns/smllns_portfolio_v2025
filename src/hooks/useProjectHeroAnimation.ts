import { useEffect } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';

interface AnimationRefs {
  containerRef: React.RefObject<HTMLDivElement | null>;
  btnRef: React.RefObject<HTMLDivElement | null>;
  imageRef: React.RefObject<HTMLDivElement | null>;
}

export const useProjectHeroAnimation = ({
  containerRef,
  btnRef,
  imageRef,
}: AnimationRefs) => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      // Split text lines and wrap each in overflow-hidden div
      const split = new SplitText('.split-title', { type: 'lines' });
      const maskWraps: HTMLDivElement[] = [];

      split.lines.forEach((line) => {
        const wrap = document.createElement('div');
        wrap.style.overflow = 'hidden';
        wrap.style.display = 'block';
        line.parentNode?.insertBefore(wrap, line);
        wrap.appendChild(line);
        maskWraps.push(wrap);
      });

      // Animate text lines
      tl.fromTo(
        split.lines,
        { yPercent: 100, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1.2, stagger: 0.1 },
        0.2
      );

      // Animate "Live Version" block
      tl.fromTo(
        '.livevers',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=1'
      );

      // Animate back button
      tl.fromTo(
        btnRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8 },
        '-=1'
      );

      // Animate image entrance
      tl.fromTo(
        imageRef.current,
        { xPercent: 50, opacity: 0, scale: 0.5 },
        {
          xPercent: 0,
          opacity: 1,
          scale: 1,
          duration: 2,
          ease: 'power4.out',
        },
        '-=1'
      );

      // Parallax scroll effect (responsive)
      const mm = gsap.matchMedia();

      mm.add(
        {
          isMobile: '(max-width: 639px)',
          isDesktop: '(min-width: 640px)',
        },
        (context) => {
          const { isMobile } = context.conditions as { isMobile: boolean };

          gsap.to(imageRef.current, {
            yPercent: isMobile ? 100 : 30,
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 1%',
              end: 'bottom top',
              scrub: true,
            },
          });
        }
      );

      // Store matchMedia for cleanup
      return { mm };
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [containerRef, btnRef, imageRef]);
};
