import React, { useState } from 'react';

const styles = [
  { id: 'default', name: 'Default', bg: 'bg-slate-50', lineClass: 'bg-slate-300' },
  { id: 'dark', name: 'Dark Mode', bg: 'bg-[#0f172a]', lineClass: 'bg-slate-800' },
  { id: 'glass', name: 'Glassmorphism', bg: 'bg-[#f4ebff]', lineClass: 'bg-[#d8b4fe]' },
  { id: 'minimal', name: 'Minimal', bg: 'bg-white', lineClass: 'bg-slate-200', border: 'border border-slate-200' },
  { id: 'neon', name: 'Neon Cyber', bg: 'bg-gradient-to-br from-[#d946ef] to-[#db2777]', lineClass: 'bg-[#be185d]' },
];

export default function StyleSwitcher() {
  const [activeTheme, setActiveTheme] = useState('default');

  return (
    <div className="mb-10 w-full overflow-hidden">
      <h3 className="text-sm font-bold text-slate-800 mb-4 px-2 uppercase tracking-wide">Appearance</h3>
      <div className="flex overflow-x-auto gap-4 pb-4 px-2 style-scrollbar -mx-2 px-2">
        {styles.map((style) => (
          <button 
            key={style.id}
            onClick={() => setActiveTheme(style.id)}
            className="flex flex-col items-center gap-3 shrink-0 group transition-transform hover:scale-[1.02]"
          >
            <div className={`w-[90px] h-[120px] rounded-2xl ${style.bg} ${style.border || 'border border-transparent'} relative flex flex-col items-center justify-center gap-3 transition-all ${activeTheme === style.id ? 'ring-2 ring-offset-2 ring-indigo-500' : 'ring-0 shadow-sm'}`}>
               <div className={`w-12 h-1.5 rounded-full ${style.lineClass}`}></div>
               <div className={`w-12 h-1.5 rounded-full ${style.lineClass}`}></div>
               <div className={`w-12 h-1.5 rounded-full ${style.lineClass}`}></div>
            </div>
            <span className={`text-[0.8rem] font-bold ${activeTheme === style.id ? 'text-slate-900' : 'text-slate-500 group-hover:text-slate-700'}`}>
              {style.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
