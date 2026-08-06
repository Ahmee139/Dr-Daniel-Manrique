'use client';

import { useState, useEffect, useRef, type MouseEvent } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { usePageTransition } from '@/context/PageTransitionContext';
import {
  getActiveHomeSection,
  scrollToHomeAbout,
  scrollToHomeHero,
  scrollToHomeSection,
  type HomeNavSection,
} from '@/utils/homeScroll';

export default function Navbar() {
  const { t } = useLanguage();
  const { navigateWithTransition, transitioning, sectionName } = usePageTransition();
  const [scrolled, setScrolled] = useState(false);
  const [overHero, setOverHero] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState({ about: false });
  const [homeSection, setHomeSection] = useState<HomeNavSection>('home');
  const pathname = usePathname();
  const router = useRouter();
  const scrolledRef = useRef(false);

  useEffect(() => {
    const update = () => {
      const y = window.scrollY;
      const onHome = pathname === '/';

      let nextOverHero = false;
      if (onHome) {
        const aboutPanel = document.querySelector('.pin-panel-about') as HTMLElement | null;
        if (aboutPanel) {
          nextOverHero = aboutPanel.getBoundingClientRect().top > 72;
        } else {
          const hero = document.querySelector('.hero-section') as HTMLElement | null;
          nextOverHero = hero
            ? hero.getBoundingClientRect().bottom > window.innerHeight * 0.55
            : y < window.innerHeight - 80;
        }
        setHomeSection(getActiveHomeSection());
      }

      setOverHero(nextOverHero);

      const nextScrolled = !nextOverHero && y > 12;
      if (nextScrolled !== scrolledRef.current) {
        scrolledRef.current = nextScrolled;
        setScrolled(nextScrolled);
      } else if (nextOverHero && scrolledRef.current) {
        scrolledRef.current = false;
        setScrolled(false);
      }
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const closeMobile = () => {
    setMobileMenuOpen(false);
    setMobileSubmenuOpen({ about: false });
  };

  const scrollToHash = (hash: string) => {
    const id = hash.replace('#', '');
    if (id === 'about') {
      scrollToHomeAbout();
      return;
    }
    if (id === 'hero' || id === 'home') {
      scrollToHomeHero();
      return;
    }
    if (id === 'why-us' || id === 'contact' || id === 'procedures') {
      scrollToHomeSection(id);
      return;
    }
    const el = document.getElementById(id);
    if (!el) return;
    const y = Math.max(0, Math.round(el.getBoundingClientRect().top + window.scrollY - 72));
    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  const handleWhyUsSection = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    e.stopPropagation();
    closeMobile();
    if (pathname === '/') {
      scrollToHomeSection('why-us');
      setHomeSection('why-us');
    } else {
      router.push('/#why-us');
    }
  };

  const handleHomeClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    e.stopPropagation();
    closeMobile();
    if (pathname === '/') {
      // Instant land on hero — no half-pin leftover
      scrollToHomeHero('auto');
      setHomeSection('home');
      return;
    }
    router.push('/');
  };

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    closeMobile();

    if (href === '/' || href === '') {
      handleHomeClick(e);
      return;
    }

    if (href.startsWith('#')) {
      if (pathname === '/') scrollToHash(href);
      else router.push(`/${href}`);
      return;
    }

    if (href.includes('#')) {
      const [path, hash] = href.split('#');
      const targetPath = path || '/';
      if (pathname === targetPath) scrollToHash(`#${hash}`);
      else router.push(href);
      return;
    }

    if (href === pathname) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    router.push(href);
  };

  const handleAboutSection = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    e.stopPropagation();
    closeMobile();
    if (pathname === '/') {
      scrollToHomeAbout('smooth');
      setHomeSection('about');
    } else {
      router.push('/#about');
    }
  };

  const handlePageNavigate = (
    e: MouseEvent<HTMLAnchorElement>,
    url: string,
    label: string
  ) => {
    e.preventDefault();
    closeMobile();
    if (pathname === url) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    navigateWithTransition(url, label);
  };

  const handleBookingNavigate = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    closeMobile();
    navigateWithTransition('/consultation', t.bookConsultation);
  };

  const isBookingLoading = transitioning && sectionName === t.bookConsultation;
  const isProceduresLoading = transitioning && sectionName === t.procedures;
  const onHome = pathname === '/';
  const isHomeActive = onHome ? homeSection === 'home' : false;
  const isAboutActive = pathname.startsWith('/about') || (onHome && homeSection === 'about');
  const isProceduresActive =
    pathname.startsWith('/procedures') || (onHome && homeSection === 'procedures');
  const isWhyUsActive = onHome && homeSection === 'why-us';
  const isContactActive =
    pathname.startsWith('/contact') || (onHome && homeSection === 'contact');
  const isConsultationActive = pathname.startsWith('/consultation');
  const headerClass = [
    'main-header',
    scrolled ? 'scrolled' : '',
    overHero ? 'over-hero' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <>
      <header className={headerClass}>
        <div className="container header-container">
          <Link href="/" onClick={handleHomeClick} className="logo">
            <img src="/assets/dm-logo.png" alt="Dr. Daniel Manrique, M.D." className="logo-mark" />
            <div className="logo-text">
              <span className="logo-name">Daniel Manrique, M.D.</span>
              <span className="logo-tagline">{t.tagline}</span>
            </div>
          </Link>

          <nav className="desktop-nav" aria-label="Primary">
            <ul className="nav-menu">
              <li className="nav-item">
                <Link href="/" onClick={handleHomeClick} className={`nav-link ${isHomeActive ? 'active' : ''}`}>
                  {t.home}
                </Link>
              </li>
              <li className="nav-item has-dropdown">
                <Link
                  href="/#about"
                  onClick={handleAboutSection}
                  className={`nav-link ${isAboutActive ? 'active' : ''}`}
                  aria-haspopup="true"
                >
                  {t.about}
                  <svg viewBox="0 0 24 24" width="10" height="10" stroke="currentColor" strokeWidth="2.5" fill="none" className="dropdown-chevron" aria-hidden="true">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link href="/about/profile" onClick={(e) => handlePageNavigate(e, '/about/profile', t.profile)}>
                      {t.profile}
                    </Link>
                  </li>
                  <li>
                    <Link href="/about/press" onClick={(e) => handlePageNavigate(e, '/about/press', t.press)}>
                      {t.press}
                    </Link>
                  </li>
                  <li>
                    <Link href="/about/awards" onClick={(e) => handlePageNavigate(e, '/about/awards', t.awards)}>
                      {t.awards}
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <Link
                  href="/procedures"
                  onClick={(e) => handlePageNavigate(e, '/procedures', t.procedures)}
                  className={`nav-link nav-link-loader ${isProceduresActive ? 'active' : ''} ${isProceduresLoading ? 'is-loading' : ''}`}
                  aria-busy={isProceduresLoading}
                >
                  <span>{t.procedures}</span>
                  <span className="nav-inline-spinner" aria-hidden="true" />
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  href="/#why-us"
                  onClick={handleWhyUsSection}
                  className={`nav-link ${isWhyUsActive ? 'active' : ''}`}
                >
                  {t.whyUs}
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  href="/contact"
                  onClick={(e) => handleNavClick(e, '/contact')}
                  className={`nav-link ${isContactActive ? 'active' : ''}`}
                >
                  {t.contact}
                </Link>
              </li>
            </ul>
          </nav>

          <div className="header-cta-wrapper">
            <Link
              href="/consultation"
              onClick={handleBookingNavigate}
              className={`btn btn-gold btn-header btn-with-loader ${isBookingLoading ? 'is-loading' : ''} ${isConsultationActive ? 'active-consult' : ''}`}
              aria-busy={isBookingLoading}
            >
              <span>{t.bookConsultation}</span>
              <span className="btn-inline-spinner" aria-hidden="true" />
            </Link>

            <button
              className={`mobile-toggle ${mobileMenuOpen ? 'open' : ''}`}
              onClick={() => {
                setMobileSubmenuOpen({ about: false });
                setMobileMenuOpen(true);
              }}
              aria-label="Open Navigation"
              aria-expanded={mobileMenuOpen}
              type="button"
            >
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </button>
          </div>
        </div>
      </header>

      <div
        className={`mobile-nav-overlay ${mobileMenuOpen ? 'open' : ''}`}
        onClick={closeMobile}
        aria-hidden={!mobileMenuOpen}
      >
        <div
          className="mobile-nav-container"
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <div className="mobile-nav-header">
            <Link href="/" onClick={handleHomeClick} className="logo">
              <img src="/assets/dm-logo.png" alt="Dr. Daniel Manrique, M.D." className="logo-mark" />
              <div className="logo-text">
                <span className="logo-name">Daniel Manrique, M.D.</span>
              </div>
            </Link>
            <button className="mobile-close" onClick={closeMobile} aria-label="Close Navigation" type="button">
              <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <nav className="mobile-nav-menu">
            <ul>
              <li>
                <Link href="/" onClick={handleHomeClick} className={`mobile-link ${isHomeActive ? 'active' : ''}`}>
                  {t.home}
                </Link>
              </li>
              <li className="mobile-has-submenu">
                <button
                  className={`mobile-submenu-btn ${mobileSubmenuOpen.about ? 'is-open' : ''} ${isAboutActive ? 'is-current' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setMobileSubmenuOpen((prev) => ({ about: !prev.about }));
                  }}
                  type="button"
                  aria-expanded={mobileSubmenuOpen.about}
                  aria-controls="mobile-about-submenu"
                >
                  {t.about}
                  <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2.5" fill="none" aria-hidden="true">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
                <ul
                  id="mobile-about-submenu"
                  className={`mobile-submenu ${mobileSubmenuOpen.about ? 'is-open' : ''}`}
                  hidden={!mobileSubmenuOpen.about}
                >
                  <li>
                    <Link href="/#about" onClick={handleAboutSection}>
                      {t.about}
                    </Link>
                  </li>
                  <li>
                    <Link href="/about/profile" onClick={(e) => handlePageNavigate(e, '/about/profile', t.profile)}>
                      {t.profile}
                    </Link>
                  </li>
                  <li>
                    <Link href="/about/press" onClick={(e) => handlePageNavigate(e, '/about/press', t.press)}>
                      {t.press}
                    </Link>
                  </li>
                  <li>
                    <Link href="/about/awards" onClick={(e) => handlePageNavigate(e, '/about/awards', t.awards)}>
                      {t.awards}
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link
                  href="/procedures"
                  onClick={(e) => handlePageNavigate(e, '/procedures', t.procedures)}
                  className={`mobile-link ${isProceduresActive ? 'active' : ''} ${isProceduresLoading ? 'is-loading' : ''}`}
                  aria-busy={isProceduresLoading}
                >
                  {t.procedures}
                </Link>
              </li>
              <li>
                <Link
                  href="/#why-us"
                  onClick={handleWhyUsSection}
                  className={`mobile-link ${isWhyUsActive ? 'active' : ''}`}
                >
                  {t.whyUs}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  onClick={(e) => handleNavClick(e, '/contact')}
                  className={`mobile-link ${isContactActive ? 'active' : ''}`}
                >
                  {t.contact}
                </Link>
              </li>
            </ul>
          </nav>

          <div className="mobile-nav-footer">
            <a href="tel:+14077779866" className="mobile-footer-item">
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <span>+1 (407) 777-9866</span>
            </a>
            <Link
              href="/consultation"
              onClick={handleBookingNavigate}
              className={`btn btn-gold btn-full-width btn-with-loader ${isBookingLoading ? 'is-loading' : ''}`}
              aria-busy={isBookingLoading}
            >
              <span>{t.bookConsultation}</span>
              <span className="btn-inline-spinner" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
