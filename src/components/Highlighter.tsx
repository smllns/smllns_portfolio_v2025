// highlighter from rough-notation with GSAP animations
'use client';

import {
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
  type ReactNode,
} from 'react';
import { annotate } from 'rough-notation';
import type { RoughAnnotation } from 'rough-notation/lib/model';
import { gsap } from 'gsap';

interface HighlighterProps {
  children: ReactNode;
  action?: 'underline' | 'highlight' | 'box' | 'circle';
  color?: string;
  strokeWidth?: number;
  animationDuration?: number;
  padding?: number;
  multiline?: boolean;
}

export interface HighlighterHandle {
  start: () => void;
  reset: () => void;
}

export const Highlighter = forwardRef<HighlighterHandle, HighlighterProps>(
  (
    {
      children,
      action = 'underline',
      color = '#4ade80',
      strokeWidth = 2,
      animationDuration = 1,
      padding,
      multiline = true,
    },
    ref
  ) => {
    const containerRef = useRef<HTMLSpanElement>(null);
    const annotationRef = useRef<RoughAnnotation | null>(null);
    const pathRef = useRef<SVGPathElement | null>(null);
    const timelineRef = useRef<gsap.core.Timeline | null>(null);

    // Default padding based on annotation type
    const getDefaultPadding = () => {
      return ['circle', 'box', 'highlight'].includes(action) ? 6 : 0;
    };

    // Clean up existing annotation and animation
    const cleanup = () => {
      timelineRef.current?.kill();
      timelineRef.current = null;
      annotationRef.current?.remove();
      annotationRef.current = null;
      pathRef.current = null;
    };

    // Create new annotation (without animation)
    const createAnnotation = (): RoughAnnotation | null => {
      const element = containerRef.current;
      if (!element) return null;

      const adjustedPadding = padding ?? getDefaultPadding();

      const annotation = annotate(element, {
        type: action,
        color,
        strokeWidth,
        padding: adjustedPadding,
        multiline,
        animationDuration: 0, // Disable built-in animation(i use GSAP)
      });

      annotation.show();
      return annotation;
    };

    // Start highlight animation
    const start = () => {
      cleanup(); // Remove any existing highlight

      const element = containerRef.current;
      if (!element) return;

      const annotation = createAnnotation();
      if (!annotation) return;

      annotationRef.current = annotation;

      // Find the SVG path (Rough Notation injects it into the DOM)
      const svgPath = element.querySelector<SVGPathElement>('path');
      if (!svgPath) return;

      pathRef.current = svgPath;
      const length = svgPath.getTotalLength();

      // Reset path to hidden state
      gsap.set(svgPath, {
        strokeDasharray: length,
        strokeDashoffset: length,
        opacity: 1,
      });

      // Animate path drawing
      const tl = gsap.timeline();
      tl.to(svgPath, {
        strokeDashoffset: 0,
        duration: animationDuration,
        ease: 'power2.out',
      });

      timelineRef.current = tl;
    };

    // Reset (animate out and remove)
    const reset = () => {
      const path = pathRef.current;
      if (!path) {
        cleanup();
        return;
      }

      const length = path.getTotalLength();

      const tl = gsap.timeline({
        onComplete: cleanup,
      });

      tl.to(path, {
        strokeDashoffset: length,
        opacity: 0,
        duration: animationDuration * 0.8,
        ease: 'power2.inOut',
      });

      timelineRef.current = tl;
    };

    // Expose methods via ref
    useImperativeHandle(ref, () => ({
      start,
      reset,
    }));

    // Cleanup on unmount
    useEffect(() => {
      return () => {
        cleanup();
      };
    }, []);

    return (
      <span ref={containerRef} className='relative inline-block bg-transparent'>
        {children}
      </span>
    );
  }
);

Highlighter.displayName = 'Highlighter';
