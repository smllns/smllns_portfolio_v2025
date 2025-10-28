'use client';
import { useRef } from 'react';
import { FLOWER_SHAPES } from '@/lib/flowerShapes';
import { useRandomFlowerColors } from '@/hooks/useRandomFlowerColors';
import { useFlowerEntranceAnimation } from '@/hooks/useFlowerEntranceAnimation';
import { useFlowerHoverScale } from '@/hooks/useFlowerHoverScale';
import { useDraggable } from '@/hooks/useDraggable';

export type FlowerVariant = 'one' | 'two' | 'three' | 'four' | 'five';

interface FlowerProps {
  variant?: FlowerVariant;
  size?: number;
  delay?: number;
  draggable?: boolean;
  opacity?: boolean;
}

export default function Flower({
  variant = 'one',
  size = 100,
  delay = 0,
  draggable = true,
  opacity = false,
}: FlowerProps) {
  const flowerRef = useRef<HTMLDivElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const circleRef = useRef<SVGCircleElement | null>(null);

  const colors = useRandomFlowerColors();
  const shape = FLOWER_SHAPES[variant];

  useFlowerEntranceAnimation(flowerRef, pathRef, circleRef, delay);
  useFlowerHoverScale(flowerRef);
  useDraggable(flowerRef, draggable);

  return (
    <div
      ref={flowerRef}
      className={draggable ? 'grabme' : ''}
      style={{ display: 'inline-block' }}
    >
      <svg
        width={size}
        height={size}
        viewBox={shape.viewBox}
        className={opacity ? 'opacity-50' : ''}
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          ref={pathRef}
          d={shape.path}
          stroke='#000000'
          strokeWidth='1.2'
          fill={colors?.petalColor ?? 'transparent'}
        />
        <circle
          ref={circleRef}
          cx={shape.center.cx}
          cy={shape.center.cy}
          r={shape.center.r}
          fill={colors?.centerColor ?? 'transparent'}
          stroke='#000000'
        />
      </svg>
    </div>
  );
}
