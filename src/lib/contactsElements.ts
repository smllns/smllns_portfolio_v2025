export const arrows = [
  'absolute sm:w-25 sm:h-25 min-[320px]:h-15 min-[320px]:w-15 min-[320px]:-left-10 sm:-left-20 top-8 -translate-x-1/2 -translate-y-1/2 -rotate-60',
  'absolute sm:w-25 sm:h-25 min-[320px]:h-15 min-[320px]:w-15 sm:-left-30 min-[320px]:-left-10 min-[320px]:-bottom-15 sm:-bottom-20 -translate-x-1/2 -translate-y-1/2 -rotate-100',
  'absolute sm:w-25 sm:h-25 min-[320px]:h-15 min-[320px]:w-15 sm:-right-45 min-[320px]:-right-20 min-[320px]:top-10 sm:top-10 -translate-x-1/2 -translate-y-1/2 rotate-60',
  'absolute sm:w-25 sm:h-25 min-[320px]:h-15 min-[320px]:w-15 sm:-right-45 min-[320px]:-right-25 min-[320px]:-bottom-18 sm:-bottom-25 -translate-x-1/2 -translate-y-1/2 rotate-110',
];
export const getCirclesConfig = (
  leftCircleRef: React.RefObject<HTMLDivElement | null>,
  rightCircleRef: React.RefObject<HTMLDivElement | null>
) => [
  { ref: leftCircleRef, side: 'left-8' },
  { ref: rightCircleRef, side: 'right-8' },
];
