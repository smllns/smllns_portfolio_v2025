'use client';
import React, { useEffect } from 'react';
import { gsap } from 'gsap';

export const handleMove = (
  e: React.MouseEvent,
  i: number,
  imageRefs: React.RefObject<(HTMLDivElement | null)[]>,
  innerRefs: React.RefObject<(HTMLDivElement | null)[]>
) => {
  if (window.innerWidth < 768) return;
  const wrapper = imageRefs.current[i];
  const inner = innerRefs.current[i];
  if (!wrapper || !inner) return;

  const rect = wrapper.getBoundingClientRect();
  const relX = e.clientX - rect.left;
  const relY = e.clientY - rect.top;

  const normX = (relX / rect.width - 0.5) * 2;
  const normY = (relY / rect.height - 0.5) * 2;

  const moveX = normX * Math.abs(normX) * 25;
  const moveY = normY * Math.abs(normY) * 25;

  gsap.to(inner, {
    x: moveX,
    y: moveY,
    duration: 0.6,
    ease: 'power3.out',
  });
};

export const handleLeave = (
  i: number,
  innerRefs: React.RefObject<(HTMLDivElement | null)[]>
) => {
  if (window.innerWidth < 768) return;
  const inner = innerRefs.current[i];
  if (!inner) return;

  gsap.to(inner, {
    x: 0,
    y: 0,
    duration: 0.8,
    ease: 'elastic.out(1, 0.4)',
  });
};

export function useProjectOverviewAnimations({
  containerRef,
  textRef,
  imageRefs,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>;
  textRef: React.RefObject<HTMLDivElement | null>;
  imageRefs: React.RefObject<(HTMLDivElement | null)[]>;
}) {
  useEffect(() => {
    const container = containerRef.current;
    const text = textRef.current;
    const images = imageRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!container || !text || images.length === 0) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      const textInTl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top 30%',
          end: 'top 5%',
          scrub: 1,
        },
      });

      textInTl.fromTo(
        text,
        { x: '100vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'power2.out' },
        0
      );

      const textOutTl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'bottom 50%',
          end: 'bottom 30%',
          scrub: 1,
        },
      });

      textOutTl.to(text, { x: '100vw', opacity: 0, ease: 'power2.out' }, 0);

      gsap.to(container, {
        backgroundColor: '#f5f5f5',
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'bottom 35%',
          end: 'bottom 30%',
          scrub: 1,
        },
      });

      //desktop animations
      mm.add('(min-width: 768px)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: 'top 80%',
            end: 'top 10%',
            scrub: 1,
          },
        });

        images.forEach((img, i) => {
          const targetX = i === 0 ? '45vw' : i === 1 ? '20vw' : '0vw';
          const targetY = i === 0 ? '-20vh' : i === 1 ? '-10vh' : '20vh';

          tl.to(
            img,
            {
              x: targetX,
              y: targetY,
              rotation: 0,
              scale: 1,
              opacity: 1,
              ease: 'power2.out',
            },
            0
          );
        });

        const outTl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: 'bottom 90%',
            end: 'bottom 40%',
            scrub: 1,
          },
        });

        images.forEach((img, i) => {
          const targetX = i === 0 ? '-100vw' : i === 1 ? '-80vw' : '-60vw';
          const targetY = i === 0 ? '-22vh' : i === 1 ? '-10vh' : '20vh';

          outTl.to(
            img,
            {
              x: targetX,
              y: targetY,
              rotation: 0,
              scale: 0.2,
              opacity: 1,
              ease: 'power2.in',
            },
            0
          );
        });
      });

      // mobile animations
      mm.add('(max-width: 768px)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: 'top 85%',
            end: 'top 20%',
            scrub: 1,
          },
        });

        images.forEach((img, i) => {
          const targetX = i === 0 ? '0vw' : i === 1 ? '-25vw' : '-50vw';
          const targetY = i === 0 ? '-7vh' : i === 1 ? '4vh' : '20vh';

          tl.to(
            img,
            {
              x: targetX,
              y: targetY,
              rotation: 0,
              scale: 0.9,
              opacity: 1,
              ease: 'power2.out',
            },
            0
          );
        });

        const outTl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: 'bottom 95%',
            end: 'bottom 50%',
            scrub: 1,
          },
        });

        images.forEach((img, i) => {
          const targetX = i === 0 ? '-90vw' : i === 1 ? '-100vw' : '-120vw';
          const targetY = i === 0 ? '-7vh' : i === 1 ? '4vh' : '20vh';

          outTl.to(
            img,
            {
              x: targetX,
              y: targetY,
              rotation: 0,
              scale: 0.3,
              opacity: 1,
              ease: 'power2.in',
            },
            0
          );
        });
      });

      return () => mm.revert();
    });

    return () => {
      ctx.revert();
    };
  }, [containerRef, textRef, imageRefs]);
}
