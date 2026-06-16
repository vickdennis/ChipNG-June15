import React, { useState } from 'react';
import { ChevronLeft, Menu, User } from 'lucide-react';

export default function EditBioModal({ isOpen, onClose, initialBio = '' }: { isOpen: boolean; onClose: () => void; initialBio?: string }) {
  const [bio, setBio] = useState(initialBio);
  const maxLength = 720;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black z-50 flex justify-center items-center font-sans selection:bg-indigo-500/30 selection:text-white">
      <div className="w-full h-full max-w-md bg-black flex flex-col relative overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6">
          <button onClick={onClose} className="w-10 h-10 rounded-full bg-stone-900 flex items-center justify-center text-white hover:bg-stone-800 transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-3">
            <button className="w-10 h-10 rounded-full bg-stone-900 flex items-center justify-center text-white hover:bg-stone-800 transition-colors">
              <Menu className="w-4 h-4" />
            </button>
            <button className="w-10 h-10 rounded-full bg-stone-900 flex items-center justify-center text-slate-400 hover:text-white hover:bg-stone-800 transition-colors">
              <User className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 flex-1 flex flex-col">
          <h2 className="text-2xl font-bold text-white mb-6">Edit Bio</h2>
          
          <div className="relative">
            <textarea 
              value={bio}
              onChange={(e) => setBio(e.target.value.substring(0, maxLength))}
              placeholder="Tell us a little bit about yourself..."
              className="w-full h-80 bg-[#111111] text-white placeholder-stone-600 rounded-3xl p-5 resize-none focus:outline-none focus:ring-1 focus:ring-stone-700 style-scrollbar"
            />
          </div>
          <div className="flex justify-end mt-2 px-2">
            <span className="text-stone-400 text-sm font-medium tracking-wide">
              {bio.length} / {maxLength}
            </span>
          </div>
        </div>

        {/* Footer sticky action */}
        <div className="p-6 pb-8 md:pb-6 mt-auto">
          <button 
            onClick={onClose}
            className="w-full bg-white text-black font-bold text-lg py-4 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:scale-[1.02] active:scale-[0.98] transition-transform"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
