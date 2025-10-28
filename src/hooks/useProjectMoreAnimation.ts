import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect } from 'react';

export const useProjectMoreAnimation = (
  sectionRef: React.RefObject<HTMLDivElement | null>,
  h1Ref: React.RefObject<HTMLDivElement | null>,
  cardsRef: React.MutableRefObject<HTMLDivElement[]>
) => {
  useEffect(() => {
    const section = sectionRef.current;
    const h1 = h1Ref.current;
    const cards = cardsRef.current;

    if (!section || !h1 || cards.length === 0) return;

    // Animate title: slide down from top
    gsap.fromTo(
      h1,
      { y: '-20vh' },
      {
        y: 0,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 50%',
          end: 'top 30%',
          scrub: true,
        },
      }
    );

    // Animate cards: slide in from sides with rotation
    gsap.fromTo(
      cards,
      {
        xPercent: (i) => (i === 0 ? -150 : 150),
        opacity: 0,
        rotate: (i) => (i === 0 ? -5 : 5),
      },
      {
        xPercent: 0,
        opacity: 1,
        rotate: 0,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 30%',
          end: 'top 10%',
          scrub: true,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === section) st.kill();
      });
    };
  }, [sectionRef, h1Ref, cardsRef]);
};
