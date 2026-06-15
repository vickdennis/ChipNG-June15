import React from 'react';
import { Share, ExternalLink } from 'lucide-react';

export default function SmartphoneFrame() {
  const username = "creator";
  const userUrl = `chipng.com/${username}`;

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-slate-50 min-h-screen border-l border-slate-200">
      <div className="mb-6 flex items-center justify-between w-full max-w-[320px]">
        <div className="flex items-center gap-2 text-sm font-bold text-slate-600 bg-white px-3 py-1.5 rounded-full shadow-sm border border-slate-200">
          <span>{userUrl}</span>
          <a href="#" className="text-indigo-600 hover:text-indigo-700">
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
        <button className="p-2 bg-white rounded-full shadow-sm border border-slate-200 hover:bg-slate-50 text-slate-800 transition-colors">
          <Share className="w-4 h-4" />
        </button>
      </div>

      <div className="w-[320px] h-[650px] relative">
        {/* Hardware Frame */}
        <div className="absolute inset-0 border-[10px] border-black rounded-[2.5rem] shadow-2xl pointer-events-none z-10">
           {/* Notch */}
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl"></div>
        </div>

        {/* Inner Content Component (Live View) */}
        <div className="absolute inset-0 bg-[#0e1117] rounded-[2rem] overflow-y-auto style-scrollbar px-6 pt-16 pb-8 text-white relative flex flex-col items-center">
          <img src="https://i.pravatar.cc/150?img=47" className="w-24 h-24 rounded-full border-4 border-[#0e1117] shadow-lg mb-4" alt="Creator Profile" />
          <h2 className="text-xl font-bold mb-1">@{username}</h2>
          <p className="text-sm font-medium text-slate-400 mb-8 text-center">Digital creator & Builder. Exploring the world.</p>

          <div className="w-full space-y-4">
            <a href="#" className="flex items-center justify-between px-6 py-4 bg-slate-800 hover:bg-slate-700 transition-colors rounded-2xl w-full border border-slate-700">
              <span className="font-bold text-sm">Follow on X</span>
            </a>
            <a href="#" className="flex items-center justify-between px-6 py-4 bg-slate-800 hover:bg-slate-700 transition-colors rounded-2xl w-full border border-slate-700">
              <span className="font-bold text-sm">My YouTube Setup</span>
            </a>
            <a href="#" className="flex items-center justify-between px-6 py-4 bg-slate-800 hover:bg-slate-700 transition-colors rounded-2xl w-full border border-slate-700">
              <span className="font-bold text-sm">Join the Newsletter</span>
            </a>
          </div>

          <div className="mt-auto pt-8">
             <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">chip ng</span>
          </div>
        </div>
      </div>
    </div>
  );
}
