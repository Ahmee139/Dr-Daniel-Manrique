'use client';

import type { MouseEvent } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { usePageTransition } from '@/context/PageTransitionContext';
import { scrollToHomeAbout } from '@/utils/homeScroll';

export default function HeroSection() {
  const { t } = useLanguage();
  const { navigateWithTransition, transitioning, sectionName } = usePageTransition();
  const isExploreLoading = transitioning && sectionName === t.exploreBtn;

  const goAbout = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    scrollToHomeAbout();
  };

  return (
    <section id="hero" className="hero-section">
      <div className="hero-video-bg-hook" aria-hidden="true">
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/assets/dr-manrique.png"
        >
          <source src="/assets/Clinic%20Clip.mp4" type="video/mp4" />
        </video>
        <div className="hero-video-overlay" />
      </div>
      <div className="container hero-container">
        <div className="hero-content-centered">
          <span className="hero-sub fade-in-up">{t.heroSub}</span>
          <h1 className="hero-title-large fade-in-up" style={{ animationDelay: '0.2s' }}>
            {t.heroTitle}
            <span className="text-highlight-gold" style={{ display: 'block', marginTop: '10px' }}>
              {t.heroTitleHighlight}
            </span>
          </h1>
          <p className="hero-description-centered fade-in-up" style={{ animationDelay: '0.4s' }}>
            {t.heroDesc}
          </p>
          <div className="hero-bullets-centered fade-in-up" style={{ animationDelay: '0.5s' }}>
            <div className="bullet-item-centered">
              <span className="bullet-circle-icon">
                <svg viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" strokeWidth="3" fill="none">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </span>
              <span className="bullet-info-text">{t.bulletENT}</span>
            </div>
            <div className="bullet-item-centered">
              <span className="bullet-circle-icon">
                <svg viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" strokeWidth="3" fill="none">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </span>
              <span className="bullet-info-text">{t.bulletLaser}</span>
            </div>
          </div>
          <div className="hero-actions-centered fade-in-up" style={{ animationDelay: '0.6s' }}>
            <button
              type="button"
              className={`btn btn-gold btn-large btn-with-loader ${isExploreLoading ? 'is-loading' : ''}`}
              onClick={() => navigateWithTransition('/procedures', t.exploreBtn)}
              disabled={transitioning}
              aria-busy={isExploreLoading}
            >
              <span>{t.exploreBtn}</span>
              <span className="btn-inline-spinner" aria-hidden="true" />
            </button>
            <a href="#about" onClick={goAbout} className="btn btn-outline btn-outline-on-dark btn-large">
              {t.meetBtn}
              <svg viewBox="0 0 24 24" width="15" height="15" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="btn-arrow">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
