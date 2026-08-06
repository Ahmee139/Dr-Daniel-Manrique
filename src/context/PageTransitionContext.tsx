'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { usePathname, useRouter } from 'next/navigation';
import TransitionLoader from '@/components/TransitionLoader';

type PageTransitionContextValue = {
  transitioning: boolean;
  sectionName: string;
  navigateWithTransition: (url: string, label: string) => void;
};

const PageTransitionContext = createContext<PageTransitionContextValue | null>(null);

export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [transitioning, setTransitioning] = useState(false);
  const [sectionName, setSectionName] = useState('');

  useEffect(() => {
    const release = window.setTimeout(() => {
      setTransitioning(false);
      setSectionName('');
    }, 420);
    return () => window.clearTimeout(release);
  }, [pathname]);

  const navigateWithTransition = useCallback(
    (url: string, label: string) => {
      if (transitioning) return;
      if (url === pathname) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      setSectionName(label);
      setTransitioning(true);
      window.setTimeout(() => router.push(url), 1600);
    },
    [pathname, router, transitioning]
  );

  const value = useMemo(
    () => ({ transitioning, sectionName, navigateWithTransition }),
    [transitioning, sectionName, navigateWithTransition]
  );

  return (
    <PageTransitionContext.Provider value={value}>
      {children}
      <TransitionLoader active={transitioning} sectionName={sectionName} />
    </PageTransitionContext.Provider>
  );
}

export function usePageTransition() {
  const ctx = useContext(PageTransitionContext);
  if (!ctx) {
    throw new Error('usePageTransition must be used within PageTransitionProvider');
  }
  return ctx;
}
