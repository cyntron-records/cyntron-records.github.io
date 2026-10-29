import React from 'react';
import { ArrowRight, Upload, Radio } from 'lucide-react';
import { Artist, Release, LABEL, spotifyEmbed } from '../data';

interface HomeViewProps {
  setCurrentTab: (tab: string) => void;
  releases: Release[];
  artists: Artist[];
}

export const HomeView: React.FC<HomeViewProps> = ({
  setCurrentTab,
  releases,
  artists
}) => {
  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-24 border-b border-[#3b0711] bg-gradient-to-b from-[#0e0407] via-[#080305] to-[#080305]">
        {/* Crimson grid background effect */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#3b071120_1px,transparent_1px),linear-gradient(to_bottom,#3b071120_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <img src="logo.png" alt="Cyntron Records logo" className="w-20 h-20 rounded-2xl border border-[#ff1f4b]/30 mx-auto lg:mx-0" />
              
              <h1 className="font-orbitron font-black text-4xl sm:text-6xl tracking-tight text-white leading-none">
                CYNTRON <span className="text-[#ff1f4b] text-glow-red">RECORDS</span>
              </h1>
              
              <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto lg:mx-0 font-light leading-relaxed">
                {LABEL.about} Free to use, open to artists everywhere.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <button
                  onClick={() => setCurrentTab('submit')}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#ff1f4b] to-[#99001a] text-white font-orbitron text-xs font-bold uppercase tracking-wider hover:opacity-90 glow-red transition-all flex items-center justify-center gap-2"
                >
                  <Upload className="w-4 h-4" />
                  Submit Your Demo Drop
                </button>
                <button
                  onClick={() => setCurrentTab('releases')}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#14080b] border border-white/10 text-white font-orbitron text-xs font-bold uppercase tracking-wider hover:border-[#ff1f4b] transition-all flex items-center justify-center gap-2"
                >
                  Explore Catalog & Spotify
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-white/10 max-w-lg mx-auto lg:mx-0">
                {LABEL.stats.map(st => (
                  <div key={st.label}>
                    <p className="font-orbitron font-bold text-2xl text-[#ff1f4b]">{st.value}</p>
                    <p className="text-xs text-gray-400">{st.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Featured Spotify Player Embed */}
            <div className="lg:col-span-5">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#ff1f4b] to-[#99001a] rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition duration-1000" />
                <div className="relative bg-[#14080b] border border-white/10 rounded-2xl p-6 shadow-2xl overflow-hidden space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="bg-[#ff1f4b]/20 border border-[#ff1f4b]/40 text-[#ff1f4b] px-2.5 py-1 rounded-md text-[10px] font-orbitron uppercase">
                      Latest release
                    </span>
                    
                  </div>

                  <div className="rounded-xl overflow-hidden bg-black/50 border border-white/10">
                    <iframe
                      src={spotifyEmbed('album', releases[0].spotifyAlbumId)}
                      width="100%"
                      height="352"
                      frameBorder="0"
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      loading="lazy"
                      title="Spotify Featured Release"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Releases Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-orbitron font-bold text-2xl sm:text-3xl text-white">Latest releases</h2>
            <p className="text-sm text-gray-400 mt-1">New music from the roster</p>
          </div>
          <button
            onClick={() => setCurrentTab('releases')}
            className="text-xs font-orbitron text-[#ff1f4b] hover:underline flex items-center gap-1 uppercase tracking-wider"
          >
            All releases <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {releases.map((rel) => (
            <div
              key={rel.id}
              className="bg-[#0b0507] border border-white/10 rounded-2xl p-5 hover:border-[#ff1f4b]/50 transition-all group space-y-4"
            >
              <div>
                <span className="text-[10px] font-orbitron text-[#ff1f4b] uppercase tracking-wider">{rel.genre}</span>
                <h3 className="font-orbitron font-bold text-lg text-white mt-1 group-hover:text-[#ff1f4b] transition-colors">{rel.title}</h3>
                <p className="text-sm text-gray-400 mt-0.5">{rel.artist}</p>
              </div>

              {/* Spotify Player Embed */}
              <div className="pt-2">
                <iframe
                  src={spotifyEmbed('album', rel.spotifyAlbumId)}
                  width="100%"
                  height="352"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  title={`Spotify Player ${rel.title}`}
                  className="rounded-xl border border-white/5"
                />
              </div>

              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs text-gray-500 font-mono">
                <span>{rel.releaseDate ?? ''}</span>
                
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Artists */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-orbitron font-bold text-2xl sm:text-3xl text-white">Artists</h2>
            <p className="text-sm text-gray-400 mt-1">Producers and DJs on the label</p>
          </div>
          <button
            onClick={() => setCurrentTab('artists')}
            className="text-xs font-orbitron text-[#ff1f4b] hover:underline flex items-center gap-1 uppercase tracking-wider"
          >
            All artists <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {artists.slice(0, 6).map((art) => (
            <a key={art.id} href={`#/artists/${art.id}`} className="bg-[#0b0507] border border-white/10 rounded-2xl p-6 hover:border-[#ff1f4b]/50 transition-colors space-y-2 block">
              <h3 className="font-orbitron font-bold text-lg text-white">{art.name}</h3>
              <p className="text-xs text-[#ff1f4b] font-orbitron">{art.genre}{art.origin ? `, ${art.origin}` : ''}</p>
              <p className="text-xs text-gray-400 line-clamp-2">{art.bio}</p>
            </a>
          ))}
        </div>
      </section>

      {/* Demo Drop Banner Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#3b0711] via-[#0b0507] to-[#3b0711] border border-[#ff1f4b]/40 p-8 sm:p-12 glow-red">
          <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
            <Radio className="w-64 h-64 text-[#ff1f4b]" />
          </div>
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="text-xs font-orbitron text-[#ff1f4b] uppercase tracking-widest">A&R Open Submissions</span>
            <h2 className="font-orbitron font-black text-3xl sm:text-4xl text-white">Want to release with us?</h2>
            <p className="text-sm text-gray-300">
              Our A&R team actively reviews independent submissions every week. Submit your MP3/WAV files, genre tags, and press kit for immediate evaluation.
            </p>
            <button
              onClick={() => setCurrentTab('submit')}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#ff1f4b] to-[#99001a] text-white font-orbitron text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-all flex items-center gap-2 glow-red"
            >
              <Upload className="w-4 h-4" />
              Drop Your Demo Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
