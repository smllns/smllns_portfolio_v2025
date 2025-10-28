'use client';

import React, { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useButtonHover } from '@/hooks/useButtonHover';
import { handleButtonClick } from '@/helpers/handleButtonClick';

const AnimatedButton = ({ text }: { text: string }) => {
  const bgRef = useRef<HTMLDivElement>(null);
  const topTextRef = useRef<HTMLSpanElement>(null);
  const bottomTextRef = useRef<HTMLSpanElement>(null);
  const router = useRouter();

  const { handleMouseEnter, handleMouseLeave } = useButtonHover({
    topTextRef,
    bottomTextRef,
    bgRef,
  });

  const textLayers = [
    { ref: topTextRef, z: 'z-10 text-neutral-900 relative' },
    { ref: bottomTextRef, z: 'z-9 text-neutral-100 absolute left-0 top-0' },
  ];

  return (
    <button
      className={`
        relative overflow-hidden 
        min-[320px]:border-3 sm:border-4 border-neutral-900 
        rounded-full font-bold 
        min-[320px]:text-lg md:text-xl 
        cursor-pointer w-fit
        ${text !== '←' ? 'px-10 py-4' : 'px-2 py-4'}
      `}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => handleButtonClick(text, router)}
    >
      {/* Background fill on hover */}
      <div
        ref={bgRef}
        className='absolute inset-0 bg-neutral-900 translate-y-[101%] z-0'
      />

      {/* Text layers */}
      <div className='relative overflow-hidden'>
        {textLayers.map(({ ref, z }, i) => (
          <span
            key={i}
            ref={ref}
            className={`block uppercase font-holtwood leading-none tracking-wider ${z}`}
          >
            {text}
          </span>
        ))}
      </div>
    </button>
  );
};

export default AnimatedButton;
