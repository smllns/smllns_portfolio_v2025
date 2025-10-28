'use client';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import React, { useRef } from 'react';
import { useProjectHeroAnimation } from '@/hooks/useProjectHeroAnimation';
import AnimatedButton from '../AnimatedButton';

interface ProjectHeroProps {
  text: string;
  link: string;
  image: string;
}

const ProjectHero: React.FC<ProjectHeroProps> = ({ text, link, image }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useProjectHeroAnimation({ containerRef, btnRef, imageRef });

  return (
    <div
      ref={containerRef}
      className='relative p-8 text-center bg-neutral-100 h-dvh overflow-hidden'
    >
      {/* Back Button */}
      <div ref={btnRef} className='absolute top-4 left-4'>
        <AnimatedButton text='←' />
      </div>

      {/* Text Content */}
      <div className='absolute min-[320px]:bottom-[10vh] sm:bottom-[15vh] left-4 flex flex-col items-start justify-start w-fit'>
        <h1 className='split-title min-[320px]:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-holtwood mb-6 min-[320px]:w-full md:w-[70vw] max-w-[700px] text-start z-20 mix-blend-difference leading-[1.1]'>
          {text}
        </h1>

        {/* Live Version Link */}
        <a
          href={link}
          target='_blank'
          rel='noopener noreferrer'
          className='split-title flex flex-col items-start justify-start z-20 text-neutral-900 cursor-pointer group livevers'
        >
          <p className='text-neutral-900/40'>Live Version</p>
          <div className='flex flex-row gap-2 items-center relative'>
            <p className='text-lg group-hover:text-xl group-hover:font-bold transition-all font-normal duration-200'>
              {text}
            </p>
            <ArrowUpRight className='transition-all duration-200 group-hover:text-pink-300' />
            <div className='absolute bottom-0 left-0 w-full h-px bg-neutral-900/40 group-hover:bg-pink-300 transition-colors duration-200' />
          </div>
        </a>
      </div>

      {/* Background Image */}
      <div
        ref={imageRef}
        className='absolute w-full min-[320px]:top-[40%] sm:top-1/2 left-[30vw] -translate-y-1/2 z-10 opacity-0 will-change-transform'
      >
        <Image
          src={image}
          alt='Website screenshot'
          width={2880}
          height={1800}
          className='min-[320px]:h-[50vh] sm:h-[90vh] w-auto object-cover object-left rounded-2xl blur-[2px]'
          priority
        />
      </div>
    </div>
  );
};

export default ProjectHero;
