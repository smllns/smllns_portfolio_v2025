import gsap from 'gsap';
import { useEffect } from 'react';

export const useTechCardAnimation = (
  cardRef: React.RefObject<HTMLDivElement | null>,
  sectionRef: React.RefObject<HTMLDivElement | null>,
  activeIndex: number | null
) => {
  useEffect(() => {
    if (activeIndex === null || !cardRef.current || !sectionRef.current) return;

    const techTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 40%',
        end: 'top 20%',
        scrub: true,
      },
    });

    const outTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'bottom 60%',
        end: 'bottom 50%',
        scrub: true,
      },
    });

    // Enter: scale + fade + lift
    techTl.fromTo(
      cardRef.current,
      { scale: 0.6, opacity: 0, y: 30 },
      {
        scale: 1,
        opacity: 1,
        y: 0,
        ease: 'back.out(1.6)',
      }
    );

    // Exit: scale down
    outTl.to(cardRef.current, {
      scale: 0.6,
      opacity: 0,
      ease: 'back.out(1.6)',
    });

    return () => {
      techTl.kill();
      outTl.kill();
    };
  }, [activeIndex, cardRef, sectionRef]);
};
