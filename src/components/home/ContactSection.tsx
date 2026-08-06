'use client';

import { useEffect, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { usePageTransition } from '@/context/PageTransitionContext';
import { siteInfo } from '@/data/site';

export default function ContactSection() {
  const { t } = useLanguage();
  const { navigateWithTransition, transitioning, sectionName } = usePageTransition();
  const stageRef = useRef<HTMLDivElement>(null);
  const isLoading = transitioning && sectionName === t.bookConsultation;

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return undefined;

    let ticking = false;
    const update = () => {
      ticking = false;
      const rect = stage.getBoundingClientRect();
      const view = window.innerHeight || 1;
      const inView = rect.top < view * 0.82 && rect.bottom > view * 0.15;
      stage.classList.toggle('is-in', inView);
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    const boot = window.setTimeout(update, 40);
    return () => {
      window.clearTimeout(boot);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <section id="contact" className="home-showcase contact-showcase">
      <div className="container">
        <div className="home-showcase-header">
          <span className="section-pre">{t.contactPre}</span>
          <h2 className="section-title">{t.contactTitle}</h2>
        </div>

        <div ref={stageRef} className="home-showcase-stage">
          <a className="home-showcase-card from-left" href={`mailto:${siteInfo.email}`}>
            <span className="home-showcase-label">{t.contactEmail}</span>
            <span className="home-showcase-value">{siteInfo.email}</span>
            <span className="home-showcase-arrow" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </span>
          </a>

          <a
            className="home-showcase-card from-right"
            href={`tel:${siteInfo.phones[0].replace(/[^\d+]/g, '')}`}
          >
            <span className="home-showcase-label">{t.contactPhone}</span>
            <span className="home-showcase-value">{siteInfo.phones[0]}</span>
            <span className="home-showcase-arrow" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </span>
          </a>
        </div>

        <div className="home-showcase-cta">
          <button
            type="button"
            className={`btn btn-gold btn-showcase-cta btn-with-loader ${isLoading ? 'is-loading' : ''}`}
            onClick={() => navigateWithTransition('/consultation', t.bookConsultation)}
            disabled={transitioning}
            aria-busy={isLoading}
          >
            <span>{t.bookConsultation}</span>
            <span className="btn-inline-spinner" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
