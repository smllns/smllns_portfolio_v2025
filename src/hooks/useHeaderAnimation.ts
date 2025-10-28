import gsap from 'gsap';
import { useEffect } from 'react';
import { SplitText } from 'gsap/SplitText';
gsap.registerPlugin(SplitText);

export function useHeaderAnimation(
  nameRef: React.RefObject<HTMLHeadingElement | null>,
  roleRef: React.RefObject<HTMLParagraphElement | null>,
  footerRef: React.RefObject<HTMLParagraphElement | null>,
  arrowRef: React.RefObject<SVGPathElement | null>
) {
  useEffect(() => {
    const name = nameRef.current;
    const role = roleRef.current;
    const footer = footerRef.current;
    const arrow = arrowRef.current;

    if (!name || !role || !footer || !arrow) return;

    // 1. Name: slide up from bottom
    gsap.fromTo(
      name,
      { autoAlpha: 0, y: 60 },
      { autoAlpha: 1, y: 0, ease: 'back.out(1.4)', duration: 0.6, delay: 2 }
    );

    // 2. Role: character-by-character reveal with bounce
    const splitRole = new SplitText(role, { type: 'chars' });
    gsap.fromTo(
      splitRole.chars,
      { opacity: 0, y: -80, scale: 0.8 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.4,
        stagger: 0.1,
        delay: 2.5,
        ease: 'back.out(1.7)',
      }
    );

    // 3. Footer note: fade in from below
    gsap.fromTo(
      footer,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 3.5 }
    );

    // 4. Arrow: draw SVG stroke
    gsap.fromTo(
      arrow,
      { drawSVG: '0%' },
      { drawSVG: '100%', duration: 2, ease: 'power2.out', delay: 4 }
    );

    // Cleanup: revert SplitText on unmount
    return () => {
      splitRole.revert();
    };
  }, [nameRef, roleRef, footerRef, arrowRef]);
}
