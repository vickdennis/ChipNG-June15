import { SiTiktok, SiWhatsapp } from 'react-icons/si';
import BrandLogo from './BrandLogo';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 py-12 text-slate-600">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-3">
            <BrandLogo className="w-24 h-auto" />
            <p className="text-sm font-medium">&copy; {new Date().getFullYear()} CHIP NG. All rights reserved.</p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6 items-center text-sm font-bold text-slate-700">
            <a href="https://tiktok.com/@chipng_app" target="_blank" rel="noreferrer" className="hover:text-fuchsia-600 transition-colors flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-full border border-slate-200">
              {/* @ts-ignore */}
              <SiTiktok className="w-5 h-5" />
              @chipng_app
            </a>
            <a href="tel:08100764154" className="hover:text-emerald-600 transition-colors flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-full border border-slate-200 text-[#25D366]">
              {/* @ts-ignore */}
              <SiWhatsapp className="w-5 h-5 mx-auto" />
              Phone / WhatsApp
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
