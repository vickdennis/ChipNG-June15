import React, { useState } from 'react';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';

export default function LoginFlow({ onBack, initialEmail = '', message = '' }: { onBack: () => void, initialEmail?: string, message?: string }) {
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const isFormValid = email.length > 3 && password.length >= 6;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    setLoading(true);
    setErrorMsg('');

    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setErrorMsg(error.message);
    } else if (data.session) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-[#0e1117] text-white flex flex-col pt-12 px-6">
      <div className="max-w-md w-full mx-auto flex-1 flex flex-col relative">
        <button onClick={onBack} className="p-2 -ml-2 mb-8 hover:bg-slate-800 rounded-full self-start transition-colors">
          <ArrowLeft className="w-6 h-6 text-slate-300" />
        </button>

        <h2 className="text-3xl font-black mb-8 tracking-tight">Welcome back</h2>

        <form onSubmit={handleLogin} className="flex-1 flex flex-col relative">
          <div className="space-y-6">
            <div>
              <label className="block text-slate-400 font-bold text-sm mb-2">Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                autoFocus
                className="w-full bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 rounded-xl px-5 py-4 text-lg focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-bold text-sm mb-2">Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 rounded-xl px-5 py-4 text-lg focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all pr-12"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5"/> : <Eye className="w-5 h-5"/>}
                </button>
              </div>
            </div>

            {message && !errorMsg && (
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                <p className="text-emerald-400 text-sm font-medium">{message}</p>
              </div>
            )}

            {errorMsg && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                <p className="text-red-400 text-sm font-medium">{errorMsg}</p>
              </div>
            )}
          </div>

          <div className="pb-8 pt-6 mt-auto">
            <button
              type="submit"
              disabled={!isFormValid || loading}
              className={`w-full py-4 rounded-full font-bold text-lg transition-all ${
                isFormValid && !loading
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-500/25' 
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              {loading ? 'Logging in...' : 'Log in'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
