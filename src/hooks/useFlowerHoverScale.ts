import gsap from 'gsap';
import { useEffect } from 'react';

export function useFlowerHoverScale(
  flowerRef: React.RefObject<HTMLDivElement | null>
) {
  useEffect(() => {
    const flower = flowerRef.current;
    if (!flower) return;

    const enter = () =>
      gsap.to(flower, { scale: 1.2, duration: 0.3, ease: 'power2.out' });
    const leave = () =>
      gsap.to(flower, { scale: 1, duration: 0.3, ease: 'power2.out' });

    flower.addEventListener('mouseenter', enter);
    flower.addEventListener('mouseleave', leave);

    return () => {
      flower.removeEventListener('mouseenter', enter);
      flower.removeEventListener('mouseleave', leave);
    };
  }, [flowerRef]);
}
