import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect } from 'react';

gsap.registerPlugin(ScrollTrigger);

export function useProjectFeaturesScrollAnimations({
  sectionRef,
  navRef,
  cardsRef,
}: {
  sectionRef: React.RefObject<HTMLDivElement | null>;
  navRef: React.RefObject<HTMLDivElement | null>;
  cardsRef: React.RefObject<HTMLDivElement[]>;
}) {
  useEffect(() => {
    const section = sectionRef.current;
    const nav = navRef.current;
    const cards = cardsRef.current;
    if (!section || !nav || !cards.length) return;

    const ctx = gsap.context(() => {
      // bg fade
      gsap.to(section, {
        backgroundColor: '#f5f5f5',
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top 35%',
          end: 'top 30%',
          scrub: 1,
        },
      });

      // Nav In
      gsap
        .timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 15%',
            end: 'top 5%',
            scrub: 1,
          },
        })
        .fromTo(nav, { y: 200 }, { y: 0, ease: 'power2.out' });

      // Cards Appear
      gsap
        .timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 28%',
            end: 'top 15%',
            scrub: 1,
          },
        })
        .fromTo(cards, { scale: 0 }, { scale: 1, ease: 'power2.out' });

      // Nav Out
      gsap
        .timeline({
          scrollTrigger: {
            trigger: section,
            start: 'bottom 80%',
            end: 'bottom 60%',
            scrub: 1,
          },
        })
        .to(nav, { y: '-50vh', ease: 'power2.out' });

      // Cards Disappear
      gsap
        .timeline({
          scrollTrigger: {
            trigger: section,
            start: 'bottom 90%',
            end: 'bottom 70%',
            scrub: 1,
          },
        })
        .to(cards, { scale: 0, opacity: 0 });
    }, section);

    return () => ctx.revert();
  }, [sectionRef, navRef, cardsRef]);
}
