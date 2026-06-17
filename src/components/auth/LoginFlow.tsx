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

  const handleGoogleLogin = async () => {
    setErrorMsg('');
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin + '/dashboard'
      }
    });
    
    if (error) {
      setErrorMsg(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#0e1117] text-white flex flex-col pt-12 px-6">
      <div className="max-w-md w-full mx-auto flex-1 flex flex-col relative">
        <button onClick={onBack} className="p-2 -ml-2 mb-8 hover:bg-slate-800 rounded-full self-start transition-colors">
          <ArrowLeft className="w-6 h-6 text-slate-300" />
        </button>

        <h2 className="text-3xl font-black mb-8 tracking-tight">Welcome back</h2>

        <div className="space-y-4 mb-8">
          <button 
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 bg-white text-slate-900 hover:bg-slate-100 transition-colors py-4 px-6 rounded-full font-bold text-lg"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Sign in with Google
          </button>
        </div>

        <div className="relative flex items-center mb-8">
            <div className="flex-grow border-t border-slate-700"></div>
            <span className="flex-shrink-0 text-slate-500 px-4 text-sm font-bold">OR EMAIL</span>
            <div className="flex-grow border-t border-slate-700"></div>
        </div>

        <form onSubmit={handleLogin} className="flex-1 flex flex-col relative">
          <div className="space-y-6">
            <div>
              <label className="block text-slate-400 font-bold text-sm mb-2">Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
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
