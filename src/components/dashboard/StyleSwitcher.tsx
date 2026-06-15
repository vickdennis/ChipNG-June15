import React from 'react';

const styles = [
  { id: 'default', name: 'Default', bg: 'bg-slate-100', bgClass: 'bg-slate-50' },
  { id: 'dark', name: 'Dark Mode', bg: 'bg-slate-900', bgClass: 'bg-[#0e1117]' },
  { id: 'glass', name: 'Glassmorphism', bg: 'bg-gradient-to-br from-indigo-500/20 to-purple-500/20', bgClass: 'bg-slate-900' },
  { id: 'minimal', name: 'Minimal', bg: 'bg-white border-2 border-slate-200', bgClass: 'bg-white' },
  { id: 'neon', name: 'Neon Cyber', bg: 'bg-gradient-to-r from-fuchsia-600 to-pink-600', bgClass: 'bg-black' },
];

export default function StyleSwitcher() {
  return (
    <div className="mb-10">
      <h3 className="text-sm font-bold text-slate-800 mb-4 px-2 uppercase tracking-wide">Appearance</h3>
      <div className="flex overflow-x-auto gap-4 pb-4 px-2 style-scrollbar">
        {styles.map((style) => (
          <button 
            key={style.id}
            className="flex flex-col items-center gap-3 shrink-0 group"
          >
            <div className={`w-20 h-28 rounded-xl ${style.bg} border-2 border-transparent group-hover:border-indigo-500 transition-all shadow-sm relative overflow-hidden flex flex-col items-center justify-center gap-2`}>
               <div className="w-12 h-2 rounded-full bg-black/10"></div>
               <div className="w-12 h-2 rounded-full bg-black/10"></div>
               <div className="w-12 h-2 rounded-full bg-black/10"></div>
            </div>
            <span className="text-xs font-bold text-slate-600 group-hover:text-slate-900">{style.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
