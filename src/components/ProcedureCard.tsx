'use client';

import Link from 'next/link';
import type { MouseEvent } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { usePageTransition } from '@/context/PageTransitionContext';
import type { TranslationKey } from '@/utils/translations';

type ProcedureCardProps = {
  id: string;
  index: number;
  titleKey: TranslationKey;
  descKey: TranslationKey;
  categoryTitleKey: TranslationKey;
  categoryId: string;
  href?: string;
};

function ProcedureIcon({ id }: { id: string }) {
  const common = {
    viewBox: '0 0 24 24',
    width: 22,
    height: 22,
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };

  switch (id) {
    case 'rhinoplasty':
      return (
        <svg {...common}>
          <path d="M12 3c2.5 2.2 4 5.2 4 8.5 0 3.2-1.3 5.8-4 8.5-2.7-2.7-4-5.3-4-8.5C8 8.2 9.5 5.2 12 3z" />
          <path d="M10 14h4" />
        </svg>
      );
    case 'blepharoplasty':
      return (
        <svg {...common}>
          <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12z" />
          <circle cx="12" cy="12" r="2.5" />
        </svg>
      );
    case 'chin':
      return (
        <svg {...common}>
          <path d="M8 4h8v6c0 3.3-1.8 6-4 8-2.2-2-4-4.7-4-8V4z" />
          <path d="M9 20h6" />
        </svg>
      );
    case 'bichectomy':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8" />
          <path d="M8.5 13.5c1.2 1.4 2.6 2 3.5 2s2.3-.6 3.5-2" />
        </svg>
      );
    case 'septoplasty':
      return (
        <svg {...common}>
          <path d="M12 3v18" />
          <path d="M7 7c2 1.5 3 3.5 3 5s-1 3.5-3 5" />
          <path d="M17 7c-2 1.5-3 3.5-3 5s1 3.5 3 5" />
        </svg>
      );
    case 'sinus':
      return (
        <svg {...common}>
          <path d="M4 14c2-4 4.5-6 8-6s6 2 8 6" />
          <path d="M8 10c1-.8 2.2-1.2 4-1.2s3 .4 4 1.2" />
          <path d="M9 18h6" />
        </svg>
      );
    case 'trauma':
      return (
        <svg {...common}>
          <path d="M12 3l8 4v6c0 4.5-3.2 7.8-8 9-4.8-1.2-8-4.5-8-9V7l8-4z" />
          <path d="M12 9v4" />
          <path d="M12 16h.01" />
        </svg>
      );
    case 'scar':
      return (
        <svg {...common}>
          <path d="M4 12c3-2 5-2 8 0s5 2 8 0" />
          <path d="M4 16c3-2 5-2 8 0s5 2 8 0" />
          <path d="M4 8c3-2 5-2 8 0s5 2 8 0" />
        </svg>
      );
    case 'laser':
      return (
        <svg {...common}>
          <path d="M12 2v6" />
          <path d="M12 16v6" />
          <path d="M4.9 4.9l4.2 4.2" />
          <path d="M14.9 14.9l4.2 4.2" />
          <path d="M2 12h6" />
          <path d="M16 12h6" />
          <path d="M4.9 19.1l4.2-4.2" />
          <path d="M14.9 9.1l4.2-4.2" />
        </svg>
      );
    case 'injectables':
      return (
        <svg {...common}>
          <path d="M14 3l7 7" />
          <path d="M13 5l6 6" />
          <path d="M11 7L4.5 13.5a3 3 0 004.2 4.2L15 11" />
          <path d="M5 19l-2 2" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8" />
          <path d="M12 8v8" />
          <path d="M8 12h8" />
        </svg>
      );
  }
}

export default function ProcedureCard({
  id,
  index,
  titleKey,
  descKey,
  categoryTitleKey,
  categoryId,
  href,
}: ProcedureCardProps) {
  const { t } = useLanguage();
  const { navigateWithTransition, transitioning, sectionName } = usePageTransition();
  const target = href ?? `/procedures#${categoryId}`;
  const goesToConsultation = target.startsWith('/consultation');
  const isLoading =
    goesToConsultation && transitioning && sectionName === t.bookConsultation;
  const side = index % 2 === 0 ? 'from-left' : 'from-right';

  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!goesToConsultation) return;
    e.preventDefault();
    navigateWithTransition('/consultation', t.bookConsultation);
  };

  return (
    <Link
      href={target}
      onClick={onClick}
      className={`procedure-card procedure-card-premium ${side} ${isLoading ? 'is-loading' : ''}`}
      style={{ transitionDelay: `${0.08 + Math.min(index, 6) * 0.1}s` }}
      aria-busy={isLoading}
    >
      <span className="procedure-card-rail" aria-hidden="true">
        <span className="procedure-card-rail-line" />
        <span className="procedure-card-rail-dot" />
        <span className="procedure-card-rail-dot" />
        <span className="procedure-card-rail-dot" />
        <span className="procedure-card-rail-dot" />
      </span>

      <div className="procedure-card-top">
        <span className="procedure-card-index">{String(index + 1).padStart(2, '0')}</span>
        <span className="procedure-card-icon" aria-hidden="true">
          <ProcedureIcon id={id} />
        </span>
      </div>
      <span className="procedure-card-tag">{t[categoryTitleKey]}</span>
      <h3>{t[titleKey]}</h3>
      <p>{t[descKey]}</p>
      <span className="procedure-card-cta">
        {t.bookConsultation}
        <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </span>
    </Link>
  );
}
