import { ArrowLeft, Mail, Smartphone } from 'lucide-react';

export default function AuthStart({ onContinue, onBack }: { onContinue: (method: string) => void, onBack: () => void }) {
  return (
    <div className="min-h-screen bg-[#0e1117] text-white flex flex-col pt-12 px-6 pb-8">
      <div className="max-w-md w-full mx-auto flex-1 flex flex-col relative">
        <button onClick={onBack} className="p-2 -ml-2 mb-8 hover:bg-slate-800 rounded-full self-start transition-colors">
          <ArrowLeft className="w-6 h-6 text-slate-300" />
        </button>

        <h1 className="text-3xl font-black mb-4 tracking-tight">CHIP NG</h1>
        <p className="text-2xl font-bold text-slate-300 mb-12 leading-tight">
          Join the best link in bio powering the greatest people in the world.
        </p>

        <div className="space-y-4 mb-auto">
          <button 
            onClick={() => onContinue('email')}
            className="w-full flex items-center justify-center gap-3 bg-slate-800 hover:bg-slate-700 transition-colors py-4 px-6 rounded-full font-bold text-lg"
          >
            <Smartphone className="w-5 h-5 opacity-70" />
            <span className="opacity-70">|</span>
            <Mail className="w-5 h-5 opacity-70" />
            Use phone or email
          </button>

          <button 
            onClick={() => onContinue('google')}
            className="w-full flex items-center justify-center gap-3 bg-white text-slate-900 hover:bg-slate-100 transition-colors py-4 px-6 rounded-full font-bold text-lg"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>
        </div>

        <div className="mt-12 text-center">
          <p className="text-slate-400 text-sm mb-6">
            By continuing, you agree to our <a href="#terms" className="underline hover:text-white">Terms of Service</a> and acknowledge you've read our <a href="#privacy" className="underline hover:text-white">Privacy Policy</a>.
          </p>
          <p className="text-slate-300 font-medium">
            Already have an account? <button className="text-white font-bold ml-1 hover:underline">Log in</button>
          </p>
        </div>
      </div>
    </div>
  );
}
