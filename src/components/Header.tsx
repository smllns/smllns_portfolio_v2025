'use client';

import { useRef } from 'react';
import { useHeaderAnimation } from '@/hooks/useHeaderAnimation';

export default function Header() {
  const nameRef = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef<HTMLParagraphElement>(null);
  const footerRef = useRef<HTMLParagraphElement>(null);
  const arrowRef = useRef<SVGPathElement>(null);

  // Trigger animations
  useHeaderAnimation(nameRef, roleRef, footerRef, arrowRef);

  return (
    <div className='flex items-center justify-center z-20 pointer-events-none'>
      <div className='relative pointer-events-auto min-[320px]:-mt-40 sm:mt-0'>
        {/* Role (animated char-by-char) */}
        <p
          ref={roleRef}
          className='absolute left-1/2 min-w-[264px] -top-7 text-white min-[320px]:text-lg sm:text-xl md:text-2xl font-holtwood -translate-x-1/2 z-25'
        >
          FRONTEND DEVELOPER
        </p>

        {/* Name (slide-up) */}
        <h1
          ref={nameRef}
          className='min-[320px]:text-4xl sm:text-5xl font-holtwood font-bold text-white drop-shadow-2xl bg-neutral-900 hover:text-[#ffe066] transition-colors duration-600 px-6 py-3 rounded-lg text-center z-10 will-change-transform'
          style={{
            opacity: 0,
            transform: 'translateY(60px)',
            willChange: 'transform, opacity',
          }}
        >
          MARIIA SMOLIANSKAIA
        </h1>

        {/* Footer note (fade-in) */}
        <p
          ref={footerRef}
          className='absolute min-[320px]:right-5 opacity-0 lg:right-0 -bottom-4 text-white text-sm z-15'
        >
          (don’t forget to touch the flowers)
        </p>

        {/* Scroll-down arrow (draw + hover) */}
        <svg
          className='absolute left-1/2 -bottom-35 -translate-x-1/2  hover:scale-110 transition-transform duration-300 z-10'
          width='30'
          height='100'
          viewBox='-10 0 85 265'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          role='button'
          aria-label='Scroll to about section'
        >
          <path
            ref={arrowRef}
            d='M44.3521 188.856C47.2704 182.336 50.1919 175.407 53.1103 168.887C56.0318 161.958 64.2488 158.751 70.7759 162.074C74.8553 164.151 74.4168 167.828 72.7497 171.495C66.4969 185.35 61.4665 200.033 53.9883 213.469C49.0061 222.017 46.4746 231.403 40.2669 239.533C34.4721 247.257 21.3729 246.336 17.3482 237.308C13.7266 229.1 10.5178 220.487 8.13134 211.472C6.14152 204.095 3.32941 197.121 0.926816 190.15C-1.46613 181.953 0.59773 179.924 9.20475 179.174C16.1736 178.411 19.0048 182.932 22.2362 188.682C24.7482 181.75 22.7457 176.009 22.7875 170.693C22.5002 155.151 21.3939 139.603 21.1066 124.061C20.8612 103.203 17.7456 82.7314 15.862 61.8607C14.7203 50.8103 13.5786 39.7597 12.8463 28.7126C12.4819 22.9845 12.527 17.2597 10.5243 11.5188C8.51839 6.18674 11.0109 1.70821 15.5256 0.516918C22.0913 -1.06717 27.8092 1.02239 28.996 6.34796C30.1892 10.8557 30.9696 15.7691 31.3405 20.6793C32.3697 46.0417 36.6785 71.0212 37.7043 96.7925C38.3432 119.698 40.2138 142.204 40.8527 165.11C41.2011 172.883 42.3655 181.071 43.1235 188.847C43.5362 188.441 43.9457 188.444 44.3521 188.856Z'
            stroke='#FACF71'
            strokeWidth='8'
            fill='none'
          />
        </svg>
      </div>
    </div>
  );
}
