'use client';

import React, { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { portfolioItems } from '@/lib/portfolioItems';
import { useMenuItemHover } from '@/hooks/useMenuItemHover';

interface MenuItemProps {
  link: string;
  text: string;
  image: string;
  description: string;
}

const MenuItem: React.FC<MenuItemProps> = ({
  link,
  text,
  image,
  description,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const topTextRef = useRef<HTMLSpanElement>(null);
  const bottomTextRef = useRef<HTMLSpanElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const underlineRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  const handleClick = () => {
    const animate = window.pageTransition;
    if (animate) animate(link);
    else router.push(link);
  };

  const { handleMouseEnter, handleMouseLeave, handleMouseMove, onClick } =
    useMenuItemHover({
      containerRef,
      topTextRef,
      bottomTextRef,
      imgRef,
      underlineRef,
      arrowRef,
      onClick: handleClick,
    });

  return (
    <div
      ref={containerRef}
      className='relative flex items-center justify-start min-[320px]:px-4 sm:px-8 h-15 py-4 max-w-7xl mx-auto cursor-pointer'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onClick={onClick}
    >
      {/* Text layers */}
      <div className='relative overflow-hidden'>
        <span
          ref={topTextRef}
          className='block relative z-10 uppercase font-holtwood text-white min-[320px]:text-2xl sm:text-4xl md:text-[2rem] leading-none tracking-wide'
        >
          {text}
        </span>
        <span
          ref={bottomTextRef}
          className='block absolute left-0 top-0 z-9 uppercase font-holtwood text-pink-300 min-[320px]:text-2xl sm:text-4xl md:text-[2rem] leading-none tracking-wide'
        >
          {text}
        </span>
      </div>

      {/* Description + Arrow + Underline */}
      <div className='absolute lg:-bottom-1 min-[320px]:-bottom-4 min-[320px]:right-4 sm:right-8 flex flex-col items-end gap-1 text-white z-10'>
        <div className='flex flex-row items-center gap-2'>
          <span className='tracking-wider'>{description}</span>
          <div ref={arrowRef}>
            <ArrowUpRight className='transition-none' />
          </div>
        </div>
        <div
          ref={underlineRef}
          className='w-full  h-0.5 bg-pink-300 scale-x-0'
        />
      </div>

      {/* Hover Image */}
      <div
        ref={imgRef}
        className='absolute top-0 left-0 w-32 h-20 rounded-lg bg-cover bg-center opacity-0 pointer-events-none'
        style={{
          backgroundImage: `url(${image})`,
          transform: 'translate(-50%, -50%) scale(0.8)',
        }}
      />
    </div>
  );
};

const FlowingMenu = () => {
  return (
    <div className='w-full h-full'>
      <nav className='flex flex-col h-full m-0 p-0'>
        {portfolioItems.map((item, idx) => (
          <div key={idx}>
            <MenuItem {...item} />
            {idx < portfolioItems.length - 1 && (
              <div className='h-px w-full max-w-7xl mx-auto bg-neutral-700 my-4' />
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default FlowingMenu;
