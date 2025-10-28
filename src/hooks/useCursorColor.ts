import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { usePathname } from 'next/navigation';
import { CursorColorSet, getCursorColors } from '@/lib/cursorColors';

export const useCursorColor = (
  pathRef: React.RefObject<SVGPathElement | null>,
  circleRef: React.RefObject<SVGCircleElement | null>
) => {
  const pathname = usePathname();
  const prevColors = useRef<CursorColorSet | null>(null);

  useEffect(() => {
    if (!pathRef.current || !circleRef.current) return;

    const colors = getCursorColors(pathname);
    if (
      prevColors.current?.main === colors.main &&
      prevColors.current?.circle === colors.circle
    )
      return;

    gsap.to(pathRef.current, {
      fill: colors.main,
      duration: 0.8,
      ease: 'power2.inOut',
    });
    gsap.to(circleRef.current, {
      fill: colors.circle,
      duration: 0.8,
      ease: 'power2.inOut',
    });

    prevColors.current = colors;
  }, [pathname, pathRef, circleRef]);
};
