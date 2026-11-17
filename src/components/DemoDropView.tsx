import React, { useState, useEffect } from 'react';
import { api } from '../api';
import { Upload, CheckCircle, Clock, AlertCircle, Sparkles, FileText, ChevronUp } from 'lucide-react';

interface DemoDropViewProps {
  user: any;
  onOpenAuth: () => void;
}

const inputCls = 'w-full bg-[#14080b] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#ff1f4b]';
const labelCls = 'block text-xs font-orbitron text-gray-300 uppercase mb-1';

// Same fields as the Cyntron Records Release Tracker sheet.
const ReleaseForm: React.FC<{ demo: any; existing?: any; onSaved: () => void }> = ({ demo, existing, onSaved }) => {
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [f, setF] = useState<any>(() => ({
    legalName: '',
    trackName: demo.trackTitle,
    artistNames: demo.artistName,
    numberOfArtists: 1,
    discordUsername: '',
    discordUserId: '',
    existingSpotify: '',
    explicitAudio: '',
    preferredReleaseDate: '',
    coverArt: '',
    genre: demo.genre || '',
    oac: '',
    message: '',
    artistDetails: [''],
    ...(existing || {}),
  }));

  const set = (k: string, v: any) => setF((p: any) => ({ ...p, [k]: v }));
  const setDetail = (i: number, v: string) =>
    setF((p: any) => {
      const next = [...(p.artistDetails || [])];
      while (next.length <= i) next.push('');
      next[i] = v;
      return { ...p, artistDetails: next };
    });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const { syncedToTracker, updatedAt, ...body } = f;
      await api(`/api/demos/${demo.id}/release-form`, { method: 'POST', body });
      setOpen(false);
      onSaved();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (!open) {
    return (
      <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl space-y-2">
        <p className="text-xs text-emerald-400 font-semibold">
          {existing ? 'Release info received. You can update it until the release is out.' : 'Your demo was approved! Send us your release info so we can get it out.'}
        </p>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#ff1f4b] to-[#99001a] text-white font-orbitron text-[10px] font-bold uppercase tracking-wider hover:opacity-90"
        >
          <FileText className="w-3.5 h-3.5" /> {existing ? 'Edit release info' : 'Fill release form'}
        </button>
      </div>
    );
  }

  const count = Math.min(10, Math.max(1, Number(f.numberOfArtists) || 1));

  return (
    <form onSubmit={submit} className="p-4 bg-black/30 border border-white/10 rounded-xl space-y-4">
      <div className="flex items-center justify-between">
        <p className="font-orbitron text-[10px] text-[#ff1f4b] uppercase">Release form</p>
        <button type="button" onClick={() => setOpen(false)} className="text-gray-400 hover:text-white" aria-label="Close form">
          <ChevronUp className="w-4 h-4" />
        </button>
      </div>

      {error && (
        <div className="p-3 bg-[#ff1f4b]/10 border border-[#ff1f4b]/30 rounded-xl flex items-center gap-2 text-[#ff1f4b] text-xs">
          <AlertCircle className="w-4 h-4 flex-shrink-0" /> <span>{error}</span>
        </div>
      )}

      <div>
        <label className={labelCls}>Legal Name *</label>
        <input required className={inputCls} value={f.legalName} onChange={(e) => set('legalName', e.target.value)} placeholder="Your full legal name" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className={labelCls}>Track Name *</label>
          <input required className={inputCls} value={f.trackName} onChange={(e) => set('trackName', e.target.value)} />
        </div>
        <div>
          <label className={labelCls}>Genre *</label>
          <input required className={inputCls} value={f.genre} onChange={(e) => set('genre', e.target.value)} placeholder="e.g. Brazilian Funk" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className={labelCls}>Artist Name(s) *</label>
          <input required className={inputCls} value={f.artistNames} onChange={(e) => set('artistNames', e.target.value)} />
        </div>
        <div>
          <label className={labelCls}>Number Of Artists *</label>
          <select className={inputCls} value={count} onChange={(e) => set('numberOfArtists', Number(e.target.value))}>
            {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className={labelCls}>Discord Username *</label>
          <input required className={inputCls} value={f.discordUsername} onChange={(e) => set('discordUsername', e.target.value)} placeholder="@username" />
        </div>
        <div>
          <label className={labelCls}>Discord User ID</label>
          <input className={inputCls} inputMode="numeric" value={f.discordUserId} onChange={(e) => set('discordUserId', e.target.value)} placeholder="Optional" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className={labelCls}>Explicit Audio *</label>
          <select required className={inputCls} value={f.explicitAudio} onChange={(e) => set('explicitAudio', e.target.value)}>
            <option value="">Select...</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <div>
          <label className={labelCls}>Preferred Release Date</label>
          <input type="date" className={inputCls} value={f.preferredReleaseDate} onChange={(e) => set('preferredReleaseDate', e.target.value)} />
        </div>
      </div>
      <div>
        <label className={labelCls}>Existing Spotify For Artists Account</label>
        <input className={inputCls} value={f.existingSpotify} onChange={(e) => set('existingSpotify', e.target.value)} placeholder="Your Spotify artist link, or leave blank if you don't have one" />
      </div>
      <div>
        <label className={labelCls}>Cover Art</label>
        <input className={inputCls} value={f.coverArt} onChange={(e) => set('coverArt', e.target.value)} placeholder="Link to your cover art (Drive, Dropbox, etc.)" />
      </div>
      <div>
        <label className={labelCls}>OAC</label>
        <input className={inputCls} value={f.oac} onChange={(e) => set('oac', e.target.value)} placeholder="Optional" />
      </div>

      {Array.from({ length: count }, (_, i) => (
        <div key={i}>
          <label className={labelCls}>Artist {i + 1} Details</label>
          <textarea
            rows={2}
            className={inputCls}
            value={(f.artistDetails || [])[i] || ''}
            onChange={(e) => setDetail(i, e.target.value)}
            placeholder="Name, email and streaming profile links"
          />
        </div>
      ))}

      <div>
        <label className={labelCls}>Message</label>
        <textarea rows={2} className={inputCls} value={f.message} onChange={(e) => set('message', e.target.value)} placeholder="Anything else we should know?" />
      </div>

      <button
        type="submit"
        disabled={saving}
        className="w-full py-3 rounded-xl bg-gradient-to-r from-[#ff1f4b] to-[#99001a] text-white font-orbitron text-xs font-bold uppercase tracking-wider hover:opacity-90 disabled:opacity-50"
      >
        {saving ? 'Sending...' : existing ? 'Update release info' : 'Send release info'}
      </button>
    </form>
  );
};

export const DemoDropView: React.FC<DemoDropViewProps> = ({ user, onOpenAuth }) => {
  const [demos, setDemos] = useState<any[]>([]);
  const [releaseForms, setReleaseForms] = useState<Record<string, any>>({});
  const [trackTitle, setTrackTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [bio, setBio] = useState('');
  const [soundcloudUrl, setSoundcloudUrl] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const fetchDemos = async () => {
    if (!user) { setDemos([]); setReleaseForms({}); return; }
    try {
      const [d, forms] = await Promise.all([api('/api/demos'), api('/api/release-forms')]);
      setDemos(d);
      setReleaseForms(forms || {});
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
      await api('/api/demos', { method: 'POST', body: { trackTitle, genre, bio, soundcloudUrl } });
      setSuccessMsg('Demo sent. You can track its status on the right.');
      setTrackTitle('');
      setGenre('');
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
                <label className={labelCls}>Track Title *</label>
                <input
                  type="text"
                  required
                  value={trackTitle}
                  onChange={(e) => setTrackTitle(e.target.value)}
                  placeholder="e.g. Cybernetic Pulse"
                  className={inputCls}
                />
              </div>
              <div>
                <label className={labelCls}>Genre / Style *</label>
                <input
                  type="text"
                  required
                  maxLength={60}
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                  placeholder="e.g. Phonk, Brazilian Funk, Drum & Bass"
                  className={inputCls}
                />
              </div>
            </div>

            <div>
              <label htmlFor="track-url" className={labelCls}>Link to your track *</label>
              <input
                id="track-url"
                type="url"
                required
                value={soundcloudUrl}
                onChange={(e) => setSoundcloudUrl(e.target.value)}
                placeholder="https://soundcloud.com/you/private-track"
                className={inputCls}
              />
              <p className="text-xs text-gray-500 mt-1">Use a private SoundCloud, Google Drive or Dropbox link we can open.</p>
            </div>

            <div>
              <label className={labelCls}>Artist Bio & Track Notes</label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell us about your production setup, influences, and the story behind this track..."
                className={inputCls}
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
                          <p className="text-xs text-gray-400">{demo.genre}</p>
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

                      {demo.status === 'Signed' && demo.artistId === user.id && (
                        <ReleaseForm demo={demo} existing={releaseForms[demo.id]} onSaved={fetchDemos} />
                      )}

                      <div className="flex items-center justify-between text-[10px] text-gray-500 font-mono pt-2 border-t border-white/5">
                        <span>Submitted: {new Date(demo.createdAt).toLocaleDateString()}</span>
                        {demo.rating > 0 && <span className="text-[#ff1f4b] font-bold">Rating: {demo.rating} / 5.0</span>}
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
