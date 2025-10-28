'use client';

import React, { useRef } from 'react';

import { arrows, getCirclesConfig } from '@/lib/contactsElements';
import { useContactsAnimation } from '@/hooks/useContactsAnimation';
import { handleDownload } from '@/helpers/handleDownload';
import { Highlighter } from '../Highlighter';
import AnimatedButton from '../AnimatedButton';
import Footer from '../Footer';

export default function ContactsSection({
  contactsSectionRef,
}: {
  contactsSectionRef: React.RefObject<HTMLDivElement | null>;
}) {
  const leftCircleRef = useRef<HTMLDivElement>(null);
  const rightCircleRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const downloadRef = useRef<HTMLDivElement>(null);
  const marqueeContainerRef = useRef<HTMLDivElement>(null);
  const highlightCV = useRef<{ start: () => void; reset: () => void } | null>(
    null
  );
  const arrowRefs = useRef<SVGSVGElement[]>([]);
  const buttonsRef = useRef<HTMLDivElement[]>([]);

  useContactsAnimation({
    sectionRef: contactsSectionRef,
    leftCircleRef,
    rightCircleRef,
    textRef,
    marqueeContainerRef,
    downloadRef,
    arrowRefs,
    buttonsRef,
    highlightCV,
  });

  const circles = getCirclesConfig(leftCircleRef, rightCircleRef);

  return (
    <div className='h-dvh relative' ref={contactsSectionRef}>
      {/* Background growing circles */}
      {circles.map(({ ref, side }, i) => (
        <div
          key={i}
          ref={ref}
          className={`bg-neutral-100 w-40 h-40 rounded-full absolute top-1/3 ${side} z-1 -translate-y-1/2`}
        />
      ))}

      {/* Marquee text */}
      <div
        ref={marqueeContainerRef}
        className='absolute top-10 flex items-center overflow-hidden z-22'
      >
        <div
          ref={textRef}
          className='flex whitespace-nowrap font-holtwood min-[320px]:text-4xl sm:text-5xl md:text-6xl text-neutral-900'
        >
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className='loop-word mx-4'>
              let&apos;s work together ✦
            </div>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className='h-screen w-full flex flex-col justify-center items-center min-[320px]:gap-10 sm:gap-20 z-2 absolute'>
        <div
          onClick={handleDownload}
          className='relative text-neutral-900 cursor-pointer text-center uppercase font-holtwood min-[320px]:text-xl text-2xl leading-none min-[320px]:-mt-[15vh] sm:-mt-10'
        >
          <div ref={downloadRef}>
            download <br /> <br />
            <span className='min-[320px]:text-6xl sm:text-8xl pt-1'>
              <Highlighter
                ref={highlightCV}
                color='#b778ff6c'
                action='highlight'
              >
                cv
              </Highlighter>
            </span>
          </div>

          {/* Arrows */}
          {arrows.map((cls, i) => (
            <svg
              key={i}
              ref={(el) => {
                if (el) arrowRefs.current[i] = el;
              }}
              className={cls}
              viewBox='-5 0 85 255'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M44.3521 188.856C47.2704 182.336 50.1919 175.407 53.1103 168.887C56.0318 161.958 64.2488 158.751 70.7759 162.074C74.8553 164.151 74.4168 167.828 72.7497 171.495C66.4969 185.35 61.4665 200.033 53.9883 213.469C49.0061 222.017 46.4746 231.403 40.2669 239.533C34.4721 247.257 21.3729 246.336 17.3482 237.308C13.7266 229.1 10.5178 220.487 8.13134 211.472C6.14152 204.095 3.32941 197.121 0.926816 190.15C-1.46613 181.953 0.59773 179.924 9.20475 179.174C16.1736 178.411 19.0048 182.932 22.2362 188.682C24.7482 181.75 22.7457 176.009 22.7875 170.693C22.5002 155.151 21.3939 139.603 21.1066 124.061C20.8612 103.203 17.7456 82.7314 15.862 61.8607C14.7203 50.8103 13.5786 39.7597 12.8463 28.7126C12.4819 22.9845 12.527 17.2597 10.5243 11.5188C8.51839 6.18674 11.0109 1.70821 15.5256 0.516918C22.0913 -1.06717 27.8092 1.02239 28.996 6.34796C30.1892 10.8557 30.9696 15.7691 31.3405 20.6793C32.3697 46.0417 36.6785 71.0212 37.7043 96.7925C38.3432 119.698 40.2138 142.204 40.8527 165.11C41.2011 172.883 42.3655 181.071 43.1235 188.847C43.5362 188.441 43.9457 188.444 44.3521 188.856Z'
                stroke='#171717'
                strokeWidth='10'
                fill='none'
              />
            </svg>
          ))}
        </div>

        {/* Social buttons */}
        <div className='z-30 flex min-w-[60vw] min-[320px]:flex-col sm:flex-row justify-between items-center min-[320px]:gap-4 md:gap-8'>
          {['Email', 'GitHub', 'LinkedIn'].map((text, i) => (
            <div
              key={text}
              ref={(el) => {
                if (el) buttonsRef.current[i] = el;
              }}
            >
              <AnimatedButton text={text} />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
