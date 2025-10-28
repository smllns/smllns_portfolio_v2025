import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(SplitText, ScrollTrigger);

interface UsePortfolioAnimationParams {
  titleRef: React.RefObject<HTMLDivElement | null>;
  flowerRefs: React.RefObject<HTMLDivElement[]>;
  menuRef: React.RefObject<HTMLDivElement | null>;
  sectionRef: React.RefObject<HTMLDivElement | null>;
}

export const usePortfolioAnimation = ({
  titleRef,
  flowerRefs,
  menuRef,
  sectionRef,
}: UsePortfolioAnimationParams) => {
  const splitRef = useRef<SplitText | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const menu = menuRef.current;
    const flowers = flowerRefs.current;

    if (!section || !title || !menu || flowers.length === 0) return;

    //  Split text into characters
    splitRef.current = new SplitText(title, {
      type: 'chars',
      charsClass: 'inline-block',
    });
    const chars = splitRef.current.chars;

    // Initially hide title container but keep layout, hide chars
    gsap.set(title, { visibility: 'visible', opacity: 1 });
    gsap.set(chars, { y: -150, opacity: 0, rotation: -10 });

    // Appearance animation: title + flowers (on scroll in)
    const appearTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 50%',
        toggleActions: 'play reverse play reverse',
      },
    });

    appearTl
      .to(chars, {
        y: 0,
        opacity: 1,
        rotation: 0,
        stagger: 0.05,
        duration: 0.8,
        ease: 'elastic.out(1, 0.5)',
      })
      .to(
        flowers,
        {
          scale: 1,
          opacity: 1,
          stagger: 0.2,
          duration: 0.4,
          ease: 'back.out(1.7)',
        },
        '-=1'
      );

    // Menu entrance from below
    gsap.fromTo(
      menu,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 40%',
          end: 'top 10%',
          scrub: 1,
        },
      }
    );

    // Disappearance timeline
    const disappearTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'bottom 95%',
        end: 'bottom 50%',
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });

    disappearTl
      .to(menu, { y: -500, opacity: 0, ease: 'power2.in' }, 0.1)
      .to(flowers, { y: 500, ease: 'power2.out' }, 0.1);

    // Title chars disappear
    gsap.fromTo(
      chars,
      { x: 0 },
      {
        y: -120,
        opacity: 0,
        ease: 'back.in(1.7)',
        scrollTrigger: {
          trigger: section,
          start: 'bottom 95%',
          end: 'bottom 70%',
          scrub: 1,
        },
      }
    );

    // Cleanup on unmount
    return () => {
      appearTl.scrollTrigger?.kill();
      disappearTl.scrollTrigger?.kill();
      ScrollTrigger.getAll()
        .filter((st) => st.trigger === section)
        .forEach((st) => st.kill());
      splitRef.current?.revert();
    };
  }, [titleRef, flowerRefs, menuRef, sectionRef]);
};
