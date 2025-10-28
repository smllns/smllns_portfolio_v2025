'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useCircleTextAnimation } from '@/hooks/useCircleTextAnimation';
import { useAvatarAnimation } from '@/hooks/useAvatarAnimation';
import { useListAnimation } from '@/hooks/useListAnimation';
import { useWrapperParallax } from '@/hooks/useWrapperParallax';
import {
  getAboutItems,
  getFlowers,
  getHobbies,
  getTexts,
} from '@/lib/aboutInfo';
import Flower from '../Flower';

export interface HighlighterRef {
  start: () => void;
  reset: () => void;
}

export default function AboutSection() {
  const aboutSectionRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const textLeftRef = useRef<HTMLHeadingElement>(null);
  const textRightRef = useRef<HTMLHeadingElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const flowerRef1 = useRef<HTMLDivElement>(null);
  const flowerRef2 = useRef<HTMLDivElement>(null);
  const flowerRef3 = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const highlightLocation = useRef<HighlighterRef>(null);
  const highlightTech = useRef<HighlighterRef>(null);
  const highlightReading = useRef<HighlighterRef>(null);
  const highlightMovies = useRef<HighlighterRef>(null);

  // State to track when section is mounted
  const [triggerEl, setTriggerEl] = useState<HTMLElement | null>(null);

  // Set trigger after mount
  useEffect(() => {
    if (aboutSectionRef.current) {
      setTriggerEl(aboutSectionRef.current);
    }
  }, [aboutSectionRef]);

  // run animations only when trigger is ready
  useCircleTextAnimation(circleRef, textLeftRef, textRightRef, triggerEl);
  useAvatarAnimation(svgRef, triggerEl, [flowerRef1, flowerRef2, flowerRef3]);
  useListAnimation(triggerEl, [
    highlightLocation,
    highlightTech,
    highlightReading,
    highlightMovies,
  ]);
  useWrapperParallax(wrapperRef, triggerEl);

  // content
  const texts = getTexts(textLeftRef, textRightRef);
  const flowers = getFlowers(flowerRef1, flowerRef2, flowerRef3);
  const aboutItems = getAboutItems(highlightLocation, highlightTech);
  const hobbies = getHobbies(highlightReading, highlightMovies);

  return (
    <div
      ref={aboutSectionRef}
      className='h-screen max-h-screen overflow-hidden'
    >
      <div
        ref={wrapperRef}
        className='wrapper will-change-transform relative h-screen max-h-screen flex min-[320px]:flex-col md:flex-row items-center min-[320px]:justify-center md:justify-around overflow-hidden gap-10 bg-neutral-900 text-white'
      >
        {/* Expanding Circle */}
        <div
          ref={circleRef}
          className='circle bg-neutral-100 rounded-full absolute left-1/2 top-[5%] -translate-x-1/2 z-0'
          style={{ width: 40, height: 40 }}
        />

        {/* Text */}
        {texts.map(({ ref, text, top }, i) => (
          <h1
            key={i}
            ref={ref}
            className={`absolute ${top} z-10 min-[320px]:text-3xl sm:text-5xl md:text-7xl font-bold uppercase tracking-widest font-holtwood mix-blend-difference`}
          >
            {text}
          </h1>
        ))}

        {/* Avatar + Flowers */}
        <div className='relative sm:mt-[5vh] md:mt-[10vh]'>
          <svg
            ref={svgRef}
            viewBox='-5 -5 930 930'
            xmlns='http://www.w3.org/2000/svg'
            className='z-1 md:h-96 md:w-96 min-[320px]:h-64 min-[320px]:w-64 avatar'
          >
            <defs>
              <clipPath id='profileClip'>
                <path
                  id='profilePath'
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M134.731 134.731C88.6227 180.839 71.9707 245.249 84.7752 304.577C33.7701 337.473 0 394.793 0 460C-8.01117e-06 525.205 33.7701 582.526 84.7752 615.425C71.9707 674.751 88.6227 739.16 134.731 785.271C180.839 831.376 245.249 848.028 304.577 835.227C337.474 886.231 394.793 920 460 920C525.205 920 582.526 886.231 615.425 835.227C674.751 848.028 739.16 831.376 785.271 785.271C831.376 739.16 848.028 674.751 835.227 615.425C886.231 582.526 920 525.205 920 460C920 394.793 886.231 337.473 835.227 304.577C848.028 245.249 831.376 180.839 785.271 134.731C739.16 88.6227 674.751 71.9707 615.425 84.7752C582.526 33.7701 525.205 0 460 0C394.793 0 337.473 33.77 304.577 84.7748C245.249 71.9707 180.839 88.6227 134.731 134.731Z'
                />
              </clipPath>
            </defs>
            <image
              href='/profile.jpg'
              x='-150'
              y='-280'
              width='1300'
              height='1300'
              preserveAspectRatio='xMidYMid slice'
              clipPath='url(#profileClip)'
            />
            <use
              href='#profilePath'
              fill='none'
              stroke='#303030c0'
              strokeWidth='10'
            />
          </svg>

          {flowers.map(({ ref, variant, size, position }, i) => (
            <div key={i} ref={ref} className={`absolute ${position}`}>
              <Flower
                variant={variant}
                size={size}
                delay={0}
                draggable={false}
              />
            </div>
          ))}
        </div>

        {/* Info */}
        <div className='first text-center text-black z-2 md:max-w-[50vw] min-[320px]:max-w-[90vw] min-[320px]:-mt-3 md:mt-[25vh]'>
          <ul className='sm:text-xl min-[320px]:text-sm text-left leading-loose list-disc list-inside space-y-2 tracking-wide'>
            {aboutItems.map(({ label, value }, i) => (
              <li key={i}>
                <span className='font-bold tracking-wide font-holtwood pr-2'>
                  {label}
                </span>
                {value}
              </li>
            ))}

            <ul className='list-disc pl-5'>
              {hobbies.map(({ label, value }, i) => (
                <li key={i}>
                  <span className='font-bold tracking-wide font-holtwood pr-2'>
                    {label}
                  </span>
                  {value}
                </li>
              ))}
            </ul>
          </ul>
        </div>
      </div>
    </div>
  );
}
