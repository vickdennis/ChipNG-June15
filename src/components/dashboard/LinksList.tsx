import React, { useState } from 'react';
import { GripVertical, MoreHorizontal, Image as ImageIcon, Video, Trash2, Edit2 } from 'lucide-react';

const initialLinks = [
  { id: '1', title: 'Bio & Intro', url: 'A quick introduction about me and what I do.', type: 'bio', isVisible: true },
  { id: '2', title: 'Email Contact Form', url: 'Capture leads and inquiries.', type: 'contact', isVisible: true },
  { id: '3', title: 'Latest YouTube Video', url: 'https://youtube.com/watch?v=123', type: 'video', isVisible: true },
  { id: '4', title: 'Limited Edition Merch', url: 'https://shop.merch.com', type: 'merch', isVisible: true },
];

export default function LinksList() {
  const [links, setLinks] = useState(initialLinks);

  const toggleVisibility = (id: string) => {
    setLinks(links.map(l => l.id === id ? { ...l, isVisible: !l.isVisible } : l));
  };

  const removeLink = (id: string) => {
    setLinks(links.filter(l => l.id !== id));
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-bold text-slate-800 mb-4 px-2 uppercase tracking-wide">Your Links</h3>
      {links.map((link) => (
        <div key={link.id} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 flex items-center gap-4 group hover:shadow-md transition-shadow">
          <div className="cursor-grab text-slate-400 hover:text-slate-600 transition-colors">
            <GripVertical className="w-5 h-5" />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <input 
                type="text" 
                defaultValue={link.title} 
                className="font-bold text-slate-900 bg-transparent focus:outline-none focus:ring-1 focus:ring-indigo-500 rounded px-1 -mx-1 w-full truncate"
              />
            </div>
            <div className="flex items-center gap-2">
              <input 
                type="text" 
                defaultValue={link.url} 
                className="text-sm text-slate-500 bg-transparent focus:outline-none focus:ring-1 focus:ring-indigo-500 rounded px-1 -mx-1 w-full truncate"
              />
            </div>
            
            <div className="flex items-center gap-3 mt-4">
              <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors">
                <ImageIcon className="w-4 h-4" />
              </button>
              <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors">
                <Video className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex flex-col items-end justify-between self-stretch">
            <div className="flex items-center gap-2">
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={link.isVisible}
                  onChange={() => toggleVisibility(link.id)}
                />
                <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
              </label>
            </div>

            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors">
                <Edit2 className="w-4 h-4" />
              </button>
              <button onClick={() => removeLink(link.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
