import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';

interface UseButtonHoverParams {
  topTextRef: React.RefObject<HTMLSpanElement | null>;
  bottomTextRef: React.RefObject<HTMLSpanElement | null>;
  bgRef: React.RefObject<HTMLDivElement | null>;
}

export const useButtonHover = ({
  topTextRef,
  bottomTextRef,
  bgRef,
}: UseButtonHoverParams) => {
  const splitTop = useRef<SplitText | null>(null);
  const splitBottom = useRef<SplitText | null>(null);

  // Initialize SplitText once on mount
  useEffect(() => {
    if (!topTextRef.current || !bottomTextRef.current) return;

    splitTop.current = new SplitText(topTextRef.current, { type: 'chars' });
    splitBottom.current = new SplitText(bottomTextRef.current, {
      type: 'chars',
    });
    gsap.set(splitBottom.current.chars, { yPercent: 100 });

    return () => {
      splitTop.current?.revert();
      splitBottom.current?.revert();
    };
  }, [topTextRef, bottomTextRef]);

  const handleMouseEnter = () => {
    if (!splitTop.current || !splitBottom.current || !bgRef.current) return;

    const topChars = splitTop.current.chars;
    const bottomChars = splitBottom.current.chars;
    const bg = bgRef.current;

    const tl = gsap.timeline({ defaults: { ease: 'power2.inOut' } });

    tl.to(bg, { y: '0%', duration: 0.45 }, 0);
    tl.to(topChars, { yPercent: -100, stagger: 0.03, duration: 0.45 }, 0.05);
    tl.to(bottomChars, { yPercent: 0, stagger: 0.03, duration: 0.45 }, 0.05);
  };

  const handleMouseLeave = () => {
    if (!splitTop.current || !splitBottom.current || !bgRef.current) return;

    const topChars = splitTop.current.chars;
    const bottomChars = splitBottom.current.chars;
    const bg = bgRef.current;

    const tl = gsap.timeline({ defaults: { ease: 'power2.inOut' } });

    tl.to(bg, { y: '101%', duration: 0.45 }, 0);
    tl.to(topChars, { yPercent: 0, stagger: 0.03, duration: 0.45 }, 0.05);
    tl.to(bottomChars, { yPercent: 100, stagger: 0.03, duration: 0.45 }, 0.05);
  };

  return { handleMouseEnter, handleMouseLeave };
};
