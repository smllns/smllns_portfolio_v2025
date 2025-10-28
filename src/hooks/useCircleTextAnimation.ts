// opening scroll animation in about section
import gsap from 'gsap';
import { useEffect } from 'react';

export function useCircleTextAnimation(
  circleRef: React.RefObject<HTMLDivElement | null>,
  textLeftRef: React.RefObject<HTMLHeadingElement | null>,
  textRightRef: React.RefObject<HTMLHeadingElement | null>,
  trigger: HTMLElement | null
) {
  useEffect(() => {
    if (
      !trigger ||
      !circleRef.current ||
      !textLeftRef.current ||
      !textRightRef.current
    )
      return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger,
        start: 'top 80%',
        end: 'top 20%',
        scrub: 1.2,
      },
    });

    tl.fromTo(
      circleRef.current,
      { width: 40, height: 40 },
      {
        width: '200vmax',
        height: '200vmax',
        ease: 'power1.inOut',
        transformOrigin: 'top center',
      },
      0
    );

    tl.fromTo(
      textLeftRef.current,
      { x: '-100vw' },
      { x: '-10vw', ease: 'power2.out' },
      0
    );
    tl.fromTo(
      textRightRef.current,
      { x: '100vw' },
      { x: '10vw', ease: 'power2.out' },
      0
    );

    gsap.to(circleRef.current, {
      y: '-30vh',
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger,
        start: 'top 5%',
        end: 'bottom bottom',
        scrub: 1,
      },
    });

    return () => {
      tl.kill();
    };
  }, [circleRef, textLeftRef, textRightRef, trigger]);
}
