import React, { useState, useEffect } from 'react';
import { api } from '../api';
import { Shield, Disc, Star, CheckCircle, Sparkles, AlertCircle, Search, Filter } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [demos, setDemos] = useState<any[]>([]);
  const [loadingAIId, setLoadingAIId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const [error, setError] = useState('');

  const fetchDemos = async () => {
    try {
      setDemos(await api('/api/demos'));
      setError('');
    } catch (e: any) {
      setError(e.message);
    }
  };

  useEffect(() => {
    fetchDemos();
  }, []);

  const patchDemo = async (id: string, body: object) => {
    try {
      await api(`/api/demos/${id}`, { method: 'PATCH', body });
      await fetchDemos();
    } catch (e: any) {
      setError(e.message);
    }
  };

  const handleUpdateStatus = (id: string, status: string) => patchDemo(id, { status });
  const handleUpdateFeedback = (id: string, feedback: string, rating: number) => patchDemo(id, { feedback, rating });

  const handleRunAIAnalysis = async (id: string) => {
    setLoadingAIId(id);
    try {
      await api(`/api/demos/${id}/ai-analyze`, { method: 'POST' });
      await fetchDemos();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoadingAIId(null);
    }
  };

  const filteredDemos = demos.filter(d => {
    const matchesStatus = statusFilter === 'All' || d.status === statusFilter;
    const matchesSearch = d.trackTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          d.artistName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          d.genre.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const totalCount = demos.length;
  const pendingCount = demos.filter(d => d.status === 'Pending').length;
  const signedCount = demos.filter(d => d.status === 'Signed').length;
  const avgRating = totalCount > 0 ? (demos.reduce((acc, d) => acc + (d.rating || 0), 0) / totalCount).toFixed(1) : '0.0';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ff1f4b]/10 border border-[#ff1f4b]/40 text-[#ff1f4b] text-xs font-orbitron tracking-wider mb-2">
            <Shield className="w-3.5 h-3.5" />
            LABEL MANAGEMENT & A&R DASHBOARD
          </div>
          <h1 className="font-orbitron font-black text-3xl sm:text-4xl text-white">SUBMISSIONS COMMAND HUB</h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchDemos}
            className="px-4 py-2 bg-[#14080b] border border-white/10 rounded-xl text-xs font-orbitron text-gray-300 hover:text-white"
          >
            ↻ Refresh Queue
          </button>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#0b0507] border border-white/10 rounded-2xl p-5">
          <p className="text-xs font-orbitron text-gray-400 uppercase">Total Submissions</p>
          <p className="font-orbitron font-bold text-3xl text-white mt-2">{totalCount}</p>
        </div>
        <div className="bg-[#0b0507] border border-white/10 rounded-2xl p-5">
          <p className="text-xs font-orbitron text-amber-400 uppercase">Pending Review</p>
          <p className="font-orbitron font-bold text-3xl text-amber-400 mt-2">{pendingCount}</p>
        </div>
        <div className="bg-[#0b0507] border border-white/10 rounded-2xl p-5">
          <p className="text-xs font-orbitron text-emerald-400 uppercase">Signed Artists</p>
          <p className="font-orbitron font-bold text-3xl text-emerald-400 mt-2">{signedCount}</p>
        </div>
        <div className="bg-[#0b0507] border border-white/10 rounded-2xl p-5">
          <p className="text-xs font-orbitron text-[#ff1f4b] uppercase">Average Score</p>
          <p className="font-orbitron font-bold text-3xl text-[#ff1f4b] mt-2">{avgRating} ★</p>
        </div>
      </div>

      {/* Controls & Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#0b0507] border border-white/10 p-4 rounded-2xl">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search by track, artist, or genre..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#14080b] border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-[#ff1f4b]"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
          {['All', 'Pending', 'Shortlisted', 'Signed', 'Reviewed', 'Rejected'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-xl text-xs font-orbitron uppercase tracking-wider whitespace-nowrap transition-all ${
                statusFilter === status
                  ? 'bg-gradient-to-r from-[#ff1f4b] to-[#99001a] text-white font-bold glow-red'
                  : 'bg-[#14080b] text-gray-300 hover:text-white border border-white/10'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Submissions List */}
      <div className="space-y-6">
        {error && <p role="alert" className="mb-4 p-3 rounded-xl border border-[#ff1f4b]/30 bg-[#ff1f4b]/10 text-sm text-[#ff1f4b]">{error}</p>}
        {filteredDemos.length === 0 ? (
          <div className="bg-[#0b0507] border border-white/10 rounded-3xl p-12 text-center text-gray-400">
            No submissions match the current filter criteria.
          </div>
        ) : (
          filteredDemos.map((demo) => (
            <div key={demo.id} className="bg-[#0b0507] border border-white/10 rounded-3xl p-6 space-y-6 hover:border-[#ff1f4b]/40 transition-all">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-orbitron font-bold text-xl text-white">{demo.trackTitle}</h3>
                    <span className="px-3 py-1 rounded-full text-xs font-orbitron bg-[#ff1f4b]/10 text-[#ff1f4b] border border-[#ff1f4b]/30">
                      {demo.genre}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400">Artist: <span className="text-white font-semibold">{demo.artistName}</span> • BPM: {demo.bpm} • Key: {demo.key}</p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleRunAIAnalysis(demo.id)}
                    disabled={loadingAIId === demo.id}
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#99001a] to-[#ff3366] text-white font-orbitron text-xs font-bold uppercase flex items-center gap-2 glow-red hover:opacity-90 disabled:opacity-50"
                  >
                    <Sparkles className="w-4 h-4" />
                    {loadingAIId === demo.id ? 'Analyzing AI...' : '🤖 AI A&R Review'}
                  </button>
                </div>
              </div>

              {demo.bio && (
                <div className="p-4 bg-[#14080b] border border-white/10 rounded-2xl text-xs text-gray-300">
                  <span className="font-orbitron text-[#ff1f4b] uppercase block mb-1">Artist Bio & Notes:</span>
                  {demo.bio}
                </div>
              )}

              {/* Status and Feedback Editor */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/5 items-center">
                <div>
                  <label className="block text-[10px] font-orbitron text-gray-400 uppercase mb-1">Review Status</label>
                  <select
                    value={demo.status}
                    onChange={(e) => handleUpdateStatus(demo.id, e.target.value)}
                    className="w-full bg-[#14080b] border border-white/10 rounded-xl px-3 py-2 text-xs font-orbitron text-white focus:outline-none focus:border-[#ff1f4b]"
                  >
                    <option value="Pending">Pending Review</option>
                    <option value="Reviewed">Reviewed</option>
                    <option value="Shortlisted">Shortlisted</option>
                    <option value="Signed">Signed 🚀</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-orbitron text-gray-400 uppercase mb-1">A&R Rating (1-5)</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min={1}
                      max={5}
                      step={0.5}
                      value={demo.rating || 0}
                      onChange={(e) => handleUpdateFeedback(demo.id, demo.feedback, Number(e.target.value))}
                      className="w-20 bg-[#14080b] border border-white/10 rounded-xl px-3 py-2 text-xs text-white text-center font-mono focus:outline-none focus:border-[#ff1f4b]"
                    />
                    <span className="text-amber-400">★</span>
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-[10px] font-orbitron text-gray-400 uppercase mb-1">A&R Feedback Notes for Artist</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      defaultValue={demo.feedback || ''}
                      onBlur={(e) => handleUpdateFeedback(demo.id, e.target.value, demo.rating)}
                      placeholder="Add constructive feedback notes here..."
                      className="w-full bg-[#14080b] border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-[#ff1f4b]"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
