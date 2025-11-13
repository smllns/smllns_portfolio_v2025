import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface UseFooterAnimationParams {
  containerRef: React.RefObject<HTMLDivElement | null>;
  svgRef: React.RefObject<SVGSVGElement | null>;
  textRef: React.RefObject<HTMLDivElement | null>;
  flowerRefs: React.RefObject<(HTMLDivElement | null)[]>;
}

export const useFooterAnimation = ({
  containerRef,
  svgRef,
  textRef,
  flowerRefs,
}: UseFooterAnimationParams) => {
  useEffect(() => {
    const container = containerRef.current;
    const svg = svgRef.current;
    const text = textRef.current;
    const flowers = flowerRefs.current.filter(Boolean);

    if (!container || !svg || !text || flowers.length === 0) return;

    // Animate SVG and text from below
    gsap.fromTo(
      [svg, text],
      { yPercent: 100, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: container,
          start: 'top 90%',
          end: 'bottom bottom',
          scrub: true,
        },
      }
    );

    // Animate flowers with staggered pop-in
    gsap.fromTo(
      flowers,
      { opacity: 0, scale: 0 },
      {
        opacity: 1,
        scale: 1,
        stagger: 0.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: container,
          start: 'top 90%',
          end: 'bottom bottom',
          scrub: 1.2,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll()
        .filter((st) => st.trigger === container)
        .forEach((st) => st.kill());
    };
  }, [containerRef, svgRef, textRef, flowerRefs]);
};
