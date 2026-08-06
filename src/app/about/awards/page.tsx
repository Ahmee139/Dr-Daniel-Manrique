'use client';

import { useLanguage } from '@/context/LanguageContext';
import PageHero from '@/components/PageHero';

type AwardIcon = 'star' | 'shield' | 'plus';

export default function AwardsPage() {
  const { t } = useLanguage();

  const items: { title: string; desc: string; icon: AwardIcon; index: string }[] = [
    { title: t.award1Title, desc: t.award1Desc, icon: 'star', index: '01' },
    { title: t.award2Title, desc: t.award2Desc, icon: 'shield', index: '02' },
    { title: t.award3Title, desc: t.award3Desc, icon: 'plus', index: '03' },
  ];

  return (
    <div className="subpage-wrapper">
      <PageHero
        pre={t.aboutPre}
        title={t.awardsTitle}
        intro="Recognition for clinical excellence, surgical training, and commitment to patient care."
      />
      <section className="subpage-content-section awards-section-premium">
        <div className="container">
          <div className="awards-grid-new awards-grid-premium">
            {items.map((item) => (
              <article key={item.title} className="award-card-new award-card-premium">
                <div className="award-card-top">
                  <span className="award-index">{item.index}</span>
                  <div className="award-icon-box">
                    {item.icon === 'star' ? (
                      <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                      </svg>
                    ) : null}
                    {item.icon === 'shield' ? (
                      <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                      </svg>
                    ) : null}
                    {item.icon === 'plus' ? (
                      <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M8 12h8"></path>
                        <path d="M12 8v8"></path>
                      </svg>
                    ) : null}
                  </div>
                </div>
                <div className="award-card-text">
                  <h5>{item.title}</h5>
                  <p>{item.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
