import { useState } from 'react';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { supabase } from '../../supabaseClient';

export default function OnboardingFlow({ onBack, onComplete, onSignupSuccess }: { onBack: () => void, onComplete: () => void, onSignupSuccess: (email: string, msg: string) => void }) {
  const [step, setStep] = useState(1);
  const totalSteps = 3;
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const updateForm = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.email.length >= 5 && formData.email.includes('@');
      case 2:
        return formData.password.length >= 8;
      case 3:
        return formData.username.length >= 3;
      default:
        return false;
    }
  };

  const handleNext = async () => {
    if (isStepValid()) {
      setErrorMsg('');
      if (step < totalSteps) {
        setStep(prev => prev + 1);
      } else {
        setLoading(true);
        const { data, error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              username: formData.username
            }
          }
        });
        setLoading(false);

        if (error) {
          setErrorMsg(error.message);
        } else {
          if (!data.session) {
            onSignupSuccess(formData.email, "Check your email and confirm your account before logging in.");
          } else {
            onComplete();
          }
        }
      }
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(prev => prev - 1);
    } else {
      onBack();
    }
  };

  const progress = (step / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-[#0e1117] text-white flex flex-col pt-12 px-6">
      <div className="max-w-md w-full mx-auto flex-1 flex flex-col">
        <div className="flex items-center mb-8 gap-4">
          <button onClick={handlePrev} className="p-2 -ml-2 hover:bg-slate-800 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6 text-slate-300" />
          </button>
          
          <div className="flex-1 right-0 h-2 bg-slate-800 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-indigo-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <span className="text-slate-500 font-bold text-sm">{step}/{totalSteps}</span>
        </div>

        <h2 className="text-3xl font-black mb-8 tracking-tight">Create your account</h2>

        <div className="flex-1 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              {step === 1 && (
                <div>
                  <label className="block text-slate-400 font-bold text-sm mb-2">Email address</label>
                  <input 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => updateForm('email', e.target.value)}
                    placeholder="Enter your email"
                    autoFocus
                    className="w-full bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 rounded-xl px-5 py-4 text-lg focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                  />
                  <p className="mt-3 text-sm text-slate-500 font-medium">We'll use this to secure your account.</p>
                </div>
              )}

              {step === 2 && (
                <div>
                  <label className="block text-slate-400 font-bold text-sm mb-2">Password</label>
                  <div className="relative">
                    <input 
                      type={showPassword ? "text" : "password"} 
                      value={formData.password}
                      onChange={(e) => updateForm('password', e.target.value)}
                      placeholder="Create a strong password"
                      autoFocus
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
                  <p className="mt-3 text-sm text-slate-500 font-medium">Must be at least 8 characters.</p>
                </div>
              )}

              {step === 3 && (
                <div>
                  <label className="block text-slate-400 font-bold text-sm mb-2">Choose a Username</label>
                  <div className="relative flex items-center">
                    <span className="absolute left-5 text-slate-500 font-bold text-lg">chip.ng/</span>
                    <input 
                      type="text" 
                      value={formData.username}
                      onChange={(e) => updateForm('username', e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                      placeholder="username"
                      autoFocus
                      className="w-full bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 rounded-xl py-4 pr-5 pl-24 text-lg focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                    />
                  </div>
                  <p className="mt-3 text-sm text-slate-500 font-medium">You can always change this later.</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {errorMsg && (
          <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
            <p className="text-red-400 text-sm font-medium">{errorMsg}</p>
          </div>
        )}

        <div className="pb-8 pt-4">
          <button
            onClick={handleNext}
            disabled={!isStepValid() || loading}
            className={`w-full py-4 rounded-full font-bold text-lg transition-all ${
              isStepValid() && !loading
                ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-500/25' 
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            {loading ? 'Creating...' : step === totalSteps ? 'Create Account' : 'CONTINUE'}
          </button>
        </div>
      </div>
    </div>
  );
}
