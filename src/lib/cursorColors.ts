export type CursorColorSet = {
  main: string;
  circle: string;
};
export const CURSOR_COLOR_MAP: Record<string, CursorColorSet> = {
  '/portfolio/lunera': { main: '#7293f5', circle: '#f3f3f3' },
  '/portfolio/film-club': { main: '#c88df5', circle: '#6fe7ff' },
  '/portfolio/moodflow': { main: '#f58df0', circle: '#5fdd74' },
  '/portfolio/crumb-bakery': { main: '#9ed783', circle: '#ddd05f' },
  '/portfolio/fe-interview-hub': { main: '#83add7', circle: '#5fdd91' },
  // fallback
  default: { main: '#FF9AAF', circle: '#FACF71' },
};

export const getCursorColors = (pathname: string): CursorColorSet => {
  return CURSOR_COLOR_MAP[pathname] ?? CURSOR_COLOR_MAP.default;
};
