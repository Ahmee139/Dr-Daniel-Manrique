'use client';

import { useEffect, type DependencyList } from 'react';

export function useScrollReveal(deps: DependencyList = []): void {
  useEffect(() => {
    const elements = document.querySelectorAll('.scroll-reveal');
    if (!elements.length) return undefined;

    if (!('IntersectionObserver' in window)) {
      elements.forEach((el) => el.classList.add('visible'));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target;
          const shouldRepeat = el.classList.contains('reveal-repeat');

          if (entry.isIntersecting) {
            if (shouldRepeat) {
              el.classList.remove('visible');
              void (el as HTMLElement).offsetWidth;
            }
            el.classList.add('visible');
            if (!shouldRepeat) observer.unobserve(el);
          } else if (shouldRepeat) {
            el.classList.remove('visible');
          }
        });
      },
      { threshold: 0.18, rootMargin: '0px 0px -10% 0px' }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, deps);
}
