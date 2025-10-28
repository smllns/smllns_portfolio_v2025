import gsap from 'gsap';
import { useEffect } from 'react';

export function useFlowerEntranceAnimation(
  flowerRef: React.RefObject<HTMLDivElement | null>,
  pathRef: React.RefObject<SVGPathElement | null>,
  circleRef: React.RefObject<SVGCircleElement | null>,
  delay: number
) {
  useEffect(() => {
    if (!flowerRef.current || !pathRef.current || !circleRef.current) return;

    const random = (min: number, max: number) =>
      Math.random() * (max - min) + min;
    const randomSign = () => (Math.random() < 0.5 ? 1 : -1);

    // Initial hidden state
    gsap.set(flowerRef.current, {
      scale: 0,
      rotate: randomSign() * random(20, 100),
      opacity: 0,
      transformOrigin: 'center',
    });
    gsap.set(pathRef.current, { fillOpacity: 0 });
    gsap.set(circleRef.current, { scale: 0, transformOrigin: 'center' });

    const tl = gsap.timeline({
      delay,
      defaults: { ease: 'power2.out' },
    });

    tl.to(flowerRef.current, {
      scale: 1,
      rotate: 0,
      opacity: 1,
      duration: 1.2,
      ease: 'back.out(3)',
    })
      .to(pathRef.current, { strokeWidth: 1.2, duration: 0.4 }, '<')
      .to(pathRef.current, { fillOpacity: 1, duration: 0.8 }, '>-0.2')
      .to(
        circleRef.current,
        { scale: 1, duration: 0.8, ease: 'back.out(2)' },
        '<0.2'
      );

    return () => {
      tl.kill();
    };
  }, [flowerRef, pathRef, circleRef, delay]);
}
