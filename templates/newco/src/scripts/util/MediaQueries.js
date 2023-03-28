export const MediaQueries = {
  MOTION_QUERY: window.matchMedia('(prefers-reduced-motion: reduce)'),
  SM: window.matchMedia('(min-width: 640px)'),
  MD: window.matchMedia('(min-width: 768px)'),
  LG: window.matchMedia('(min-width: 1024px)'),
  XL: window.matchMedia('(min-width: 1280px)'),
  '2XL': window.matchMedia('(min-width: 1536px)'),
};
