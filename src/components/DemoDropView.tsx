import React, { useState, useEffect } from 'react';
import { api } from '../api';
import { Upload, Music, CheckCircle, Clock, AlertCircle, Disc, Headphones, Sparkles } from 'lucide-react';

interface DemoDropViewProps {
  user: any;
  onOpenAuth: () => void;
}

export const DemoDropView: React.FC<DemoDropViewProps> = ({ user, onOpenAuth }) => {
  const [demos, setDemos] = useState<any[]>([]);
  const [trackTitle, setTrackTitle] = useState('');
  const [genre, setGenre] = useState('Synthwave');
  const [bpm, setBpm] = useState('120');
  const [key, setKey] = useState('Am');
  const [bio, setBio] = useState('');
  const [soundcloudUrl, setSoundcloudUrl] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const fetchDemos = async () => {
    if (!user) { setDemos([]); return; }
    try {
      setDemos(await api('/api/demos'));
    } catch (e: any) {
      setErrorMsg(e.message);
    }
  };

  useEffect(() => {
    fetchDemos();
  }, [user?.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      onOpenAuth();
      return;
    }
    setSubmitting(true);
    setErrorMsg('');
    setSuccessMsg('');
    try {
      await api('/api/demos', { method: 'POST', body: { trackTitle, genre, bpm, key, bio, soundcloudUrl } });
      setSuccessMsg('Demo sent. You can track its status on the right.');
      setTrackTitle('');
      setBio('');
      setSoundcloudUrl('');
      fetchDemos();
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const myDemos = user?.role === 'admin' 
    ? demos 
    : demos.filter(d => d.artistId === user?.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ff1f4b]/10 border border-[#ff1f4b]/30 text-[#ff1f4b] text-xs font-orbitron tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          Demo submissions
        </div>
        <h1 className="font-orbitron font-black text-3xl sm:text-5xl text-white">DEMO DROP</h1>
        <p className="text-sm text-gray-400">
          Submit your unreleased electronic tracks directly to the Cyntron Records A&R review queue.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Submission Form */}
        <div className="lg:col-span-7 bg-[#0b0507] border border-white/10 rounded-3xl p-6 sm:p-8">
          <h3 className="font-orbitron font-bold text-xl text-white mb-6 flex items-center gap-2">
            <Upload className="w-5 h-5 text-[#ff1f4b]" /> Track Submission Form
          </h3>

          {!user && (
            <div className="mb-6 p-4 bg-[#ff1f4b]/10 border border-[#ff1f4b]/30 rounded-2xl flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-white">Sign in to submit</p>
                <p className="text-xs text-gray-300">Create a free account to send a demo and track its status.</p>
              </div>
              <button
                onClick={onOpenAuth}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#ff1f4b] to-[#99001a] text-white font-orbitron text-xs font-bold uppercase"
              >
                Sign In
              </button>
            </div>
          )}

          {successMsg && (
            <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center gap-3 text-emerald-400 text-sm">
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {errorMsg && (
            <div className="mb-6 p-4 bg-[#ff1f4b]/10 border border-[#ff1f4b]/30 rounded-2xl flex items-center gap-3 text-[#ff1f4b] text-sm">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-orbitron text-gray-300 uppercase mb-1">Track Title *</label>
                <input
                  type="text"
                  required
                  value={trackTitle}
                  onChange={(e) => setTrackTitle(e.target.value)}
                  placeholder="e.g. Cybernetic Pulse"
                  className="w-full bg-[#14080b] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#ff1f4b]"
                />
              </div>
              <div>
                <label className="block text-xs font-orbitron text-gray-300 uppercase mb-1">Genre / Style *</label>
                <select
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                  className="w-full bg-[#14080b] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#ff1f4b]"
                >
                  <option value="Synthwave">Synthwave / Cyberpunk</option>
                  <option value="Industrial Techno">Industrial Techno</option>
                  <option value="Ambient IDM">Ambient IDM</option>
                  <option value="Dark Electro">Dark Electro</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-orbitron text-gray-300 uppercase mb-1">BPM</label>
                <input
                  type="text"
                  value={bpm}
                  onChange={(e) => setBpm(e.target.value)}
                  placeholder="128"
                  className="w-full bg-[#14080b] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#ff1f4b]"
                />
              </div>
              <div>
                <label className="block text-xs font-orbitron text-gray-300 uppercase mb-1">Key</label>
                <input
                  type="text"
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                  placeholder="Am"
                  className="w-full bg-[#14080b] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#ff1f4b]"
                />
              </div>
            </div>

            <div>
              <label htmlFor="track-url" className="block text-xs font-orbitron text-gray-300 uppercase mb-1">Link to your track *</label>
              <input
                id="track-url"
                type="url"
                required
                value={soundcloudUrl}
                onChange={(e) => setSoundcloudUrl(e.target.value)}
                placeholder="https://soundcloud.com/you/private-track"
                className="w-full bg-[#14080b] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#ff1f4b]"
              />
              <p className="text-xs text-gray-500 mt-1">Use a private SoundCloud, Google Drive or Dropbox link we can open.</p>
            </div>

            <div>
              <label className="block text-xs font-orbitron text-gray-300 uppercase mb-1">Artist Bio & Track Notes</label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell us about your production setup, influences, and the story behind this track..."
                className="w-full bg-[#14080b] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#ff1f4b]"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-[#ff1f4b] to-[#99001a] text-white font-orbitron text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-all glow-red disabled:opacity-50"
            >
              {submitting ? 'Sending...' : 'Send demo'}
            </button>
          </form>
        </div>

        {/* My Submissions Status Queue */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#0b0507] border border-white/10 rounded-3xl p-6 sm:p-8">
            <h3 className="font-orbitron font-bold text-xl text-white mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#ff3366]" /> Submission Status
            </h3>
            <p className="text-xs text-gray-400 mb-6">
              {user ? `Showing submissions for ${user.name}` : 'Sign in to view your submission status.'}
            </p>

            {!user ? (
              <div className="text-center py-10 text-gray-500 text-xs">
                Authentication required to view status queue.
              </div>
            ) : myDemos.length === 0 ? (
              <div className="text-center py-10 text-gray-500 text-xs">
                No demo submissions found. Drop your first track on the left!
              </div>
            ) : (
              <div className="space-y-4">
                {myDemos.map((demo) => {
                  const statusColors: any = {
                    'Pending': 'bg-amber-500/10 text-amber-400 border-amber-500/30',
                    'Shortlisted': 'bg-[#ff1f4b]/10 text-[#ff1f4b] border-[#ff1f4b]/30',
                    'Signed': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
                    'Reviewed': 'bg-[#ff3366]/10 text-[#ff3366] border-[#ff3366]/40',
                    'Rejected': 'bg-rose-500/10 text-rose-400 border-rose-500/30',
                  };

                  return (
                    <div key={demo.id} className="bg-[#14080b] border border-white/10 rounded-2xl p-4 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-orbitron font-bold text-white text-sm">{demo.trackTitle}</h4>
                          <p className="text-xs text-gray-400">{demo.genre} • {demo.bpm} BPM</p>
                        </div>
                        <span className={`px-2.5 py-1 rounded-md text-[10px] font-orbitron uppercase border ${statusColors[demo.status] || 'bg-gray-500/10 text-gray-300'}`}>
                          {demo.status}
                        </span>
                      </div>

                      {demo.feedback && (
                        <div className="p-3 bg-black/30 rounded-xl text-xs text-gray-300 border border-white/5 space-y-1">
                          <p className="font-orbitron text-[10px] text-[#ff1f4b] uppercase">A&R Feedback Notes:</p>
                          <p className="whitespace-pre-line">{demo.feedback}</p>
                        </div>
                      )}

                      <div className="flex items-center justify-between text-[10px] text-gray-500 font-mono pt-2 border-t border-white/5">
                        <span>Submitted: {new Date(demo.createdAt).toLocaleDateString()}</span>
                        {demo.rating > 0 && <span className="text-[#ff1f4b] font-bold">Rating: {demo.rating} / 5.0 ★</span>}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
