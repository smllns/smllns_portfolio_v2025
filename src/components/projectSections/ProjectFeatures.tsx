'use client';

import { useProjectFeaturesScrollAnimations } from '@/hooks/useProjectFeaturesScrollAnimations';
import {
  cornerDoodles,
  doodleStyles,
  FeatureDoodle,
  paperGrain,
  paperStyles,
} from '@/lib/featuresElements';
import React, { useRef } from 'react';

type ProjectFeature = {
  title: string;
  description?: string;
};

type ProjectFeaturesProps = {
  text: string;
  features: ProjectFeature[];
};

const ProjectFeatures = ({ text, features }: ProjectFeaturesProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  useProjectFeaturesScrollAnimations({ sectionRef });
  return (
    <section
      ref={sectionRef}
      className='relative overflow-hidden px-5 py-24 text-neutral-800 sm:px-8 sm:py-32 lg:min-h-dvh lg:px-16 bg-neutral-900 transition-colors duration-200'
    >
      {/* Section heading */}
      <header data-features-header className='mx-auto mb-16 max-w-7xl sm:mb-24'>
        <p
          data-features-heading
          className='mb-4 text-xs uppercase tracking-[0.25em] text-neutral-400'
        >
          A closer look
        </p>

        <div className='flex flex-col gap-5 md:flex-row md:items-end md:justify-between'>
          <h2
            data-features-title
            className='font-holtwood text-4xl uppercase leading-tight sm:text-6xl lg:text-7xl'
          >
            {text}
            <span className='block text-neutral-600'>Features</span>
          </h2>

          <p
            data-features-description
            className='max-w-xs text-sm leading-relaxed text-neutral-500'
          >
            A few things that make this project special. Little details,
            thoughtful decisions, and everything that brings it together.
          </p>
        </div>
      </header>

      {/* Paper notes */}
      <div className='mx-auto grid max-w-7xl grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-14 lg:grid-cols-3 lg:gap-x-12 lg:gap-y-16'>
        {features.map((feature, i) => {
          const style = paperStyles[i % paperStyles.length];
          const doodleStyle = doodleStyles[i % doodleStyles.length];
          const cornerDoodle = cornerDoodles[i % cornerDoodles.length];
          return (
            <div
              key={`${feature.title}-${i}`}
              data-feature-card
              className='w-full'
            >
              <article
                className={[
                  'group relative mx-auto w-full max-w-md',
                  'transition-transform duration-300 ease-out',
                  'hover:z-10 hover:rotate-0 hover:scale-[1.03]',
                  'sm:max-w-none',
                  'lg:will-change-transform',
                  style.rotation,
                  style.offset,
                ].join(' ')}
              >
                {/* Paper tape */}
                <div
                  aria-hidden='true'
                  className='absolute left-1/2 top-0 z-10 h-7 w-20 -translate-x-1/2 -translate-y-1/3 rotate-[-5deg] bg-white/30 shadow-sm backdrop-blur-[1px]'
                />

                {/* Paper */}
                <div
                  className={[
                    'relative flex min-h-64 flex-col',
                    'border border-black/5 px-6 pb-7 pt-9 sm:px-7 sm:pb-8',
                    'shadow-[2px_8px_16px_rgba(0,0,0,0.18)]',
                    'transition-shadow duration-300',
                    'group-hover:shadow-[4px_16px_30px_rgba(0,0,0,0.28)]',
                    style.paper,
                  ].join(' ')}
                >
                  {/* Subtle paper grain */}
                  <div
                    aria-hidden='true'
                    className='pointer-events-none absolute inset-0 opacity-[0.4]'
                    style={{
                      backgroundImage: paperGrain,
                      backgroundRepeat: 'repeat',
                    }}
                  />

                  <div className='relative flex flex-1 flex-col'>
                    <div className='mb-7 flex items-center justify-between'>
                      <span className='font-holtwood text-sm'>
                        {String(i + 1).padStart(2, '0')}.
                      </span>

                      <span
                        aria-hidden='true'
                        className={[
                          'inline-flex items-center justify-center',
                          'text-lg leading-none opacity-60',
                          'transition-transform duration-300',
                          'group-hover:rotate-12 group-hover:scale-125',
                          cornerDoodle.style,
                        ].join(' ')}
                      >
                        {cornerDoodle.symbol}
                      </span>
                    </div>

                    <div className='mb-4 overflow-hidden'>
                      <h3
                        data-feature-title
                        className='font-holtwood text-2xl uppercase leading-tight sm:text-3xl'
                      >
                        {feature.title}
                      </h3>
                    </div>

                    <div className='overflow-hidden'>
                      {feature.description && (
                        <p
                          data-feature-description
                          className='max-w-sm text-sm leading-relaxed opacity-80 sm:text-base'
                        >
                          {feature.description}
                        </p>
                      )}
                    </div>

                    <div className='mt-8 flex justify-end'>
                      <span
                        aria-hidden='true'
                        className={[
                          'flex h-12 w-14 items-center justify-center',
                          'origin-center transition-transform duration-300',
                          'group-hover:scale-110',
                          doodleStyle.rotation,
                          doodleStyle.hoverRotation,
                        ].join(' ')}
                      >
                        <FeatureDoodle
                          variant={i}
                          className={doodleStyle.size}
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          );
        })}
      </div>

      <footer
        data-features-footer
        className='mx-auto mt-20 flex max-w-7xl items-center justify-between border-t border-neutral-700/60 pt-5 text-[10px] uppercase tracking-[0.2em] text-neutral-500 sm:mt-28'
      >
        <span>{text}</span>
        <span>{features.length} little details</span>
      </footer>
    </section>
  );
};

export default ProjectFeatures;
