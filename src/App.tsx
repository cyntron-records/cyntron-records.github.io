import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { HomeView } from './components/HomeView';
import { ReleasesView } from './components/ReleasesView';
import { ArtistsView } from './components/ArtistsView';
import { SoundLabView } from './components/SoundLabView';
import { DemoDropView } from './components/DemoDropView';
import { AdminDashboard } from './components/AdminDashboard';
import { api } from './api';
import { ARTISTS, RELEASES } from './data';

// Hash routing keeps every page linkable on GitHub Pages: #/artists, #/artists/d4ntrix, ...
const parseHash = () => {
  const [tab = 'home', sub = ''] = window.location.hash.replace(/^#\/?/, '').split('/');
  return { tab: tab || 'home', sub };
};

export default function App() {
  const [route, setRoute] = useState(parseHash);
  const [user, setUser] = useState<any>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    const onHash = () => {
      setRoute(parseHash());
      window.scrollTo({ top: 0 });
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  useEffect(() => {
    if (!localStorage.getItem('cyntron_token')) return;
    api('/api/auth/me')
      .then(({ user }) => setUser(user))
      .catch(() => {
        localStorage.removeItem('cyntron_token');
        localStorage.removeItem('cyntron_user');
      });
  }, []);

  const setCurrentTab = (tab: string) => {
    window.location.hash = tab === 'home' ? '#/' : `#/${tab}`;
  };

  const handleLoginSuccess = (userData: any, token: string) => {
    setUser(userData);
    localStorage.setItem('cyntron_user', JSON.stringify(userData));
    localStorage.setItem('cyntron_token', token);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('cyntron_user');
    localStorage.removeItem('cyntron_token');
    setCurrentTab('home');
  };

  const { tab, sub } = route;

  return (
    <div className="min-h-screen flex flex-col bg-[#080305] text-white">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-white focus:text-black focus:px-3 focus:py-2 focus:rounded">
        Skip to content
      </a>
      <Navbar
        currentTab={tab}
        setCurrentTab={setCurrentTab}
        user={user}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
      />

      <main id="main" className="flex-grow pb-16">
        {tab === 'home' && <HomeView setCurrentTab={setCurrentTab} releases={RELEASES} artists={ARTISTS} />}
        {tab === 'releases' && <ReleasesView releases={RELEASES} />}
        {tab === 'artists' && <ArtistsView artists={ARTISTS} selectedId={sub} />}
        {tab === 'soundlab' && <SoundLabView />}
        {tab === 'submit' && <DemoDropView user={user} onOpenAuth={() => setIsAuthModalOpen(true)} />}
        {tab === 'admin' && user?.role === 'admin' && <AdminDashboard />}
      </main>

      <Footer setCurrentTab={setCurrentTab} />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}
