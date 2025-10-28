'use client';
import React, { useRef } from 'react';
import Image from 'next/image';
import {
  handleLeave,
  handleMove,
  useProjectOverviewAnimations,
} from '@/hooks/useProjectOverviewAnimation';

const ProjectOverview = ({
  description,
  pics,
}: {
  description: string;
  pics: string[];
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const innerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useProjectOverviewAnimations({ containerRef, textRef, imageRefs });

  return (
    <div
      ref={containerRef}
      className='relative flex flex-col md:flex-row items-center justify-center h-dvh px-8 overflow-hidden bg-neutral-900 transition-colors duration-200'
    >
      {/* Images Column */}
      <div className='relative flex flex-col items-start justify-center w-1/2 min-[320px]:h-[50vh] md:h-[90dvh]'>
        <div className='relative flex flex-col items-start justify-center min-[320px]:h-[50vh] md:h-[90dvh]'>
          {pics.map((pic, i) => (
            <div
              key={i}
              ref={(el) => {
                innerRefs.current[i] = el;
              }}
              className='absolute left-0 right-0'
              style={{ zIndex: i === 1 ? 10 : 1 }}
            >
              <div
                ref={(el) => {
                  imageRefs.current[i] = el;
                }}
                className='mx-auto min-[320px]:w-[90vw] sm:w-[80vw] md:w-[45vw] aspect-16/10 rounded-2xl shadow-2xl overflow-hidden'
                style={{ transform: 'translateX(-150vw)' }}
                onMouseMove={(e) => handleMove(e, i, imageRefs, innerRefs)}
                onMouseLeave={() => handleLeave(i, innerRefs)}
              >
                <Image
                  src={pic}
                  alt={`project image ${i + 1}`}
                  fill
                  className='object-cover'
                />
                <div
                  className='absolute inset-0 pointer-events-none rounded-2xl'
                  style={{
                    boxShadow:
                      'inset 4px 25px 40px 6px rgba(255, 255, 255, 0.12), inset -6px 11px 19px 2px rgba(255, 255, 255, 0.1), 7px 7px 20px 2px rgba(255, 255, 255, 0.2)',
                    mixBlendMode: 'screen',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Description */}
      <div
        ref={textRef}
        className='min-[320px]:w-full md:w-1/2 text-neutral-100 tracking-tight text-right flex flex-col items-end justify-end h-full min-[320px]:pb-10 md:pb-15'
      >
        <p className='text-neutral-100/40 pb-2'>Project overview</p>
        <p className='max-w-md min-[320px]:text-md sm:text-lg md:text-base lg:text-lg leading-relaxed'>
          {description}
        </p>
      </div>
    </div>
  );
};

export default ProjectOverview;
