'use client';

import { useEffect } from 'react';

/** On browser refresh, always land on the home page at the top. */
export default function RefreshToHome() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    window.history.scrollRestoration = 'manual';

    const nav = performance.getEntriesByType('navigation')[0] as
      | PerformanceNavigationTiming
      | undefined;

    if (nav?.type !== 'reload') return;

    if (window.location.pathname !== '/' || window.location.hash || window.location.search) {
      window.location.replace('/');
      return;
    }

    window.scrollTo(0, 0);
  }, []);

  return null;
}
