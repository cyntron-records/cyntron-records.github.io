import React from 'react';
import { Disc, Globe } from 'lucide-react';
import { LABEL } from '../data';

export const Footer: React.FC<{ setCurrentTab: (tab: string) => void }> = ({ setCurrentTab }) => {
  return (
    <footer className="bg-[#050203] border-t border-[#3b0711] pt-16 pb-24 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Col 1 */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#ff1f4b] to-[#99001a] p-0.5">
              <div className="w-full h-full bg-[#080305] rounded-[6px] flex items-center justify-center">
                <Disc className="w-4 h-4 text-[#ff1f4b]" />
              </div>
            </div>
            <span className="font-orbitron font-black text-lg tracking-wider text-white">
              CYNTRON<span className="text-[#ff1f4b]">.</span>
            </span>
          </div>
          <p className="text-sm text-gray-400">
            A free-to-use record label helping artists from all around the world reach every major streaming platform.
          </p>
          <div className="flex items-center gap-3 text-[#ff1f4b]">
            <Globe className="w-4 h-4" />
            <span className="text-xs font-mono">Open to artists worldwide</span>
          </div>
        </div>

        {/* Col 2 */}
        <div>
          <h5 className="font-orbitron text-sm font-bold text-white uppercase tracking-wider mb-4">Navigation</h5>
          <ul className="space-y-2 text-sm">
            <li><button onClick={() => setCurrentTab('home')} className="hover:text-[#ff1f4b] transition-colors">Home</button></li>
            <li><button onClick={() => setCurrentTab('releases')} className="hover:text-[#ff1f4b] transition-colors">Releases</button></li>
            <li><button onClick={() => setCurrentTab('artists')} className="hover:text-[#ff1f4b] transition-colors">Artists</button></li>
            <li><button onClick={() => setCurrentTab('soundlab')} className="hover:text-[#ff1f4b] transition-colors">Sound Lab</button></li>
          </ul>
        </div>

        {/* Col 3 */}
        <div>
          <h5 className="font-orbitron text-sm font-bold text-white uppercase tracking-wider mb-4">Submissions</h5>
          <ul className="space-y-2 text-sm">
            <li><button onClick={() => setCurrentTab('submit')} className="hover:text-[#ff1f4b] transition-colors">Submit a demo</button></li>
                      </ul>
        </div>

        {/* Col 4 */}
        <div>
          <h5 className="font-orbitron text-sm font-bold text-white uppercase tracking-wider mb-4">Community</h5>
          <ul className="space-y-2 text-sm">
            <li><a href={LABEL.discordInvite} target="_blank" rel="noopener noreferrer" className="hover:text-[#ff1f4b] transition-colors">Discord server</a></li>
            <li><a href={LABEL.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-[#ff1f4b] transition-colors">YouTube</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500">
        <p>&copy; {new Date().getFullYear()} Cyntron Records</p>
        <p className="mt-2 sm:mt-0">Made with ❤️ by Softmap</p>
      </div>
    </footer>
  );
};
