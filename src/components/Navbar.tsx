import React, { useState } from 'react';
import { Disc, Music, Users, Radio, Upload, Shield, LogOut, User as UserIcon, Menu, X } from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  user: any;
  onOpenAuth: () => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, setCurrentTab, user, onOpenAuth, onLogout }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navItems = [
    { id: 'releases', label: 'Releases', icon: Music },
    { id: 'artists', label: 'Artists', icon: Users },
    { id: 'soundlab', label: 'Sound Lab', icon: Radio },
    { id: 'submit', label: 'Demo Drop', icon: Upload },
  ];

  if (user?.role === 'admin') navItems.push({ id: 'admin', label: 'A&R Admin', icon: Shield });

  const renderLinks = (mobile = false) => navItems.map((item) => {
    const Icon = item.icon;
    return (
      <button
        key={item.id}
        onClick={() => {
          setCurrentTab(item.id);
          if (mobile) setMobileMenuOpen(false);
        }}
        className={`site-nav-link ${currentTab === item.id ? 'is-active' : ''}`}
      >
        {mobile && <Icon aria-hidden="true" />}
        {item.label}
      </button>
    );
  });

  return (
    <header className="site-header">
      <div className="site-nav home-container">
        <button onClick={() => setCurrentTab('home')} className="site-brand" aria-label="Cyntron Records home">
          <img src="/logo.png" alt="" />
          <span>CYNTRON<span className="site-brand-dot">.</span><small>RECORDS</small></span>
        </button>

        <nav className="site-nav-links" aria-label="Main navigation">{renderLinks()}</nav>

        <div className="site-nav-actions">
          {user ? (
            <div className="site-user">
              <span className="site-user-mark">{user.name?.[0]?.toUpperCase() || 'U'}</span>
              <span className="site-user-name">{user.name}<small>{user.role}</small></span>
              <button onClick={onLogout} title="Log out" aria-label="Log out" className="site-icon-button"><LogOut /></button>
            </div>
          ) : (
            <button onClick={onOpenAuth} className="site-login"><UserIcon aria-hidden="true" /> Artist portal</button>
          )}
          <button
            className="site-menu-button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="site-mobile-menu">
          <button className={`site-nav-link ${currentTab === 'home' ? 'is-active' : ''}`} onClick={() => { setCurrentTab('home'); setMobileMenuOpen(false); }}>
            <Disc aria-hidden="true" /> Home
          </button>
          {renderLinks(true)}
          {!user && <button onClick={() => { onOpenAuth(); setMobileMenuOpen(false); }} className="site-login"><UserIcon aria-hidden="true" /> Artist portal</button>}
        </div>
      )}
    </header>
  );
};