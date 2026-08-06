'use client';

import { useLanguage } from '@/context/LanguageContext';
import PageHero from '@/components/PageHero';

export default function ProfilePage() {
  const { t } = useLanguage();

  return (
    <div className="subpage-wrapper">
      <PageHero pre={t.aboutPre} title={t.bioTitle} intro={t.aboutIntro} />
      <section className="subpage-content-section profile-section-premium">
        <div className="container subpage-grid profile-grid-premium">
          <div className="subpage-bio-card profile-portrait-card">
            <div className="subpage-img-deco-wrapper">
              <div className="about-deco-frame about-deco-frame-1"></div>
              <div className="about-deco-frame about-deco-frame-2"></div>
              <div className="about-img-container">
                <img
                  src="/assets/dr-manrique.png"
                  alt="Dr. Daniel Manrique"
                  className="about-profile-img"
                />
              </div>
            </div>
            <div className="profile-portrait-meta">
              <span className="profile-meta-label">Orlando, Florida</span>
              <span className="profile-meta-divider" aria-hidden="true" />
              <span className="profile-meta-label">Facial Plastic Surgery</span>
            </div>
          </div>

          <div className="subpage-text-card profile-copy-premium">
            <p className="profile-kicker">Physician Profile</p>
            <h2 className="profile-doc-name">{t.aboutTitle}</h2>
            <h3 className="profile-doc-sub">{t.aboutSubtitle}</h3>
            <p className="profile-doc-para">{t.aboutBio1}</p>
            <p className="profile-doc-para">{t.aboutBio2}</p>

            <div className="subpage-credentials-box profile-credentials-premium">
              <h4 className="profile-cred-heading">Training & Credentials</h4>
              <div className="cred-item">
                <span className="cred-index">01</span>
                <div>
                  <strong>Postgraduate Residency Training</strong>
                  <p>Specialized residency in Otorhinolaryngology — Head &amp; Neck Surgery.</p>
                </div>
              </div>
              <div className="cred-item">
                <span className="cred-index">02</span>
                <div>
                  <strong>Fellowship Subspecialty</strong>
                  <p>
                    Advanced fellowship in Facial, Head &amp; Neck Plastic, Reconstructive, and
                    Cosmetic Surgery.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
