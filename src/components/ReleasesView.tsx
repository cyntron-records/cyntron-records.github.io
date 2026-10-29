import React from 'react';
import { Release, spotifyEmbed } from '../data';

export const ReleasesView: React.FC<{ releases: Release[] }> = ({ releases }) => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
    <div className="max-w-2xl space-y-3">
      <h1 className="font-orbitron font-black text-3xl sm:text-5xl text-white">Releases</h1>
      <p className="text-gray-400">Listen to the latest from Cyntron Records, right here.</p>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {releases.map(r => (
        <article key={r.id} className="bg-[#0b0507] border border-white/10 rounded-2xl p-5 space-y-4">
          <div>
            <h2 className="font-orbitron font-bold text-xl text-white">{r.title}</h2>
            <p className="text-sm text-gray-400">
              {r.artist}{r.releaseDate ? `, ${new Date(r.releaseDate + 'T00:00').toLocaleDateString(undefined, { dateStyle: 'long' })}` : ''}
            </p>
          </div>
          <iframe src={spotifyEmbed('album', r.spotifyAlbumId)} width="100%" height="352" loading="lazy"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  title={`${r.title} on Spotify`} className="rounded-xl border border-white/10" />
        </article>
      ))}
    </div>
  </div>
);
