'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useProjectTechnologiesEntranceAnimation } from '@/hooks/useProjectTechnologiesEntranceAnimation';
import { useTechCardAnimation } from '@/hooks/useTechCardAnimation';
import { useTechContentSwitchAnimation } from '@/hooks/useTechContentSwitchAnimation';
import MobileDrawer from '../MobileDrawer';

const ProjectTechnologies = ({
  technologies,
}: {
  technologies: { title: string; description: string }[];
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const h1Ref = useRef<HTMLDivElement>(null);
  const pRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const techRefs = useRef<HTMLSpanElement[]>([]);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Auto-select first tech on desktop
  useEffect(() => {
    if (window.innerWidth >= 640) {
      setActiveIndex(0);
    }
  }, []);

  useProjectTechnologiesEntranceAnimation(
    sectionRef,
    overlayRef,
    h1Ref,
    pRef,
    techRefs
  );
  useTechCardAnimation(cardRef, sectionRef, activeIndex);

  const handleTechChange = useTechContentSwitchAnimation(
    titleRef,
    descRef,
    cardRef,
    activeIndex,
    (index: number) => {
      setActiveIndex(index);
      if (window.innerWidth < 640) {
        setIsDrawerOpen(true);
      }
    }
  );

  // Handle click with drawer control
  const onTechClick = (index: number) => {
    const shouldOpenDrawer = handleTechChange(index);
    if (shouldOpenDrawer) {
      setIsDrawerOpen(true);
    }
  };

  return (
    <div
      ref={sectionRef}
      className='relative h-dvh bg-neutral-100 overflow-hidden flex items-center justify-center px-8'
    >
      {/* Background overlay */}
      <div
        ref={overlayRef}
        className='absolute top-0 left-0 h-full w-full bg-neutral-900 translate-x-full'
      />

      {/* Title */}
      <div
        ref={h1Ref}
        className='absolute top-[10vh] text-center whitespace-nowrap min-[320px]:text-3xl sm:text-5xl md:text-6xl lg:text-7xl uppercase font-holtwood mix-blend-difference z-10'
      >
        Technologies
      </div>

      {/* Mobile hint */}
      <div
        ref={pRef}
        className='absolute top-[15vh] text-center text-sm sm:hidden uppercase mix-blend-difference z-10'
      >
        (click to read more)
      </div>

      {/* Tech Cloud + Card */}
      <div className='relative z-10 flex flex-col min-[320px]:pt-0 sm:pt-[5dvh] sm:flex-row justify-around items-center gap-8 w-full sm:h-[50dvh] max-w-6xl mt-16'>
        {/* Tech Tags */}
        <div className='flex flex-wrap justify-center sm:justify-start gap-3 sm:w-1/2 text-neutral-800'>
          {technologies.map((tech, i) => (
            <span
              key={i}
              ref={(el) => {
                if (el) techRefs.current[i] = el;
              }}
              onClick={() => onTechClick(i)}
              className={`px-4 py-2 rounded-full learn text-neutral-900 cursor-pointer text-sm font-semibold uppercase tracking-wide transition-all duration-300 ${
                activeIndex === i && window.innerWidth >= 640
                  ? 'bg-neutral-200 shadow-inner '
                  : 'bg-neutral-100/70 hover:bg-neutral-300'
              }`}
            >
              {tech.title}
            </span>
          ))}
        </div>

        {/* Desktop Card */}
        {activeIndex !== null && (
          <div
            ref={cardRef}
            className='relative min-[320px]:hidden sm:flex flex-col items-center justify-center w-full gap-8 p-4 sm:w-1/2 md:w-1/3 aspect-square bg-neutral-100 rounded-full sm:rounded-2xl shadow-2xl shadow-neutral-400/40 backdrop-blur-sm transform transition-transform overflow-hidden'
          >
            <h3
              ref={titleRef}
              className='sm:text-xl lg:text-3xl font-bold text-neutral-900 text-center'
            >
              {technologies[activeIndex].title}
            </h3>
            <p
              ref={descRef}
              className='text-neutral-800 sm:text-sm md:text-md text-center leading-relaxed'
            >
              {technologies[activeIndex].description}
            </p>
          </div>
        )}
      </div>

      {/* Mobile Drawer */}
      <MobileDrawer
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
        activeIndex={activeIndex}
        technologies={technologies}
      />
    </div>
  );
};

export default ProjectTechnologies;
