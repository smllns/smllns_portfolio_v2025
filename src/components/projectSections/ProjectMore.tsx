'use client';
import React, { useRef } from 'react';
import Footer from '../Footer';
import { useRouter } from 'next/navigation';
import { useProjectMoreAnimation } from '@/hooks/useProjectMoreAnimation';

const ProjectMore = ({
  more,
  images,
}: {
  more: string[];
  images: string[];
}) => {
  const router = useRouter();
  const sectionRef = useRef<HTMLDivElement>(null);
  const h1Ref = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  // Handle navigation with optional page transition
  const handleClick = (link: string) => {
    const animate = window.pageTransition;
    if (animate) animate(link);
    else router.push(link);
  };

  useProjectMoreAnimation(sectionRef, h1Ref, cardsRef);

  return (
    <div
      ref={sectionRef}
      className='h-dvh bg-neutral-100 flex flex-col justify-around p-2 sm:p-8'
    >
      {/* Title */}
      <div
        ref={h1Ref}
        className='text-neutral-900 text-3xl md:text-4xl lg:text-5xl font-holtwood uppercase text-center'
      >
        Explore other projects
      </div>

      {/* Project Cards */}
      <div className='flex flex-col sm:flex-row items-center justify-center gap-8 -mt-10'>
        {more.map((link, i) => {
          const title =
            link.split('/').filter(Boolean).pop()?.replace(/-/g, ' ') ??
            'Project';

          return (
            <div
              key={i}
              ref={(el) => {
                if (el) cardsRef.current[i] = el;
              }}
              onClick={() => handleClick(link)}
              style={{
                backgroundImage: `url(${images[i]})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
              className='cursor-pointer group relative h-55 sm:h-80 aspect-16/10 text-neutral-100 rounded-3xl flex items-center justify-center transition-transform duration-500 hover:scale-105 hover:shadow-2xl overflow-hidden'
            >
              {/* Dark overlay */}
              <div className='absolute inset-0 bg-black/60 group-hover:bg-black/20 transition-colors duration-500' />

              {/* Title */}
              <span className='relative z-10 bg-black/60 rounded-2xl p-2 text-2xl sm:text-3xl font-holtwood uppercase tracking-wider transition-colors duration-300'>
                {title}
              </span>

              {/* Subtle light gradient on hover */}
              <div className='absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-30 bg-linear-to-br from-white/30 to-transparent transition-opacity duration-500 pointer-events-none' />
            </div>
          );
        })}
      </div>

      {/* Desktop Footer */}
      <div className='hidden sm:block'>
        <Footer />
      </div>
    </div>
  );
};

export default ProjectMore;
