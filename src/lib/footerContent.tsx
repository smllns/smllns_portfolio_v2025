export const circlesDesktop = [
  { cx: 21.5, cy: 80.1396, r: 67 },
  { cx: 146.5, cy: 80.1396, r: 78 },
  { cx: 254.5, cy: 89.1396, r: 52 },
  { cx: 380, cy: 111.64, r: 109.5 },
  { cx: 542.227, cy: 70.227, r: 68.8459 },
];

export const circlesMobile = [
  { cx: 84, cy: 48, r: 47.5 },
  { cx: 10, cy: 65, r: 47.5 },
  { cx: 144, cy: 55, r: 33.5 },
  { cx: 216, cy: 50, r: 47.5 },
];

export const flowerConfigs = [
  { variant: 'one', size: 120, position: 'top-0 left-10 z-2' },
  { variant: 'two', size: 60, position: 'top-10 left-2/3 z-2' },
  { variant: 'three', size: 90, position: 'top-0 -right-5 z-2' },
];
export const footerItems = {
  clickFunc: () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  },
  siteName: 'smllns portfolio',
  linkedIn: (
    <a
      href='https://www.linkedin.com/in/smllns/'
      target='_blank'
      rel='noopener noreferrer'
      className='underline hover:text-pink-300 transition-colors'
    >
      mariia smolianskaia
    </a>
  ),
};
