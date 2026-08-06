'use client';

import { useEffect, useState } from 'react';
import HeroSection from '@/components/home/HeroSection';
import AboutSection from '@/components/home/AboutSection';
import ProceduresSection from '@/components/home/ProceduresSection';
import StatsSection from '@/components/home/StatsSection';
import AdvantagesSection from '@/components/home/AdvantagesSection';
import ContactSection from '@/components/home/ContactSection';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { scrollToHomeAbout } from '@/utils/homeScroll';

function shouldPlayIntroLoader() {
  if (typeof window === 'undefined') return true;
  const nav = performance.getEntriesByType('navigation')[0] as
    | PerformanceNavigationTiming
    | undefined;
  if (nav?.type === 'reload') return true;
  return sessionStorage.getItem('dm-home-ready') !== '1';
}

export default function HomePage() {
  const [loaderStep, setLoaderStep] = useState(() => (shouldPlayIntroLoader() ? 0 : 5));

  useEffect(() => {
    document.body.style.overflow = loaderStep < 5 ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [loaderStep]);

  useEffect(() => {
    if (loaderStep >= 5) {
      sessionStorage.setItem('dm-home-ready', '1');
      return undefined;
    }

    const timers = [
      window.setTimeout(() => setLoaderStep(1), 1400),
      window.setTimeout(() => setLoaderStep(2), 2800),
      window.setTimeout(() => setLoaderStep(3), 4300),
      window.setTimeout(() => setLoaderStep(4), 6000),
      window.setTimeout(() => setLoaderStep(5), 7800),
    ];
    return () => timers.forEach((id) => window.clearTimeout(id));
    // Run intro sequence once on mount only
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (loaderStep >= 5) sessionStorage.setItem('dm-home-ready', '1');
  }, [loaderStep]);

  useScrollReveal([loaderStep]);

  useEffect(() => {
    window.history.scrollRestoration = 'manual';
    const hash = window.location.hash.replace('#', '');
    if (!hash) {
      if (loaderStep >= 5) window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      return undefined;
    }
    if (loaderStep < 5) return undefined;
    const timer = window.setTimeout(() => {
      if (hash === 'about') {
        scrollToHomeAbout('smooth');
        return;
      }
      if (hash === 'hero' || hash === 'home') {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
        return;
      }
      const el = document.getElementById(hash);
      if (!el) return;
      const y = Math.max(0, Math.round(el.getBoundingClientRect().top + window.scrollY - 72));
      window.scrollTo({ top: y, behavior: 'smooth' });
    }, 120);
    return () => window.clearTimeout(timer);
  }, [loaderStep]);

  return (
    <div className={`page-wrapper ${loaderStep >= 4 ? 'loaded' : 'loading'}`}>
      {loaderStep < 5 && (
        <div className={`page-loader ${loaderStep >= 4 ? 'dismissed' : ''}`}>
          <div className="loader-content">
            <span className={`loader-word ${loaderStep === 0 ? 'active' : ''}`}>Dr.</span>
            <span className={`loader-word ${loaderStep === 1 ? 'active' : ''}`}>Daniel</span>
            <span className={`loader-word ${loaderStep === 2 ? 'active' : ''}`}>Manrique</span>
            <span className={`loader-word ${loaderStep === 3 ? 'active' : ''} logo-style`}>
              Dr. Daniel Manrique, M.D.
            </span>
          </div>
        </div>
      )}

      {/* Overlap stack: Hero → About → Procedures only */}
      <div className="pin-stack">
        <div className="pin-panel pin-panel-hero">
          <HeroSection />
        </div>

        <div className="pin-stack">
          <div className="pin-panel pin-panel-about">
            <AboutSection />
          </div>

          {/* Extra scroll room so About stays pinned for ~2–3 screens */}
          <div className="pin-hold" aria-hidden="true" />

          <div className="pin-panel pin-panel-procedures">
            <ProceduresSection />
          </div>
        </div>
      </div>

      {/* Normal flow sections */}
      <StatsSection />
      <AdvantagesSection />
      <ContactSection />
    </div>
  );
}
