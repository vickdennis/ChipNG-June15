import React, { useState } from 'react';
import { GripVertical, Video, Image as ImageIcon } from 'lucide-react';

const initialLinks = [
  { id: '1', title: 'Bio & Intro', url: 'A quick introduction about me and what I do.', type: 'bio', isVisible: true },
  { id: '2', title: 'Email Contact Form', url: 'Capture leads and inquiries.', type: 'contact', isVisible: true },
  { id: '3', title: 'Latest YouTube Video', url: 'https://youtube.com/watch?v=123', type: 'video', isVisible: true },
  { id: '4', title: 'Limited Edition Merch', url: 'https://shop.merch.com', type: 'merch', isVisible: true },
];

export default function LinksList({ 
  onEditBio, 
  onEditContact 
}: { 
  onEditBio: () => void, 
  onEditContact: () => void 
}) {
  const [links, setLinks] = useState(initialLinks);

  const toggleVisibility = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLinks(links.map(l => l.id === id ? { ...l, isVisible: !l.isVisible } : l));
  };

  const handleCardClick = (type: string) => {
    if (type === 'bio') {
      onEditBio();
    } else if (type === 'contact') {
      onEditContact();
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-bold text-slate-800 mb-4 px-2 uppercase tracking-wide">Your Links</h3>
      {links.map((link) => (
        <div 
          key={link.id} 
          onClick={() => handleCardClick(link.type)}
          className="bg-white rounded-[1.5rem] p-5 shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-slate-100 flex items-start gap-4 transition-all hover:shadow-[0_4px_15px_rgba(0,0,0,0.08)] cursor-pointer"
        >
          <div className="cursor-grab text-slate-400 hover:text-slate-600 transition-colors mt-1">
            <GripVertical className="w-5 h-5" />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="font-bold text-slate-900 mb-1 text-[1.05rem]">
              {link.title}
            </div>
            <div className="text-[0.9rem] text-slate-500 mb-3 truncate pr-4">
              {link.url}
            </div>
            
            <div className="flex items-center gap-3">
              <button 
                onClick={(e) => e.stopPropagation()}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                title="Add Image"
              >
                <ImageIcon className="w-4 h-4" />
              </button>
              <button 
                onClick={(e) => e.stopPropagation()}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                title="Add Video"
              >
                <Video className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex flex-col items-end">
            <button
               onClick={(e) => toggleVisibility(link.id, e)}
               className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${link.isVisible ? 'bg-emerald-500' : 'bg-slate-200'}`}
            >
               <span 
                 className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${link.isVisible ? 'translate-x-5' : 'translate-x-1'}`} 
               />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
