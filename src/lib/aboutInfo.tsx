// content for about section
import { Highlighter } from '@/components/Highlighter';
import { HighlighterRef } from '@/components/sections/AboutSection';
import React from 'react';

export const getTexts = (
  textLeftRef: React.RefObject<HTMLHeadingElement | null>,
  textRightRef: React.RefObject<HTMLHeadingElement | null>
) => [
  { ref: textLeftRef, text: 'frontend', top: 'min-[320px]:top-5 md:top-15' },
  {
    ref: textRightRef,
    text: 'developer',
    top: 'min-[320px]:top-12 sm:top-20 md:top-35',
  },
];

export const getFlowers = (
  flowerRef1: React.RefObject<HTMLDivElement | null>,
  flowerRef2: React.RefObject<HTMLDivElement | null>,
  flowerRef3: React.RefObject<HTMLDivElement | null>
) =>
  [
    { ref: flowerRef1, variant: 'one', size: 120, position: 'top-0 left-10' },
    {
      ref: flowerRef2,
      variant: 'two',
      size: 140,
      position: '-bottom-20 left-15',
    },
    {
      ref: flowerRef3,
      variant: 'three',
      size: 150,
      position: 'bottom-0 -right-20',
    },
  ] as const;

export const getAboutItems = (
  highlightLocation: React.RefObject<HighlighterRef | null>,
  highlightTech: React.RefObject<HighlighterRef | null>
) => [
  {
    label: 'Name:',
    value: 'Mariia Smolianskaia',
  },
  {
    label: 'Location:',
    value: (
      <Highlighter ref={highlightLocation} color='#78c2ff' action='box'>
        Sofia, Bulgaria
      </Highlighter>
    ),
  },
  {
    label: 'Experience:',
    value: (
      <>
        Software engineer with <span className='font-holtwood'>3+</span> years
        of experience (crypto startups, design agencies, iGaming companies)
      </>
    ),
  },
  {
    label: 'Core tech stack:',
    value: (
      <Highlighter ref={highlightTech} color='#f278ff8b' action='highlight'>
        React, Next.js, TypeScript, Tailwind CSS
      </Highlighter>
    ),
  },
];

export const getHobbies = (
  highlightReading: React.RefObject<HighlighterRef | null>,
  highlightMovies: React.RefObject<HighlighterRef | null>
) => [
  {
    label: 'Hobbies:',
    value: (
      <>
        <a
          href='https://www.goodreads.com/user/show/179076193-mariia-s'
          target='_blank'
          rel='noopener noreferrer'
          className='hover:font-bold transition-all duration-300 read'
        >
          <Highlighter ref={highlightReading} color='#369f36bb'>
            Reading
          </Highlighter>
        </a>
        ,{' '}
        <a
          href='https://letterboxd.com/smllns/'
          target='_blank'
          rel='noopener noreferrer'
          className='hover:font-bold transition-all duration-300 watch'
        >
          <Highlighter ref={highlightMovies} color='#ffeb78'>
            watching movies
          </Highlighter>
        </a>
        , and traveling
      </>
    ),
  },
];
