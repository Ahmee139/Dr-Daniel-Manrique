'use client';

import { useLanguage } from '@/context/LanguageContext';
import PageHero from '@/components/PageHero';

export default function PressPage() {
  const { t } = useLanguage();

  const items = [
    { title: t.press1Title, desc: t.press1Desc, tag: 'Journal Paper', index: '01' },
    { title: t.press2Title, desc: t.press2Desc, tag: 'Education', index: '02' },
    { title: t.press3Title, desc: t.press3Desc, tag: 'Profile Feature', index: '03' },
  ];

  return (
    <div className="subpage-wrapper">
      <PageHero
        pre={t.aboutPre}
        title={t.pressTitle}
        intro="Selected features, academic contributions, and professional mentions."
      />
      <section className="subpage-content-section press-section-premium">
        <div className="container">
          <div className="press-grid press-grid-premium">
            {items.map((item) => (
              <article key={item.title} className="press-card press-card-premium">
                <div className="press-card-header">
                  <span className="press-index">{item.index}</span>
                  <span className="press-tag">{item.tag}</span>
                </div>
                <h5>{item.title}</h5>
                <p>{item.desc}</p>
                <div className="press-card-footer">
                  <span>Read feature</span>
                  <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
