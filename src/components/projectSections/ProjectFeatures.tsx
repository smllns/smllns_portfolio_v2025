'use client';
import React, { useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useCircularCarousel } from '@/hooks/useCircularCarousel';
import { useProjectFeaturesScrollAnimations } from '@/hooks/useProjectFeaturesScrollAnimations';

const ProjectFeatures = ({
  text,
  features,
}: {
  text: string;
  features: { title: string; description?: string }[];
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useProjectFeaturesScrollAnimations({ sectionRef, navRef, cardsRef });

  // Carousel logic
  const { rotate } = useCircularCarousel({ carouselRef, cardsRef });

  // smart autorotation
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const startAutoRotate = () => {
      timeoutId = setTimeout(() => {
        rotate('right');
        startAutoRotate();
      }, 6000);
    };

    const resetAndRestart = () => {
      clearTimeout(timeoutId);
      startAutoRotate();
    };

    startAutoRotate();

    const leftBtn = navRef.current?.querySelector('button:first-child');
    const rightBtn = navRef.current?.querySelector('button:last-child');

    if (leftBtn) leftBtn.addEventListener('click', resetAndRestart);
    if (rightBtn) rightBtn.addEventListener('click', resetAndRestart);

    return () => {
      clearTimeout(timeoutId);
      if (leftBtn) leftBtn.removeEventListener('click', resetAndRestart);
      if (rightBtn) rightBtn.removeEventListener('click', resetAndRestart);
    };
  }, [rotate]);

  const handleRotate = (direction: 'left' | 'right') => {
    rotate(direction);
  };

  return (
    <div
      ref={sectionRef}
      className='relative h-dvh bg-neutral-900 flex items-end justify-center overflow-hidden transition-colors duration-200'
    >
      {/* Carousel Container */}
      <div
        ref={carouselRef}
        className='relative w-[90vmin] h-[90vmin] min-[320px]:translate-y-[20%] sm:translate-y-[80%]'
        style={{ transformOrigin: 'center center' }}
      >
        {features.map((feature, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) cardsRef.current[i] = el;
            }}
            className='absolute max-w-[80wv] px-5 py-8 bg-neutral-200/40 border rounded-xl shadow-lg select-none text-center origin-center will-change-transform'
          >
            <h1 className='text-2xl uppercase font-black pb-6'>
              {feature.title}
            </h1>
            {feature.description && (
              <p className='max-w-sm text-balance'>{feature.description}</p>
            )}
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div
        ref={navRef}
        className='absolute bottom-30 left-1/2 -translate-x-1/2 flex items-center gap-6 text-neutral-900'
      >
        <button
          onClick={() => handleRotate('left')}
          className='p-2 rounded-full hover:bg-neutral-300 bg-neutral-200 transition-colors cursor-pointer'
        >
          <ArrowLeft size={32} />
        </button>

        <div className='flex flex-col items-center justify-center w-fit'>
          <div className='font-holtwood text-center select-none text-2xl uppercase'>
            {text}
          </div>
          <div className='text-lg tracking-wider uppercase font-semibold select-none'>
            features
          </div>
        </div>

        <button
          onClick={() => handleRotate('right')}
          className='p-2 rounded-full hover:bg-neutral-300 bg-neutral-200 transition-colors cursor-pointer'
        >
          <ArrowRight size={32} />
        </button>
      </div>
    </div>
  );
};

export default ProjectFeatures;
