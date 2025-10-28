import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText);

interface UseMenuItemHoverParams {
  containerRef: React.RefObject<HTMLDivElement | null>;
  topTextRef: React.RefObject<HTMLSpanElement | null>;
  bottomTextRef: React.RefObject<HTMLSpanElement | null>;
  imgRef: React.RefObject<HTMLDivElement | null>;
  underlineRef: React.RefObject<HTMLDivElement | null>;
  arrowRef: React.RefObject<HTMLDivElement | null>;
  onClick: () => void;
}

export const useMenuItemHover = ({
  containerRef,
  topTextRef,
  bottomTextRef,
  imgRef,
  underlineRef,
  arrowRef,
  onClick,
}: UseMenuItemHoverParams) => {
  const splitTop = useRef<SplitText | null>(null);
  const splitBottom = useRef<SplitText | null>(null);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  // Initialize SplitText on mount
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

  const handleMouseEnter = (e: React.MouseEvent) => {
    if (
      !splitTop.current ||
      !splitBottom.current ||
      !imgRef.current ||
      !underlineRef.current ||
      !arrowRef.current ||
      !containerRef.current
    )
      return;

    const topChars = splitTop.current.chars;
    const bottomChars = splitBottom.current.chars;

    // Animate text swap
    gsap.to(topChars, {
      yPercent: -100,
      ease: 'power2.inOut',
      stagger: 0.03,
      duration: 0.4,
    });
    gsap.to(bottomChars, {
      yPercent: 0,
      ease: 'power2.inOut',
      stagger: 0.03,
      duration: 0.4,
    });

    // Image appears at cursor position (desktop only)
    if (!isMobile) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      gsap.fromTo(
        imgRef.current,
        { x, y, opacity: 0, scale: 0.5, rotation: 0 },
        {
          x,
          y,
          opacity: 1,
          scale: 3,
          rotation: 12,
          duration: 0.5,
          ease: 'power2.out',
        }
      );
    }

    // Underline scale in
    gsap.fromTo(
      underlineRef.current,
      { scaleX: 0, transformOrigin: 'left center' },
      { scaleX: 1, duration: 0.4, ease: 'power3.out' }
    );

    // Arrow scale + color
    gsap.to(arrowRef.current, {
      scale: 1.3,
      color: '#fda5d5',
      duration: 0.3,
      delay: 0.2,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    if (
      !splitTop.current ||
      !splitBottom.current ||
      !imgRef.current ||
      !underlineRef.current ||
      !arrowRef.current
    )
      return;

    const topChars = splitTop.current.chars;
    const bottomChars = splitBottom.current.chars;

    // Reset text
    gsap.to(topChars, {
      yPercent: 0,
      ease: 'power2.inOut',
      stagger: 0.03,
      duration: 0.4,
    });
    gsap.to(bottomChars, {
      yPercent: 100,
      ease: 'power2.inOut',
      stagger: 0.03,
      duration: 0.4,
    });

    // Hide image (desktop only)
    if (!isMobile) {
      gsap.to(imgRef.current, {
        opacity: 0,
        scale: 0,
        rotation: 0,
        duration: 0.5,
        ease: 'power2.inOut',
      });
    }

    // Underline scale out
    gsap.to(underlineRef.current, {
      scaleX: 0,
      transformOrigin: 'right center',
      duration: 0.4,
      ease: 'power3.inOut',
    });

    // Reset arrow
    gsap.to(arrowRef.current, {
      scale: 1,
      color: '#ffffff',
      duration: 0.3,
      delay: 0.2,
      ease: 'power2.inOut',
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current || !imgRef.current || isMobile) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    gsap.to(imgRef.current, {
      x,
      y,
      ease: 'power3.out',
      duration: 0.3,
      overwrite: 'auto',
    });
  };

  return {
    handleMouseEnter,
    handleMouseLeave,
    handleMouseMove,
    onClick,
  };
};
