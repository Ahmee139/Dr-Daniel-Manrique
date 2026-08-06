'use client';

import { useEffect, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { advantages } from '@/data/site';

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export default function AdvantagesSection() {
  const { t } = useLanguage();
  const timelineRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const timeline = timelineRef.current;
    const fill = fillRef.current;
    if (!timeline || !fill) return undefined;

    let ticking = false;

    const update = () => {
      ticking = false;
      const view = window.innerHeight || 1;
      const timelineRect = timeline.getBoundingClientRect();
      const timelineHeight = timelineRect.height || 1;

      const start = view * 0.68;
      const end = view * 0.28;
      const raw = (start - timelineRect.top) / (timelineHeight + (start - end));
      const progress = clamp(raw, 0, 1);
      const fillY = progress * timelineHeight;

      fill.style.transform = `scaleY(${progress})`;

      stepRefs.current.forEach((step) => {
        if (!step) return;
        const node = step.querySelector('.advantage-node') as HTMLElement | null;
        const rect = step.getBoundingClientRect();

        // Activate node when the filled line reaches its center
        let reached = false;
        if (node) {
          const nodeCenter =
            node.getBoundingClientRect().top - timelineRect.top + node.offsetHeight / 2;
          reached = fillY >= nodeCenter - 2;
        }

        // Fade in near viewport center; fade out when leaving
        const inView = rect.top < view * 0.78 && rect.bottom > view * 0.18;

        step.classList.toggle('is-active', reached);
        step.classList.toggle('is-in', inView);
      });
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
    <section className="advantages-section advantages-premium">
      <div className="container">
        <div className="section-header advantages-header">
          <span className="section-pre">{t.advPre}</span>
          <h2 className="section-title">{t.advTitle}</h2>
        </div>

        <div ref={timelineRef} className="advantages-timeline">
          <div className="advantages-spine" aria-hidden="true">
            <span className="advantages-spine-track" />
            <span className="advantages-spine-fill" ref={fillRef} />
          </div>

          {advantages.map((item, index) => {
            const side = index % 2 === 0 ? 'is-left' : 'is-right';
            return (
              <div
                key={item.id}
                className={`advantage-step ${side}`}
                ref={(el) => {
                  stepRefs.current[index] = el;
                }}
              >
                <span className="advantage-node" aria-hidden="true" />
                <article className="advantage-card advantage-card-premium">
                  <span className="advantage-index">{String(index + 1).padStart(2, '0')}</span>
                  <h3>{t[item.key]}</h3>
                  <p>{t[item.descKey]}</p>
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
