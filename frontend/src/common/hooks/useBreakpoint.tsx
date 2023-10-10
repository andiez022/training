import { useEffect, useState } from 'react';

const breakpoints = {
  0: 'xs',
  576: 'sm',
  768: 'md',
  992: 'lg',
  1200: 'xl',
  1600: 'xxl',
};

export enum BreakPoint {
  XS = 'xs',
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  XL = 'xl',
  XXL = 'xxl',
}

const useBreakpoint = () => {
  const [breakpoint, setBreakPoint] = useState('');
  const [windowSize, setWindowSize] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });

  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();
    if (windowSize.width > 0 && windowSize.width < 576) {
      setBreakPoint(breakpoints[0]);
    }
    if (windowSize.width >= 576 && windowSize.width < 768) {
      setBreakPoint(breakpoints[576]);
    }
    if (windowSize.width >= 768 && windowSize.width < 992) {
      setBreakPoint(breakpoints[768]);
    }
    if (windowSize.width >= 992 && windowSize.width < 1200) {
      setBreakPoint(breakpoints[992]);
    }
    if (windowSize.width >= 1200 && windowSize.width < 1600) {
      setBreakPoint(breakpoints[1200]);
    }
    if (windowSize.width >= 1600) {
      setBreakPoint(breakpoints[1600]);
    }

    return () => window.removeEventListener('resize', handleResize);
  }, [windowSize.width]);
  return breakpoint;
};

export default useBreakpoint;
