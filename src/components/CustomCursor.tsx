'use client';

import { useRef, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

import { useCursorPhysics } from '@/hooks/useCursorPhysics';
import { useCursorHoverText } from '@/hooks/useCursorHoverText';
import { useCursorColor } from '@/hooks/useCursorColor';
import { getCursorColors } from '@/lib/cursorColors';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const circleRef = useRef<SVGCircleElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  // Mobile detection
  useEffect(() => {
    const mq = window.matchMedia('(pointer: coarse)');
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useCursorPhysics(cursorRef);
  useCursorHoverText(isMobile ? null : labelRef);
  useCursorColor(pathRef, circleRef);

  if (isMobile) return null;

  const colors = getCursorColors(pathname);

  return (
    <div
      ref={cursorRef}
      className='pointer-events-none fixed top-0 left-0 z-9999 select-none'
      style={{ width: 58, height: 60 }}
    >
      <svg
        width='97'
        height='100'
        viewBox='0 0 97 100'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        style={{
          width: '100%',
          height: '100%',
          transform: 'scale(0.6)',
          transformOrigin: 'center',
        }}
      >
        <path
          ref={pathRef}
          d='M46.6744 4.5C61.5869 4.5 51.0869 30.5 51.0869 30.5C51.0869 30.5 59.8186 5.40563 71.5962 12.9746C83.3737 20.5436 57.6328 40.5045 57.6328 40.5045C57.6328 40.5045 89.0962 12.9746 92.156 29.2292C97.5962 47.9364 65.5869 43 65.5869 43C65.5869 43 98.1579 43.2582 96.1655 57.1157C94.1731 70.9733 59.8641 56.0235 59.8641 56.0235C59.8641 56.0235 93.63 72.1625 84.4619 82.743C75.2939 93.3235 54.5137 62.1982 54.5137 62.1982C54.5137 62.1982 76.0198 94.5557 62.5869 98.5C49.154 102.444 49.3973 70 49.3973 70C49.3973 70 51.5137 101.5 28.0869 93C14.654 89.0557 38.8351 62.1982 38.8351 62.1982C38.8351 62.1982 20.255 87.5805 11.0869 77C1.91886 66.4195 21.5869 58.5 21.5869 58.5C21.5869 58.5 3.18525 67.8575 1.19285 54C1.19285 37.5 28.0869 47.9364 28.0869 47.9364C28.0869 47.9364 -4.62297 41.9641 1.19284 29.2292C8.61607 12.9746 35.5869 38 35.5869 38C35.5869 38 3.58691 14.5 19.6424 7.93732C35.5869 -3 42.5893 36.0874 42.5893 36.0874C42.5893 36.0874 32.6744 4.5 46.6744 4.5Z'
          fill={colors.main}
          stroke='black'
        />
        <circle
          ref={circleRef}
          cx='47.5869'
          cy='49'
          r='13'
          fill={colors.circle}
          stroke='black'
        />
      </svg>{' '}
      <div
        ref={labelRef}
        className='absolute top-0 text-md text-black bg-white/80 px-2 py-1 rounded-md border border-black/10 pointer-events-none opacity-0'
        style={{
          transform: 'translate(-50%, -100%)',
          whiteSpace: 'nowrap',
        }}
      >
        grab me
      </div>
    </div>
  );
}
