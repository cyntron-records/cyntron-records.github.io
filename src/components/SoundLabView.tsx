import React, { useState } from 'react';
import { Radio, Play, Pause, Sliders, Volume2, Sparkles, Disc } from 'lucide-react';

export const SoundLabView: React.FC = () => {
  const [activePad, setActivePad] = useState<number | null>(null);
  const [filterFreq, setFilterFreq] = useState(1200);
  const [distortion, setDistortion] = useState(30);

  const pads = [
    { id: 1, name: 'Cyber Arp', freq: 440, color: 'from-[#ff1f4b] to-[#e60026]' },
    { id: 2, name: 'Sub Bass', freq: 110, color: 'from-[#99001a] to-[#4a000d]' },
    { id: 3, name: 'Laser Lead', freq: 880, color: 'from-[#ff3366] to-[#b30024]' },
    { id: 4, name: 'Industrial Kick', freq: 65, color: 'from-[#e11d48] to-[#9f1239]' },
    { id: 5, name: 'Neon Pad', freq: 523, color: 'from-[#f43f5e] to-[#be123c]' },
    { id: 6, name: 'Vocal Glitch', freq: 659, color: 'from-[#fb7185] to-[#e11d48]' },
  ];

  const playTone = (id: number, freq: number) => {
    setActivePad(id);
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      
      osc.type = id % 2 === 0 ? 'sawtooth' : 'sine';
      osc.frequency.setValueAtTime(freq + (filterFreq - 1200) * 0.1, audioCtx.currentTime);
      
      gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.8);
      
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      
      osc.start();
      osc.stop(audioCtx.currentTime + 0.8);
    } catch (e) {
      console.log('AudioContext error:', e);
    }

    setTimeout(() => setActivePad(null), 300);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ff1f4b]/10 border border-[#ff1f4b]/30 text-[#ff1f4b] text-xs font-orbitron tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          CYNTRON ANALOG SOUND LAB v2.0
        </div>
        <h1 className="font-orbitron font-black text-3xl sm:text-5xl text-white">SYNTH & FREQUENCY LAB</h1>
        <p className="text-sm text-gray-400">
          Experiment with modular synth frequencies and sound design modules used by our resident producers.
        </p>
      </div>

      {/* Synth Interface */}
      <div className="max-w-4xl mx-auto bg-[#0b0507] border border-[#ff1f4b]/40 rounded-3xl p-6 sm:p-10 glow-red space-y-8">
        {/* Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-[#14080b] border border-white/10 p-6 rounded-2xl">
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-orbitron text-gray-300">
              <span>Filter Cutoff Freq</span>
              <span className="text-[#ff1f4b]">{filterFreq} Hz</span>
            </div>
            <input
              type="range"
              min={200}
              max={4000}
              value={filterFreq}
              onChange={(e) => setFilterFreq(Number(e.target.value))}
              className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#ff1f4b]"
            />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-orbitron text-gray-300">
              <span>Drive / Saturation</span>
              <span className="text-[#ff3366]">{distortion}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={distortion}
              onChange={(e) => setDistortion(Number(e.target.value))}
              className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#ff3366]"
            />
          </div>
        </div>

        {/* Pad Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
          {pads.map((pad) => (
            <button
              key={pad.id}
              onClick={() => playTone(pad.id, pad.freq)}
              className={`h-36 rounded-2xl bg-gradient-to-br ${pad.color} p-1 transition-all transform hover:scale-105 active:scale-95 ${
                activePad === pad.id ? 'ring-4 ring-white glow-red scale-95' : 'opacity-90'
              }`}
            >
              <div className="w-full h-full bg-[#080305]/95 rounded-[14px] flex flex-col items-center justify-center p-4 text-center">
                <Disc className={`w-8 h-8 mb-2 ${activePad === pad.id ? 'text-white animate-spin' : 'text-[#ff1f4b]'}`} />
                <span className="font-orbitron font-bold text-sm text-white">{pad.name}</span>
                <span className="text-[10px] font-mono text-gray-400 mt-1">{pad.freq} Hz</span>
              </div>
            </button>
          ))}
        </div>

        <div className="text-center pt-4 border-t border-white/10">
          <p className="text-xs text-gray-400 font-mono">CLICK PADS TO TRIGGER SYNTH OSCILLATOR // WEB AUDIO API ACTIVE</p>
        </div>
      </div>
    </div>
  );
};
