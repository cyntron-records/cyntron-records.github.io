// Single source of truth for the public site. Edit this file to add artists or releases.

export interface Artist {
  id: string;
  name: string;
  genre: string;
  origin: string;
  bio: string;
  image?: string;
  spotifyArtistId?: string;
  links: { label: string; url: string }[];
}

export interface Release {
  id: string;
  title: string;
  artist: string;
  genre: string;
  releaseDate?: string;
  spotifyAlbumId: string;
}

export const LABEL = {
  name: 'Cyntron Records',
  tagline: 'A free-to-use record label',
  about:
    'Cyntron Records helps artists from all around the world get their music onto every major streaming platform and in front of a wide audience.',
  discordInvite: 'https://discord.gg/C9TgWUKtp7',
  youtube: 'https://www.youtube.com/@CyntronRecords',
  stats: [
    { value: '200+', label: 'Monthly listeners' },
    { value: '10', label: 'Artist releases' },
    { value: '400+', label: 'Platforms reached' },
  ],
  services: [
    { title: 'Worldwide push', text: 'Release strategy and visibility work so tracks land on streaming platforms with a global audience in mind.' },
    { title: 'Creative direction', text: 'Artist positioning and visual identity, so every release feels cohesive and ready for the next one.' },
    { title: 'Artist growth', text: 'Consistency and discoverability that help emerging artists build a lasting presence.' },
  ],
};

export const ARTISTS: Artist[] = [
  {
    id: 'softmap',
    name: 'Softmap',
    genre: 'Founder / producer',
    origin: 'India',
    bio: 'Founder of Cyntron Records and a producer based in India. Co-wrote PERDIDO NO VAZIO with D4NTRIX.',
    links: [
      { label: 'YouTube', url: 'https://www.youtube.com/@SoftmapYT' },
      { label: 'Instagram', url: 'https://www.instagram.com/prodby.softmap/' },
    ],
  },
  {
    id: 'd4ntrix',
    name: 'D4NTRIX',
    genre: 'Brazilian phonk',
    origin: 'Brazil',
    bio: 'Brazilian phonk producer. Released PERDIDO NO VAZIO with Softmap on June 3, 2026.',
    image: 'artists/d4ntrix.png',
    spotifyArtistId: '0HaSpzTBr5gjAHZQmbgBvg',
    links: [
      { label: 'Spotify', url: 'https://open.spotify.com/intl-pt/artist/0HaSpzTBr5gjAHZQmbgBvg' },
      { label: 'YouTube', url: 'https://www.youtube.com/@D4NTRIX' },
      { label: 'Instagram', url: 'https://www.instagram.com/d4ntrlx/' },
      { label: 'TikTok', url: 'https://www.tiktok.com/@d4ntrix7' },
    ],
  },
  {
    id: 'rippjxw',
    name: 'RIPPJXW',
    genre: 'Brazilian phonk',
    origin: 'United States',
    bio: "U.S.-based phonk producer drawing on Brazil's underground sound: distorted 808s, dark atmospheres and high-energy rhythms.",
    links: [
      { label: 'Spotify', url: 'https://open.spotify.com/artist/5c1I226aAzxUeZS6Sf4eic' },
      { label: 'TikTok', url: 'https://www.tiktok.com/@skchilz' },
    ],
  },
  {
    id: 'dj-beomseo',
    name: 'DJ Beomseo',
    genre: 'DJ / producer',
    origin: '',
    bio: 'Building his own sound and sharing it with listeners around the world.',
    links: [{ label: 'Spotify', url: 'https://open.spotify.com/artist/3s8SoKODkklBjJwV2zHPkb' }],
  },
  {
    id: 'dj-voxa',
    name: 'DJ Voxa',
    genre: 'DJ / producer',
    origin: '',
    bio: 'Building his own sound and sharing it with listeners around the world.',
    links: [{ label: 'Spotify', url: 'https://open.spotify.com/artist/6EQHHmn464Uo2Av9vXaAlM' }],
  },
];

export const RELEASES: Release[] = [
  {
    id: 'perdido-no-vazio',
    title: 'PERDIDO NO VAZIO',
    artist: 'Softmap & D4NTRIX',
    genre: 'Brazilian phonk',
    releaseDate: '2026-06-03',
    spotifyAlbumId: '4NntCXalmOaXgzeQo2Rkcx',
  },
  {
    id: 'rippjxw-latest',
    title: 'Latest release',
    artist: 'RIPPJXW',
    genre: 'Brazilian phonk',
    spotifyAlbumId: '3XJsWU5KJKRWvVakjOnqT2',
  },
  {
    id: 'beomseo-voxa',
    title: 'Featured album',
    artist: 'DJ Beomseo & DJ Voxa',
    genre: 'Electronic',
    spotifyAlbumId: '2DjmUprKD2WQeZyiahclyu',
  },
];

export const spotifyEmbed = (kind: 'album' | 'artist' | 'track', id: string) =>
  `https://open.spotify.com/embed/${kind}/${id}?utm_source=generator&theme=0`;
