'use client';

import { useEffect, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { usePageTransition } from '@/context/PageTransitionContext';
import { procedureCategories } from '@/data/procedures';

export default function ProceduresSection() {
  const { t } = useLanguage();
  const { navigateWithTransition, transitioning, sectionName } = usePageTransition();
  const stageRef = useRef<HTMLDivElement>(null);
  const isLoading = transitioning && sectionName === t.viewAllProcedures;

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return undefined;

    let ticking = false;

    const getTopMostPinPanel = () => {
      const panels = Array.from(document.querySelectorAll('.pin-panel'));
      const covering = panels.filter((node) => {
        const rect = node.getBoundingClientRect();
        return rect.top <= window.innerHeight * 0.45 && rect.bottom > window.innerHeight * 0.35;
      });
      if (!covering.length) return null;
      return covering.sort((a, b) => {
        const zA = Number(getComputedStyle(a).zIndex) || 0;
        const zB = Number(getComputedStyle(b).zIndex) || 0;
        return zB - zA;
      })[0];
    };

    const update = () => {
      ticking = false;
      const top = getTopMostPinPanel();
      const pinned = Boolean(top?.classList.contains('pin-panel-procedures'));
      const rect = stage.getBoundingClientRect();
      const view = window.innerHeight || 1;
      const inView = rect.top < view * 0.85 && rect.bottom > view * 0.12;
      stage.classList.toggle('is-in', pinned || inView);
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
    <section
      id="procedures"
      className="procedures-section procedures-section-premium procedures-cards-section"
    >
      <div className="container">
        <div className="procedures-cards-header">
          <span className="section-pre">{t.proceduresPre}</span>
          <h2 className="procedures-cards-title">{t.proceduresTitle}</h2>
          <p className="procedures-cards-intro">{t.proceduresIntro}</p>
        </div>

        <div ref={stageRef} className="procedures-cards-stage">
          {procedureCategories.map((category, index) => {
            const side = index % 2 === 0 ? 'from-left' : 'from-right';
            return (
              <article
                key={category.id}
                className={`procedures-premium-card ${side}`}
                style={{ transitionDelay: `${0.08 + index * 0.09}s` }}
              >
                <span className="procedures-premium-card-index">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3>{t[category.titleKey]}</h3>
                <p>{t[category.descKey]}</p>
                <span className="procedures-premium-card-line" aria-hidden="true" />
              </article>
            );
          })}
        </div>

        <div className="procedures-cards-cta">
          <button
            type="button"
            className={`btn btn-gold btn-procedures-editorial btn-with-loader ${isLoading ? 'is-loading' : ''}`}
            onClick={() => navigateWithTransition('/procedures', t.viewAllProcedures)}
            disabled={transitioning}
            aria-busy={isLoading}
          >
            <span>{t.viewAllProcedures}</span>
            <span className="btn-inline-spinner" aria-hidden="true" />
            {!isLoading ? (
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            ) : null}
          </button>
        </div>
      </div>
    </section>
  );
}
