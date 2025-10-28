import { gsap } from 'gsap';
import { useCallback, useEffect, useRef } from 'react';

export function useCircularCarousel({
  carouselRef,
  cardsRef,
  onRotate,
}: {
  carouselRef: React.RefObject<HTMLDivElement | null>;
  cardsRef: React.RefObject<HTMLDivElement[]>;
  onRotate?: (direction: 'left' | 'right') => void;
}) {
  const rotationRef = useRef(0);
  const sliceRef = useRef(0);
  const isAnimating = useRef(false);

  const updatePositions = useCallback(
    (rotation: number) => {
      const carousel = carouselRef.current;
      const cards = cardsRef.current;
      if (!carousel || !cards.length) return;

      const radius = carousel.offsetWidth;
      const center = radius / 2;
      const radian = Math.PI / 180;
      const slice = sliceRef.current;

      gsap.set(cards, {
        x: (i) => center + Math.sin((i * slice + rotation) * radian) * radius,
        y: (i) => center - Math.cos((i * slice + rotation) * radian) * radius,
        rotation: (i) => i * slice + rotation,
        zIndex: (i) =>
          Math.round((1 + Math.cos((i * slice + rotation) * radian)) * 100),
        xPercent: -50,
        yPercent: -50,
      });

      let maxDepth = -Infinity;
      let activeIndex = 0;
      cards.forEach((_, i) => {
        const depth = Math.cos((i * slice + rotation) * radian);
        if (depth > maxDepth) {
          maxDepth = depth;
          activeIndex = i;
        }
      });

      cards.forEach((card, i) => {
        gsap.to(card, {
          backgroundColor:
            i === activeIndex ? '#171717' : 'rgba(229, 229, 229, 0.4)',
          borderColor: i === activeIndex ? '#767676' : '#171717',
          duration: 0.4,
          ease: 'none',
          overwrite: 'auto',
        });
        gsap.to(card.querySelectorAll('h1, p'), {
          color: i === activeIndex ? '#f5f5f5' : '#171717',
          duration: 0.4,
          ease: 'none',
          overwrite: 'auto',
        });
      });
    },
    [carouselRef, cardsRef]
  );

  const rotate = (direction: 'left' | 'right') => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    const step = sliceRef.current;
    const targetRotation =
      rotationRef.current + (direction === 'right' ? -step : step);

    onRotate?.(direction);

    gsap.to(rotationRef, {
      current: targetRotation,
      duration: 0.8,
      ease: 'power2.inOut',
      onUpdate: () => {
        updatePositions(rotationRef.current);
      },
      onComplete: () => {
        rotationRef.current = targetRotation;
        isAnimating.current = false;
      },
    });
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    const cards = cardsRef.current;
    if (!carousel || !cards.length) return;

    const updateLayout = () => {
      const slice = 360 / cards.length;
      sliceRef.current = slice;

      updatePositions(rotationRef.current);
    };

    updateLayout();
    window.addEventListener('resize', updateLayout);
    return () => window.removeEventListener('resize', updateLayout);
  }, [carouselRef, cardsRef, updatePositions]);

  return { rotate };
}
