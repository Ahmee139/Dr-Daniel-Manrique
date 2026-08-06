'use client';

import type { MouseEvent } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function HeroSection() {
  const { t } = useLanguage();

  const scrollTo = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="hero-section">
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
            <Link href="/procedures" className="btn btn-gold btn-large">
              {t.exploreBtn}
            </Link>
            <a href="#about" onClick={(e) => scrollTo(e, 'about')} className="btn btn-outline btn-outline-on-dark btn-large">
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
