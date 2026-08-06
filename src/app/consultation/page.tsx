'use client';

import { useLanguage } from '@/context/LanguageContext';
import { siteInfo } from '@/data/site';
import ContactForm from '@/components/ContactForm';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function ConsultationPage() {
  const { t } = useLanguage();
  useScrollReveal([]);

  return (
    <div className="subpage-wrapper consultation-page">
      <section className="consultation-hero consultation-hero-compact">
        <div className="consultation-hero-glow" aria-hidden="true" />
        <div className="container consultation-hero-inner">
          <span className="subpage-pre">{t.consultationPre}</span>
          <h1 className="consultation-hero-title">{t.consultationTitle}</h1>
          <p className="consultation-hero-intro">{t.consultationIntro}</p>
        </div>
      </section>

      <section className="consultation-body consultation-body-solo">
        <div className="container consultation-form-wrap scroll-reveal">
          <div className="consultation-form-panel consultation-form-panel-premium">
            <div className="consultation-form-header">
              <span className="consultation-form-eyebrow">{t.consultationFormTitle}</span>
              <h2>{t.bookConsultation}</h2>
              <p className="consultation-form-meta">
                {siteInfo.location} · {t.contactHours}
              </p>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
