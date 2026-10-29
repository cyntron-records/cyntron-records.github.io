import React, { useState } from 'react';
import { api } from '../api';
import { X, Lock, Mail, User, Shield, Radio } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: any, token: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = isRegister
        ? await api('/api/auth/register', { method: 'POST', body: { name, email, password } })
        : await api('/api/auth/login', { method: 'POST', body: { email, password } });

      onLoginSuccess(data.user, data.token);
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#0b0507] border border-[#ff1f4b]/40 rounded-2xl w-full max-w-md p-6 sm:p-8 relative glow-red shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white p-1"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ff1f4b] to-[#99001a] mx-auto mb-3 p-0.5 glow-red flex items-center justify-center">
            <Radio className="w-6 h-6 text-white" />
          </div>
          <h3 className="font-orbitron font-bold text-xl text-white">
            {isRegister ? 'Artist Portal Registration' : 'Cyntron Neural Login'}
          </h3>
          <p className="text-xs text-gray-400 mt-1">
            {isRegister ? 'Join our roster & submit your demo tracks' : 'Access your artist profile or A&R dashboard'}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-[#ff1f4b]/10 border border-[#ff1f4b]/30 rounded-xl text-xs text-[#ff1f4b]">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <div>
              <label className="block text-xs font-orbitron text-gray-300 uppercase mb-1">Artist / Producer Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. CyberPulse"
                  className="w-full bg-[#14080b] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#ff1f4b]"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-orbitron text-gray-300 uppercase mb-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@domain.com"
                className="w-full bg-[#14080b] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#ff1f4b]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-orbitron text-gray-300 uppercase mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#14080b] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#ff1f4b]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#ff1f4b] to-[#99001a] text-white font-orbitron text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-all glow-red disabled:opacity-50 mt-2"
          >
            {loading ? 'Authenticating...' : isRegister ? 'Register Artist Account' : 'Authenticate Session'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => setIsRegister(!isRegister)}
            className="text-xs text-gray-400 hover:text-[#ff1f4b] transition-colors"
          >
            {isRegister ? 'Already have an account? Sign in' : "Don't have an artist account? Register now"}
          </button>
        </div>
      </div>
    </div>
  );
};
