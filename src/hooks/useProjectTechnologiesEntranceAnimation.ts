import gsap from 'gsap';
import { useEffect } from 'react';

export const useProjectTechnologiesEntranceAnimation = (
  sectionRef: React.RefObject<HTMLDivElement | null>,
  overlayRef: React.RefObject<HTMLDivElement | null>,
  h1Ref: React.RefObject<HTMLDivElement | null>,
  pRef: React.RefObject<HTMLDivElement | null>,
  techRefs: React.MutableRefObject<HTMLSpanElement[]>
) => {
  useEffect(() => {
    const section = sectionRef.current;
    const overlay = overlayRef.current;
    const h1 = h1Ref.current;
    const p = pRef.current;

    if (!section || !overlay || !h1 || !p) return;

    // Main entrance timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 60%',
        end: 'top 30%',
        scrub: 1,
      },
    });

    // Tech cloud entrance
    const techTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 40%',
        end: 'top 20%',
        scrub: true,
      },
    });

    // Exit animation on scroll out
    const outTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'bottom 80%',
        end: 'bottom 50%',
        scrub: true,
      },
    });

    // Overlay slide in
    tl.to(overlay, { x: 0, ease: 'power2.out' });

    // Title and subtitle slide in from opposite sides
    tl.fromTo(h1, { xPercent: -200 }, { xPercent: 0 }, '<');
    tl.fromTo(p, { xPercent: 200 }, { xPercent: 0 }, '<');

    // Tech tags pop in with stagger
    techTl.fromTo(
      techRefs.current,
      { scale: 0.6, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        stagger: 0.15,
        ease: 'back.out(1.7)',
        duration: 0.6,
      }
    );

    // Fade out on exit
    outTl.to(techRefs.current, {
      scale: 0.6,
      opacity: 0,
      stagger: 0.15,
    });

    return () => {
      tl.kill();
      techTl.kill();
      outTl.kill();
    };
  }, [sectionRef, overlayRef, h1Ref, pRef, techRefs]);
};
