'use client';

import { useEffect, useState } from 'react';

type TransitionLoaderProps = {
  active: boolean;
  sectionName?: string;
};

export default function TransitionLoader({
  active,
  sectionName,
}: TransitionLoaderProps) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (active) {
      setMounted(true);
      const show = window.setTimeout(() => setVisible(true), 40);
      return () => window.clearTimeout(show);
    }

    setVisible(false);
    const hide = window.setTimeout(() => setMounted(false), 900);
    return () => window.clearTimeout(hide);
  }, [active]);

  if (!mounted) return null;

  return (
    <div
      className={`page-transition-loader-fullscreen ${visible ? 'visible' : ''}`}
      role="status"
      aria-live="polite"
      aria-label={`Loading ${sectionName || 'page'}`}
    >
      <div className="section-loader-content">
        <span className="section-loader-eyebrow">Dr. Daniel Manrique, M.D.</span>
        <span className="section-loader-text">{sectionName || 'Loading'}</span>
        <div className="section-loader-bar" aria-hidden="true"></div>
      </div>
    </div>
  );
}
