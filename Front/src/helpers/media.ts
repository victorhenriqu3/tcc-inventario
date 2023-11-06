import breakpoints from './breakpoints';

const customMediaQuery = (maxWidth: number) => `@media (min-width: ${maxWidth}px)`;

const untilMediaQuery = (maxWidth: number) => `@media (max-width: ${maxWidth}px)`;

const media = {
  custom: customMediaQuery,
  customUntil: untilMediaQuery,
  phone: customMediaQuery(breakpoints.sm),
  tablet: customMediaQuery(breakpoints.md),
  desktop: customMediaQuery(breakpoints.lg),
  largeDesktop: customMediaQuery(breakpoints.xl),
  untilPhone: untilMediaQuery(breakpoints.sm),
  untilTablet: untilMediaQuery(breakpoints.md),
  untilDesktop: untilMediaQuery(breakpoints.lg),
  untilLargeDesktop: untilMediaQuery(breakpoints.xl),
};

export default media;
