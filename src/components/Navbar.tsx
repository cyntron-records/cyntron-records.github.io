import React, { useState } from 'react';
import { Disc, Music, Users, Radio, Upload, Shield, LogOut, User as UserIcon, Menu, X } from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  user: any;
  onOpenAuth: () => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  user,
  onOpenAuth,
  onLogout
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Disc },
    { id: 'releases', label: 'Releases', icon: Music },
    { id: 'artists', label: 'Artists', icon: Users },
    { id: 'soundlab', label: 'Sound Lab', icon: Radio },
    { id: 'submit', label: 'Demo Drop', icon: Upload },
  ];

  if (user?.role === 'admin') {
    navItems.push({ id: 'admin', label: 'A&R Admin', icon: Shield });
  }

  return (
    <header className="sticky top-0 z-50 bg-[#080305]/95 backdrop-blur-md border-b border-[#3b0711]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <div 
          onClick={() => setCurrentTab('home')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <img src="logo.png" alt="" className="w-10 h-10 rounded-xl border border-[#ff1f4b]/40" />
          <div>
            <span className="font-orbitron font-black text-xl tracking-wider text-white">
              CYNTRON<span className="text-[#ff1f4b]">.</span>
            </span>
            <span className="block text-[10px] font-orbitron tracking-widest text-[#ff3366]">RECORDS</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-[#ff1f4b]/15 to-[#99001a]/20 text-[#ff1f4b] border border-[#ff1f4b]/40 glow-red'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#ff1f4b]' : 'text-gray-400'}`} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* User Auth & Quick Actions */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3 bg-[#14080b] border border-white/10 px-4 py-2 rounded-xl">
              <div className="w-8 h-8 rounded-lg bg-[#ff1f4b]/20 border border-[#ff1f4b]/40 flex items-center justify-center text-[#ff1f4b] font-orbitron text-xs font-bold">
                {user.name?.[0]?.toUpperCase() || 'U'}
              </div>
              <div className="text-left">
                <p className="text-xs font-semibold text-white truncate max-w-[120px]">{user.name}</p>
                <p className="text-[10px] text-[#ff1f4b] uppercase tracking-wider font-orbitron">
                  {user.role}
                </p>
              </div>
              <button
                onClick={onLogout}
                title="Logout"
                className="ml-2 text-gray-400 hover:text-[#ff1f4b] transition-colors p-1"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#ff1f4b] to-[#99001a] text-white font-orbitron text-xs font-bold uppercase tracking-wider hover:opacity-90 glow-red transition-all"
            >
              <UserIcon className="w-4 h-4" />
              Artist Login / Portal
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-gray-300 hover:text-white p-2"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#080305] border-b border-[#3b0711] px-4 py-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium ${
                  isActive ? 'bg-[#ff1f4b]/15 text-[#ff1f4b] border border-[#ff1f4b]/40' : 'text-gray-300'
                }`}
              >
                <Icon className="w-5 h-5 text-[#ff1f4b]" />
                {item.label}
              </button>
            );
          })}
          <div className="pt-4 border-t border-white/10 flex flex-col gap-2">
            {user ? (
              <div className="flex items-center justify-between px-4 py-3 bg-[#14080b] rounded-xl">
                <div>
                  <p className="text-sm font-semibold text-white">{user.name}</p>
                  <p className="text-xs text-[#ff1f4b] uppercase">{user.role}</p>
                </div>
                <button onClick={onLogout} className="text-[#ff1f4b] p-2">
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  onOpenAuth();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#ff1f4b] to-[#99001a] text-white font-orbitron text-xs font-bold uppercase tracking-wider"
              >
                Artist Login / Portal
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
