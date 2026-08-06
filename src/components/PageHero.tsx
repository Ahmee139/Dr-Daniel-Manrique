'use client';

type PageHeroProps = {
  pre?: string;
  title: string;
  intro?: string;
};

export default function PageHero({ pre, title, intro }: PageHeroProps) {
  return (
    <section className="subpage-hero">
      <div className="subpage-hero-glow" aria-hidden="true" />
      <div className="container subpage-hero-inner">
        {pre ? <span className="subpage-pre">{pre}</span> : null}
        <h1 className="subpage-title">{title}</h1>
        {intro ? <p className="subpage-intro">{intro}</p> : null}
        <div className="subpage-hero-divider"></div>
      </div>
    </section>
  );
}
