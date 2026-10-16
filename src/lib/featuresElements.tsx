export const paperStyles = [
  {
    paper: 'bg-[#E9E1D2] text-neutral-900',
    rotation: 'lg:rotate-[-4deg]',
    offset: 'lg:translate-y-8',
  },
  {
    paper: 'bg-[#D9D7CD] text-neutral-900',
    rotation: 'lg:rotate-[3deg]',
    offset: 'lg:-translate-y-2',
  },
  {
    paper: 'bg-[#DCE5D4] text-neutral-900',
    rotation: 'lg:rotate-[-2deg]',
    offset: 'lg:translate-y-12',
  },
  {
    paper: 'bg-[#E4D9E8] text-neutral-900',
    rotation: 'lg:rotate-[4deg]',
    offset: 'lg:-translate-y-4',
  },
  {
    paper: 'bg-[#E9E1D2] text-neutral-900',
    rotation: 'lg:rotate-[-3deg]',
    offset: 'lg:translate-y-6',
  },
  {
    paper: 'bg-[#D9D7CD] text-neutral-900',
    rotation: 'lg:rotate-[2deg]',
    offset: 'lg:-translate-y-2',
  },
];

export const doodleStyles = [
  {
    size: 'h-9 w-10',
    rotation: 'rotate-[-12deg]',
    hoverRotation: 'group-hover:rotate-[-18deg]',
  },
  {
    size: 'h-7 w-8',
    rotation: 'rotate-[8deg]',
    hoverRotation: 'group-hover:rotate-[14deg]',
  },
  {
    size: 'h-10 w-11',
    rotation: 'rotate-[3deg]',
    hoverRotation: 'group-hover:rotate-[-4deg]',
  },
  {
    size: 'h-8 w-9',
    rotation: 'rotate-[-7deg]',
    hoverRotation: 'group-hover:rotate-[2deg]',
  },
  {
    size: 'h-9 w-8',
    rotation: 'rotate-[14deg]',
    hoverRotation: 'group-hover:rotate-[20deg]',
  },
  {
    size: 'h-8 w-10',
    rotation: 'rotate-[-3deg]',
    hoverRotation: 'group-hover:rotate-[-11deg]',
  },
];

export const cornerDoodles = [
  { symbol: '♡', style: 'rotate-[-12deg] scale-110' },
  { symbol: '〰', style: 'rotate-[8deg] scale-90' },
  { symbol: '☻', style: 'rotate-[-6deg] scale-90' },
  { symbol: '✧', style: 'rotate-[12deg] scale-110' },
  { symbol: '✿', style: 'rotate-[-8deg] scale-100' },
  { symbol: '⌁', style: 'rotate-[5deg] scale-90' },
];

export const paperGrain = `url("data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(#n)" opacity="0.35"/></svg>',
)}")`;

type FeatureDoodleProps = {
  variant: number;
  className?: string;
};

export const FeatureDoodle = ({ variant, className }: FeatureDoodleProps) => {
  switch (variant % 4) {
    case 0:
      // Hand-drawn heart
      return (
        <svg
          viewBox='0 0 48 42'
          fill='none'
          className={className}
          aria-hidden='true'
        >
          <path
            d='M24 35 C19 30 7 22 7 14 C7 5 18 4 24 13 C30 4 41 6 41 15 C41 23 30 31 24 35Z'
            stroke='currentColor'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M22 37 C15 29 9 24 9 15 C9 9 14 7 19 10'
            stroke='currentColor'
            strokeWidth='1'
            strokeLinecap='round'
            opacity='0.45'
          />
        </svg>
      );

    case 1:
      // Irregular blob
      return (
        <svg
          viewBox='0 0 48 42'
          fill='none'
          className={className}
          aria-hidden='true'
        >
          <path
            d='M8 23 C4 15 12 8 19 10 C26 3 34 10 37 16 C45 22 38 31 31 32 C23 40 15 33 11 30 C7 29 6 26 8 23Z'
            stroke='currentColor'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M10 21 C11 14 17 12 21 13 M15 31 C23 36 31 29 34 27'
            stroke='currentColor'
            strokeWidth='1'
            strokeLinecap='round'
            opacity='0.5'
          />
        </svg>
      );

    case 2:
      // Loose pencil squiggle
      return (
        <svg
          viewBox='0 0 48 42'
          fill='none'
          className={className}
          aria-hidden='true'
        >
          <path
            d='M5 28 C11 9 16 37 23 19 C29 3 32 34 42 13'
            stroke='currentColor'
            strokeWidth='1.5'
            strokeLinecap='round'
          />
          <path
            d='M7 32 C14 17 17 35 24 23'
            stroke='currentColor'
            strokeWidth='1'
            strokeLinecap='round'
            opacity='0.5'
          />
        </svg>
      );

    default:
      // Hand-drawn star
      return (
        <svg
          viewBox='0 0 48 42'
          fill='none'
          className={className}
          aria-hidden='true'
        >
          <path
            d='M24 5 L27 16 L38 12 L31 21 L40 28 L28 27 L25 38 L21 27 L10 32 L16 22 L7 15 L19 17Z'
            stroke='currentColor'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M25 8 L28 17 M12 29 L19 25'
            stroke='currentColor'
            strokeWidth='1'
            strokeLinecap='round'
            opacity='0.45'
          />
        </svg>
      );
  }
};
