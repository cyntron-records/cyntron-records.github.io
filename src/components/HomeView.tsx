import React, { useEffect, useRef, useState } from 'react';
import { ArrowDownRight, ArrowRight, ArrowUpRight, Upload } from 'lucide-react';
import { Artist, Release, LABEL, spotifyEmbed } from '../data';

interface HomeViewProps {
  setCurrentTab: (tab: string) => void;
  releases: Release[];
  artists: Artist[];
}

const handleTilt = (event: React.PointerEvent<HTMLElement>) => {
  if (event.pointerType === 'touch' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const bounds = event.currentTarget.getBoundingClientRect();
  const pointerX = (event.clientX - bounds.left) / bounds.width;
  const pointerY = (event.clientY - bounds.top) / bounds.height;
  const intensity = event.currentTarget.classList.contains('home-feature-art') ? 8 : 3;

  event.currentTarget.style.setProperty('--tilt-x', `${(0.5 - pointerY) * intensity}deg`);
  event.currentTarget.style.setProperty('--tilt-y', `${(pointerX - 0.5) * intensity}deg`);
  event.currentTarget.style.setProperty('--pointer-x', `${pointerX * 100}%`);
  event.currentTarget.style.setProperty('--pointer-y', `${pointerY * 100}%`);
};

const resetTilt = (event: React.PointerEvent<HTMLElement>) => {
  event.currentTarget.style.setProperty('--tilt-x', '0deg');
  event.currentTarget.style.setProperty('--tilt-y', '0deg');
};

export const HomeView: React.FC<HomeViewProps> = ({ setCurrentTab, releases, artists }) => {
  const homeRef = useRef<HTMLDivElement>(null);
  const [pixelTiles] = useState(() => Array.from({ length: 448 }, (_, index) => {
    const row = Math.floor(index / 56);
    return {
      active: Math.random() > 0.3,
      opacity: (0.32 + Math.random() * 0.48).toFixed(2),
      delay: ((7 - row) * 0.06 + Math.random() * 0.85).toFixed(2),
      tone: `${Math.min(100, Math.max(0, Math.round((row / 7) * 100 + (Math.random() - 0.5) * 34)))}%`,
    };
  }));

  useEffect(() => {
    const page = homeRef.current;
    if (!page || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const targets = page.querySelectorAll<HTMLElement>('[data-reveal]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

    page.classList.add('motion-ready');
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  return (
  <div className="home-page" ref={homeRef}>
    <section className="home-hero">
      <div className="home-container home-hero-grid">
        <div className="home-copy" data-reveal="left">
          <p className="home-eyebrow"><span /> Independent label · Open worldwide</p>
          <h1 className="home-title">Cyntron<br /><span>Records</span></h1>
          <p className="home-lede">Independent sound. A wider stage.</p>
          <p className="home-description">{LABEL.about} Free to use, open to artists everywhere.</p>
          <div className="home-actions">
            <button onClick={() => setCurrentTab('submit')} className="home-button home-button--red">
              <Upload aria-hidden="true" /> Submit a demo
            </button>
            <button onClick={() => setCurrentTab('releases')} className="home-button home-button--text">
              Explore releases <ArrowRight aria-hidden="true" />
            </button>
          </div>
          <a className="home-scroll" href="#latest-releases"><ArrowDownRight aria-hidden="true" /> Scroll to explore</a>
        </div>

        <div className="home-feature-art" data-reveal="right" onPointerMove={handleTilt} onPointerLeave={resetTilt}>
          <div className="home-feature-art__backdrop" />
          <img src="/artists/d4ntrix.png" alt="D4NTRIX artist artwork" />
          <div className="home-art-index">CYNTRON<br />ROSTER / 01</div>
          <div className="home-art-caption">
            <span>On the roster</span>
            <strong>D4NTRIX</strong>
            <span>Brazilian phonk · Brazil</span>
          </div>
          <span className="home-art-mark" aria-hidden="true">CR—01</span>
        </div>
      </div>

      <div className="home-container home-stats" aria-label="Label highlights">
        {LABEL.stats.map((stat, index) => (
          <div className="home-stat" data-reveal key={stat.label}>
            <span className="home-stat-index">0{index + 1}</span>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
        <div className="home-stat home-stat--note" data-reveal>
          <span className="home-stat-index">04</span>
          <strong>Worldwide</strong>
          <span>Independent by nature</span>
        </div>
      </div>
    </section>

    <section className="home-section home-releases" id="latest-releases">
      <div className="home-container">
        <div className="home-section-heading" data-reveal>
          <div>
            <p className="home-eyebrow"><span /> The catalog</p>
            <h2>Out in the world<span>.</span></h2>
          </div>
          <button onClick={() => setCurrentTab('releases')} className="home-inline-link">
            All releases <ArrowUpRight aria-hidden="true" />
          </button>
        </div>

        <div className="home-release-grid">
          {releases.map((release, index) => (
            <article className="home-release" data-reveal key={release.id} onPointerMove={handleTilt} onPointerLeave={resetTilt}>
              <div className="home-release-meta">
                <span>0{index + 1} / Release</span>
                <span>{release.genre}</span>
              </div>
              <h3>{release.title}</h3>
              <p>{release.artist}{release.releaseDate ? ` · ${new Date(`${release.releaseDate}T00:00`).getFullYear()}` : ''}</p>
              <iframe
                src={spotifyEmbed('album', release.spotifyAlbumId)}
                width="100%"
                height="352"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                title={`Spotify player for ${release.title}`}
              />
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className="home-section home-roster">
      <div className="home-container">
        <div className="home-section-heading" data-reveal>
          <div>
            <p className="home-eyebrow"><span /> The people behind the sound</p>
            <h2>Meet the roster<span>.</span></h2>
          </div>
          <button onClick={() => setCurrentTab('artists')} className="home-inline-link">
            All artists <ArrowUpRight aria-hidden="true" />
          </button>
        </div>

        <div className="home-artist-list">
          {artists.slice(0, 6).map((artist, index) => (
            <a className="home-artist" data-reveal href={`#/artists/${artist.id}`} key={artist.id}>
              <span className="home-artist-index">0{index + 1}</span>
              {artist.image ? (
                <img src={`/${artist.image}`} alt="" />
              ) : (
                <span className="home-artist-initials" aria-hidden="true">{artist.name.replace(/^DJ /i, '').slice(0, 2)}</span>
              )}
              <span className="home-artist-name">{artist.name}</span>
              <span className="home-artist-genre">{artist.genre}{artist.origin ? ` · ${artist.origin}` : ''}</span>
              <ArrowUpRight className="home-artist-arrow" aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </section>

    <section className="home-submit">
      <div className="home-container home-submit-content" data-reveal>
        <div>
          <p className="home-eyebrow"><span /> A&R submissions</p>
          <h2>Make something<br />we should hear.</h2>
        </div>
        <div className="home-submit-aside">
          <p>Send your unreleased track to our A&R team. We’re open to new sounds and artists from anywhere.</p>
          <button onClick={() => setCurrentTab('submit')} className="home-button home-button--white">
            Submit your demo <ArrowRight aria-hidden="true" />
          </button>
        </div>
      </div>
      <span className="home-submit-number" aria-hidden="true">CR</span>
    </section>
    <div className="pixel-fade" aria-hidden="true">
      <div className="pixel-fade__grid">
        {pixelTiles.map((tile, index) => (
          <span
            className={tile.active ? 'pixel-fade__tile is-active' : 'pixel-fade__tile'}
            key={index}
            style={{ '--pixel-opacity': tile.opacity, '--pixel-delay': `${tile.delay}s`, '--pixel-tone': tile.tone } as React.CSSProperties}
          />
        ))}
      </div>
    </div>
  </div>
  );
};