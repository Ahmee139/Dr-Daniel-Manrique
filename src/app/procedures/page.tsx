'use client';

import { useEffect, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { procedureCategories } from '@/data/procedures';
import PageHero from '@/components/PageHero';
import ProcedureCard from '@/components/ProcedureCard';

export default function ProceduresPage() {
  const { t } = useLanguage();
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = pageRef.current;
    if (!root) return undefined;

    const categories = Array.from(root.querySelectorAll('.procedure-category'));
    if (!categories.length) return undefined;

    if (!('IntersectionObserver' in window)) {
      categories.forEach((category) => category.classList.add('is-in'));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle('is-in', entry.isIntersecting);
        });
      },
      {
        threshold: 0.18,
        rootMargin: '0px 0px -8% 0px',
      }
    );

    categories.forEach((category) => observer.observe(category));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="subpage-wrapper" ref={pageRef}>
      <PageHero pre={t.proceduresPre} title={t.proceduresTitle} intro={t.proceduresIntro} />
      <section className="subpage-content-section procedures-page-premium">
        <div className="container procedures-page">
          {procedureCategories.map((category) => (
            <div key={category.id} id={category.id} className="procedure-category">
              <div className="procedure-category-header">
                <span className="procedure-category-eyebrow">{t.proceduresPre}</span>
                <h2>{t[category.titleKey]}</h2>
                <p>{t[category.descKey]}</p>
              </div>
              <div className="procedures-grid procedures-grid-premium">
                {category.items.map((item, index) => (
                  <ProcedureCard
                    key={item.id}
                    id={item.id}
                    index={index}
                    titleKey={item.titleKey}
                    descKey={item.descKey}
                    categoryTitleKey={category.titleKey}
                    categoryId={category.id}
                    href="/consultation"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
