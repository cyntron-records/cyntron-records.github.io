import React from 'react';
import { ArrowUpRight, Disc } from 'lucide-react';
import { LABEL } from '../data';

export const Footer: React.FC<{ setCurrentTab: (tab: string) => void }> = ({ setCurrentTab }) => (
  <footer className="site-footer site-footer--dark">
    <div className="home-container site-footer-main">
      <div className="site-footer-brand">
        <div className="site-footer-wordmark"><Disc aria-hidden="true" /><span>CYNTRON<span>.</span></span></div>
        <p>Independent sound, a wider stage. A free-to-use record label open to artists worldwide.</p>
      </div>
      <div>
        <h2>Explore</h2>
        <button onClick={() => setCurrentTab('releases')}>Releases</button>
        <button onClick={() => setCurrentTab('artists')}>Artists</button>
        <button onClick={() => setCurrentTab('soundlab')}>Sound Lab</button>
      </div>
      <div>
        <h2>Get involved</h2>
        <button onClick={() => setCurrentTab('submit')}>Submit a demo</button>
        <a href={LABEL.discordInvite} target="_blank" rel="noopener noreferrer">Discord <ArrowUpRight aria-hidden="true" /></a>
        <a href={LABEL.youtube} target="_blank" rel="noopener noreferrer">YouTube <ArrowUpRight aria-hidden="true" /></a>
      </div>
    </div>
    <div className="home-container site-footer-bottom">
      <span>© {new Date().getFullYear()} Cyntron Records</span>
      <span>Made for independent artists</span>
    </div>
  </footer>
);