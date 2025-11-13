'use client';

import React, { useRef, useState, useEffect } from 'react';
import Flower, { FlowerVariant } from './Flower';
import {
  circlesDesktop,
  circlesMobile,
  flowerConfigs,
  footerItems,
} from '@/lib/footerContent';
import { useFooterAnimation } from '@/hooks/useFooterAnimation';

export default function Footer({
  mainColor = '#171717',
}: {
  mainColor?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const flowerRefs = useRef<(HTMLDivElement | null)[]>([null, null, null]);

  const [width, setWidth] = useState(0);
  const isMobile = width < 640;

  // responsive logic
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setWidth(containerRef.current.getBoundingClientRect().width);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  useFooterAnimation({
    containerRef,
    svgRef,
    textRef,
    flowerRefs,
  });

  const currentYear = new Date().getFullYear();
  const textColor =
    mainColor === '#171717' ? 'text-neutral-100' : 'text-neutral-900';
  const pillBg =
    mainColor === '#171717' ? 'bg-neutral-900/60' : 'bg-neutral-100/60';
  const circles = isMobile ? circlesMobile : circlesDesktop;
  const viewBox = isMobile ? '0 0 214 71' : '0 0 550 101';

  return (
    <div
      ref={containerRef}
      className='absolute bottom-0 left-0 w-full h-[20vh] z-10 overflow-visible'
    >
      {/* Responsive SVG background */}
      <svg
        ref={svgRef}
        viewBox={viewBox}
        xmlns='http://www.w3.org/2000/svg'
        className='absolute w-full h-full'
        preserveAspectRatio='none'
      >
        {circles.map((c, i) => (
          <circle
            key={i}
            cx={c.cx}
            cy={c.cy}
            r={c.r}
            fill={mainColor}
            stroke={mainColor}
          />
        ))}
      </svg>

      {flowerConfigs.map(({ variant, size, position }, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) flowerRefs.current[i] = el;
          }}
          className={`absolute ${position}`}
        >
          <Flower variant={variant as FlowerVariant} size={size} delay={0} />
        </div>
      ))}

      {/* Footer text & links */}
      <div
        ref={textRef}
        className={`absolute bottom-0 left-0 w-full flex flex-col lg:flex-row items-center justify-between px-4 lg:px-10 pb-4  tracking-wide font-holtwood z-20 gap-2   ${textColor}`}
      >
        {/* Desktop: Left-aligned pills */}
        <span
          className={`px-3 py-1 rounded-2xl cursor-pointer text-sm lg:text-base min-[320px]:hidden lg:block ${pillBg}`}
          onClick={footerItems.clickFunc}
        >
          {footerItems.siteName}
        </span>
        <span
          className={`px-3 py-1 rounded-2xl text-sm lg:text-base min-[320px]:hidden lg:block ${pillBg}`}
        >
          by {footerItems.linkedIn}
        </span>

        {/* Mobile: Full-width justified */}
        <div className='lg:hidden min-[320px]:flex flex-row w-screen justify-between'>
          <span
            className={`px-3 py-1 rounded-2xl cursor-pointer text-xs sm:text-lg md:text-base  ${pillBg}`}
            onClick={footerItems.clickFunc}
          >
            {footerItems.siteName}
          </span>
          <span
            className={`px-3 py-1 rounded-2xl text-xs sm:text-lg md:text-base  ${pillBg}`}
          >
            by {footerItems.linkedIn}
          </span>
        </div>

        {/* Copyright */}
        <span
          className={`px-3 py-1 rounded-2xl text-[10px] md:text-base lg:text-base ${pillBg}`}
        >
          © {currentYear} all rights reserved
        </span>
      </div>
    </div>
  );
}
