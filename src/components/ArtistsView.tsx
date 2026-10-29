import React from 'react';
import { ExternalLink, ArrowLeft } from 'lucide-react';
import { Artist, spotifyEmbed, RELEASES } from '../data';

const Avatar: React.FC<{ artist: Artist; size: string }> = ({ artist, size }) =>
  artist.image ? (
    <img src={artist.image} alt={artist.name} className={`${size} rounded-2xl object-cover border border-[#ff1f4b]/30`} />
  ) : (
    <div
      aria-hidden
      className={`${size} rounded-2xl border border-[#ff1f4b]/30 bg-gradient-to-br from-[#3b0711] to-[#14080b] grid place-items-center font-orbitron font-black text-[#ff1f4b]`}
    >
      {artist.name.replace(/^DJ /i, '').slice(0, 2).toUpperCase()}
    </div>
  );

export const ArtistsView: React.FC<{ artists: Artist[]; selectedId?: string }> = ({ artists, selectedId }) => {
  const artist = artists.find(a => a.id === selectedId);

  if (artist) {
    const releases = RELEASES.filter(r => r.artist.toLowerCase().includes(artist.name.toLowerCase()));
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        <a href="#/artists" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-[#ff1f4b]">
          <ArrowLeft className="w-4 h-4" /> All artists
        </a>
        <div className="flex flex-col sm:flex-row gap-6 sm:items-center">
          <Avatar artist={artist} size="w-32 h-32 text-4xl shrink-0" />
          <div className="space-y-2">
            <h1 className="font-orbitron font-black text-3xl sm:text-5xl text-white">{artist.name}</h1>
            <p className="text-sm text-[#ff1f4b] font-orbitron">
              {artist.genre}{artist.origin ? `, ${artist.origin}` : ''}
            </p>
            <p className="text-gray-300 max-w-xl leading-relaxed">{artist.bio}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          {artist.links.map(l => (
            <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer"
               className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-[#0b0507] text-sm text-gray-200 hover:border-[#ff1f4b] hover:text-white transition-colors">
              {l.label} <ExternalLink className="w-3.5 h-3.5" />
            </a>
          ))}
        </div>

        {artist.spotifyArtistId && (
          <iframe src={spotifyEmbed('artist', artist.spotifyArtistId)} width="100%" height="352" loading="lazy"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  title={`${artist.name} on Spotify`} className="rounded-2xl border border-white/10" />
        )}

        {releases.map(r => (
          <div key={r.id} className="space-y-3">
            <h2 className="font-orbitron font-bold text-xl text-white">{r.title}</h2>
            <iframe src={spotifyEmbed('album', r.spotifyAlbumId)} width="100%" height="352" loading="lazy"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    title={r.title} className="rounded-2xl border border-white/10" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="max-w-2xl space-y-3">
        <h1 className="font-orbitron font-black text-3xl sm:text-5xl text-white">Artists</h1>
        <p className="text-gray-400">The producers and DJs releasing through Cyntron Records.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {artists.map(a => (
          <a key={a.id} href={`#/artists/${a.id}`}
             className="group bg-[#0b0507] border border-white/10 rounded-2xl p-6 hover:border-[#ff1f4b] transition-colors flex gap-5 items-center">
            <Avatar artist={a} size="w-20 h-20 text-2xl shrink-0" />
            <div className="min-w-0">
              <h2 className="font-orbitron font-bold text-lg text-white group-hover:text-[#ff1f4b] transition-colors">{a.name}</h2>
              <p className="text-xs text-[#ff1f4b] font-orbitron">{a.genre}</p>
              <p className="text-xs text-gray-400 mt-1 line-clamp-2">{a.bio}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};
