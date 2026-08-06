'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { usePageTransition } from '@/context/PageTransitionContext';
import { siteInfo } from '@/data/site';
import type { MouseEvent } from 'react';

export default function Footer() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const router = useRouter();
  const { navigateWithTransition } = usePageTransition();

  const goAbout = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (pathname === '/') {
      document.getElementById('about')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      router.push('/#about');
    }
  };

  return (
    <footer className="footer-section footer-premium">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <img src="/assets/dm-logo.png" alt="Dr. Daniel Manrique, M.D." className="logo-mark" />
            <h4 className="footer-brand-title">{siteInfo.name}</h4>
            <p className="footer-brand-text">{t.tagline}</p>
          </div>

          <div className="footer-links">
            <h5 className="footer-column-title">{t.footerQuick}</h5>
            <ul>
              <li>
                <Link href="/#about" onClick={goAbout}>
                  {t.about}
                </Link>
              </li>
              <li>
                <Link
                  href="/procedures"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateWithTransition('/procedures', t.procedures);
                  }}
                >
                  {t.procedures}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateWithTransition('/contact', t.contact);
                  }}
                >
                  {t.contact}
                </Link>
              </li>
              <li>
                <Link
                  href="/consultation"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateWithTransition('/consultation', t.bookConsultation);
                  }}
                >
                  {t.bookConsultation}
                </Link>
              </li>
            </ul>
          </div>

          <div className="footer-contact">
            <h5 className="footer-column-title">{t.footerContact}</h5>
            <p>{siteInfo.location}</p>
            <p>
              <a href={`tel:${siteInfo.phones[0].replace(/[^\d+]/g, '')}`}>{siteInfo.phones[0]}</a>
            </p>
            <p>
              <a href={`mailto:${siteInfo.email}`}>{siteInfo.email}</a>
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">
            &copy; {new Date().getFullYear()} {siteInfo.name}. {t.footerRights}
          </p>
          <p className="footer-credit">Designed By Alliance Tech Ltd.</p>
        </div>
      </div>
    </footer>
  );
}
