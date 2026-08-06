'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { stats } from '@/data/site';

function parseStatValue(raw: string) {
  const suffix = raw.replace(/[\d,]/g, '');
  const numeric = Number(raw.replace(/[^\d]/g, '')) || 0;
  return { numeric, suffix };
}

function formatCount(value: number, suffix: string) {
  return `${value.toLocaleString('en-US')}${suffix}`;
}

type Direction = 'from-right' | 'from-left' | 'from-center';

const directions: Direction[] = ['from-right', 'from-left', 'from-center'];

export default function StatsSection() {
  const { t } = useLanguage();
  const sceneRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);
  const [stage, setStage] = useState(0);
  const [counts, setCounts] = useState<number[]>(() => stats.map(() => 0));
  const startedRef = useRef(false);

  const parsed = useMemo(
    () => stats.map((item) => parseStatValue(item.value)),
    []
  );

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting && entry.intersectionRatio > 0.2;
        setActive(inView);
        if (!inView) {
          startedRef.current = false;
          setStage(0);
          setCounts(stats.map(() => 0));
        }
      },
      { threshold: [0.2, 0.35, 0.5], rootMargin: '0px 0px -10% 0px' }
    );

    observer.observe(scene);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!active || startedRef.current) return undefined;
    startedRef.current = true;

    const timers: number[] = [];
    // Stage 1: first number from right
    timers.push(window.setTimeout(() => setStage(1), 120));
    // Stage 2: second from left
    timers.push(window.setTimeout(() => setStage(2), 900));
    // Stage 3: third from center
    timers.push(window.setTimeout(() => setStage(3), 1700));

    return () => timers.forEach(clearTimeout);
  }, [active]);

  useEffect(() => {
    if (stage < 1) return undefined;

    const index = stage - 1;
    if (index < 0 || index >= parsed.length) return undefined;

    const target = parsed[index].numeric;
    const duration = 1400;
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      const next = Math.round(target * eased);
      setCounts((prev) => {
        const copy = [...prev];
        copy[index] = next;
        return copy;
      });
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [stage, parsed]);

  return (
    <section ref={sceneRef} className={`stats-section stats-showcase ${active ? 'is-active' : ''}`}>
      <div className="stats-pin-scene">
        <div className="stats-pin-sticky">
          <div className="container stats-showcase-inner">
            <div className="stats-showcase-header">
              <span className="section-pre">{t.statsPre}</span>
              <h2 className="section-title">{t.statsTitle}</h2>
            </div>

            <div className="stats-showcase-stage" aria-live="polite">
              {stats.map((item, index) => {
                const visible = stage > index;
                const direction = directions[index] ?? 'from-center';
                const { suffix } = parsed[index];

                return (
                  <div
                    key={item.id}
                    className={`stats-orbit-item ${direction} ${visible ? 'is-visible' : ''}`}
                    style={{ transitionDelay: `${index * 40}ms` }}
                  >
                    <strong className="stat-value">
                      {formatCount(counts[index] ?? 0, suffix)}
                    </strong>
                    <span className="stat-label">{t[item.key]}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
