import gsap from 'gsap';
import { useEffect } from 'react';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
gsap.registerPlugin(DrawSVGPlugin);

export function useFlowerLoaderAnimation(
  svg1Ref: React.RefObject<SVGSVGElement | null>,
  svg2Ref: React.RefObject<SVGSVGElement | null>,
  circleRef: React.RefObject<SVGPathElement | null>,
  onComplete: () => void
) {
  useEffect(() => {
    const svg1 = svg1Ref.current;
    const svg2 = svg2Ref.current;
    const circle = circleRef.current;

    if (!svg1 || !svg2 || !circle) return;

    // Select all paths and circles inside first SVG (except the big circle)
    const paths = svg1.querySelectorAll('path, circle') as NodeListOf<
      SVGPathElement | SVGCircleElement
    >;

    // Initial state: hidden + drawSVG 0%
    gsap.set([paths, circle], { drawSVG: '0%', opacity: 0 });
    gsap.set(svg1, { scale: 1, transformOrigin: 'center center' });
    gsap.set(svg2, { scale: 1, transformOrigin: 'center center' });

    const tl = gsap.timeline({
      defaults: { ease: 'power2.inOut' },
      onComplete,
    });

    // Draw flower petals + small center
    tl.to(paths, {
      drawSVG: '100%',
      opacity: 1,
      duration: 4,
      stagger: 0.2,
    });

    // Draw big outer circle (same time as petals)
    tl.to(
      circle,
      {
        drawSVG: '100%',
        opacity: 1,
        duration: 4,
      },
      '-=4'
    );

    // Scale up both flowers
    tl.to(svg1, { scale: 1.3, duration: 0.2, ease: 'power2.out' });
    tl.to(svg2, { scale: 3, duration: 0.2, ease: 'power2.out' }, '-=0.2');

    // Fade out + scale down
    tl.to(
      [svg1, svg2],
      {
        scale: 0,
        opacity: 0,
        duration: 0.4,
        ease: 'power4.in',
      },
      '+=0.2'
    );

    // Cleanup
    return () => {
      tl.kill();
    };
  }, [svg1Ref, svg2Ref, circleRef, onComplete]);
}
