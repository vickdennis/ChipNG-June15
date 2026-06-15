import { MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 py-12 text-slate-600">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-3">
            <span className="text-2xl font-black tracking-tight text-slate-900">CHIP NG</span>
            <p className="text-sm font-medium">&copy; {new Date().getFullYear()} CHIP NG. All rights reserved.</p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6 items-center text-sm font-bold text-slate-700">
            <a href="https://tiktok.com/@chipng_app" target="_blank" rel="noreferrer" className="hover:text-fuchsia-600 transition-colors flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-full border border-slate-200">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 15.68a6.32 6.32 0 0 0 11.14 4.22V7.49a8.1 8.1 0 0 0 3.45 1.56z"/>
              </svg>
              @chipng_app
            </a>
            <a href="tel:08100764154" className="hover:text-emerald-600 transition-colors flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-full border border-slate-200">
              <MessageCircle className="w-5 h-5" />
              Phone / WhatsApp: 08100764154
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
