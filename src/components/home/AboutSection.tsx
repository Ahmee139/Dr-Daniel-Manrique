'use client';

import { useEffect, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { usePageTransition } from '@/context/PageTransitionContext';

function getTopMostPinPanel(): Element | null {
  const panels = Array.from(document.querySelectorAll('.pin-panel'));
  if (!panels.length) return null;

  // Reveal as soon as the panel covers ~half the viewport (not only when fully stuck)
  const covering = panels.filter((panel) => {
    const rect = panel.getBoundingClientRect();
    return rect.top <= window.innerHeight * 0.45 && rect.bottom > window.innerHeight * 0.35;
  });

  if (!covering.length) return null;

  return covering.sort((a, b) => {
    const zA = Number(getComputedStyle(a).zIndex) || 0;
    const zB = Number(getComputedStyle(b).zIndex) || 0;
    return zB - zA;
  })[0];
}

export default function AboutSection() {
  const { t } = useLanguage();
  const { navigateWithTransition, transitioning, sectionName } = usePageTransition();
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const wasActiveRef = useRef(false);

  useEffect(() => {
    const image = imageRef.current;
    const text = textRef.current;
    if (!image || !text) return undefined;

    const playIn = () => {
      [image, text].forEach((el) => {
        el.classList.add('is-in');
      });
    };

    const playOut = () => {
      [image, text].forEach((el) => {
        el.classList.remove('is-in');
      });
    };

    let ticking = false;

    const update = () => {
      ticking = false;
      const topPanel = getTopMostPinPanel();
      const active = Boolean(topPanel?.classList.contains('pin-panel-about'));

      if (active && !wasActiveRef.current) {
        playIn();
      } else if (!active && wasActiveRef.current) {
        playOut();
      }

      wasActiveRef.current = active;
    };

    const onScrollOrResize = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize, { passive: true });
    // Wait a frame so sticky layout settles after refresh loader
    const boot = window.setTimeout(update, 40);

    return () => {
      window.clearTimeout(boot);
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
    };
  }, []);

  const links = [
    { url: '/about/profile', label: t.profileTab },
    { url: '/about/press', label: t.pressTab },
    { url: '/about/awards', label: t.awardsTab },
  ];

  return (
    <section id="about" className="about-section about-fade-over">
      <div className="about-fade-body">
        <div className="container">
          <div className="about-grid">
            <div ref={imageRef} className="about-image-column reveal-from-left">
              <div className="about-image-wrapper">
                <div className="about-deco-frame about-deco-frame-1"></div>
                <div className="about-deco-frame about-deco-frame-2"></div>
                <div className="about-img-container">
                  <img
                    src="/assets/dr-manrique.png"
                    alt="Dr. Daniel Manrique, M.D. - Specialist Facial Surgeon"
                    className="about-profile-img"
                  />
                  <div className="about-img-tag">{t.bulletENT}</div>
                </div>
              </div>
            </div>
            <div ref={textRef} className="about-text-column reveal-from-right">
              <span className="about-pre">{t.aboutPre}</span>
              <h2 className="about-title">{t.aboutTitle}</h2>
              <h3 className="about-subtitle">{t.aboutSubtitle}</h3>
              <p className="about-bio-intro">{t.aboutIntro}</p>
              <div className="about-cta-row">
                {links.map((link) => {
                  const isLoading = transitioning && sectionName === link.label;
                  return (
                    <button
                      key={link.url}
                      type="button"
                      className={`btn btn-about-premium ${isLoading ? 'is-loading' : ''}`}
                      onClick={() => navigateWithTransition(link.url, link.label)}
                      disabled={transitioning}
                      aria-busy={isLoading}
                    >
                      <span className="btn-about-label">{link.label}</span>
                      <span className="btn-about-meta" aria-hidden="true">
                        <svg
                          className="btn-about-arrow"
                          viewBox="0 0 24 24"
                          width="14"
                          height="14"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                        <span className="btn-about-spinner" />
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
