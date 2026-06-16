import React from 'react';
import { X } from 'lucide-react';

interface ManageSocialModalProps {
  isOpen: boolean;
  onClose: () => void;
  platform: string;
  links: any[];
  onRemove: (id: string) => void;
  onEdit: (link: any) => void;
  onAddAnother: () => void;
}

export default function ManageSocialModal({ isOpen, onClose, platform, links, onRemove, onEdit, onAddAnother }: ManageSocialModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-end justify-center font-sans">
      <div className="w-full max-w-md bg-black rounded-t-[2rem] border border-stone-800 shadow-2xl flex flex-col pt-6 pb-10 px-6 animate-in slide-in-from-bottom-full duration-300">
        
        {/* Header */}
        <div className="flex items-start justify-between mb-2">
          <h2 className="text-2xl font-bold text-white capitalize">{platform}</h2>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-900 flex items-center justify-center text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <p className="text-stone-400 text-sm mb-6 max-w-[90%] leading-relaxed">
          Review, edit, or remove existing entries for this platform.
        </p>

        {/* Counter & Action */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-stone-300 font-medium text-sm">{links.length} active link{links.length !== 1 ? 's' : ''}</span>
          <button onClick={onAddAnother} className="text-white font-bold text-sm tracking-wide">
            + Add another
          </button>
        </div>

        {/* List */}
        <div className="space-y-4">
          {links.map((link) => (
            <div key={link.id} className="bg-[#1C1C1E] rounded-3xl p-5 border border-white/5">
              <div className="flex items-center gap-4 mb-4">
                 {/* Icon Mock, ideally passed in */}
                 <div className={`w-10 h-10 shrink-0 flex items-center justify-center rounded-full overflow-hidden ${link.bgClass || 'bg-black/50'}`}>
                   {typeof link.icon === 'string' ? (
                     <img src={link.icon} className="w-6 h-6 object-contain" alt={platform} />
                   ) : (
                     React.createElement(link.icon as React.ElementType, { className: "w-6 h-6 text-white" })
                   )}
                 </div>
                 <div className="flex-1 min-w-0">
                   <div className="text-stone-400 text-xs font-bold uppercase tracking-wider mb-0.5">{platform}</div>
                   <div className="text-white text-sm font-medium truncate">{link.url}</div>
                 </div>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => onEdit(link)}
                  className="px-6 py-2 rounded-full border border-stone-700 text-white font-semibold text-sm hover:bg-stone-800 transition-colors"
                >
                  Edit
                </button>
                <button 
                  onClick={() => onRemove(link.id)}
                  className="px-6 py-2 rounded-full border border-red-900/40 bg-red-950/20 text-red-500 font-semibold text-sm hover:bg-red-900/30 transition-colors"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
