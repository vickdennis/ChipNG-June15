import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';
import { platformCategories } from '../../lib/platforms';

export default function AddLinkDrawer({ isOpen, onClose, onSave }: { isOpen: boolean; onClose: () => void; onSave?: (platform: any, handle: string) => void }) {
  const [selectedPlatform, setSelectedPlatform] = useState<any | null>(null);
  const [handle, setHandle] = useState('');
  const [expandedCats, setExpandedCats] = useState<Record<string, boolean>>({
    SOCIAL: true,
    BUSINESS: true,
    MUSIC: true,
    PAYMENT: true,
    'LIFESTYLE & ENTERTAINMENT': true,
  });

  const [searchQuery, setSearchQuery] = useState('');

  const toggleCategory = (catName: string) => {
    setExpandedCats(prev => ({ ...prev, [catName]: !prev[catName] }));
  };

  const handleClose = () => {
    if (selectedPlatform) {
      setSelectedPlatform(null);
      setHandle('');
    } else {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/40 z-40 md:hidden" 
        onClick={handleClose}
      />
      <div className="fixed md:absolute bottom-0 md:top-0 right-0 left-0 md:left-auto w-full md:w-[400px] h-[85vh] md:h-full bg-[#0e1117] md:border-l border-slate-800 z-50 flex flex-col md:rounded-none rounded-t-3xl shadow-2xl transition-transform transform">
        {selectedPlatform ? (
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-6 shrink-0 relative">
              <h2 className="text-xl font-bold text-white text-center w-full">Add {selectedPlatform.name}</h2>
              <button onClick={handleClose} className="absolute right-6 text-slate-400 hover:text-white transition-colors">
                ✕
              </button>
            </div>

            <div className="flex-1 flex flex-col items-center px-6 pt-8 pb-12 overflow-y-auto style-scrollbar">
              <div className={`w-28 h-28 rounded-[2rem] flex items-center justify-center ${selectedPlatform.bgClass} shadow-xl shadow-black/20 mb-12`}>
                <selectedPlatform.icon className="w-14 h-14 text-white" />
              </div>

              <div className="w-full mb-1">
                <div className="flex items-center bg-[#1a1d24] rounded-2xl p-1 px-4 mb-2">
                  <span className="text-white font-medium mr-3">Link</span>
                  <input
                    type="text"
                    value={handle}
                    onChange={(e) => setHandle(e.target.value)}
                    placeholder={`+ Add ${selectedPlatform.name} username`}
                    className="flex-1 bg-transparent border-none text-white focus:outline-none placeholder-slate-500 py-3"
                    autoFocus
                  />
                </div>
                <p className="text-slate-400 text-sm ml-2">{selectedPlatform.baseUrl}</p>
              </div>

              <div className="mt-auto w-full pt-8">
                <button 
                  className={`w-full py-4 rounded-full font-bold text-white shadow-lg ${selectedPlatform.bgClass} hover:opacity-90 transition-opacity tracking-wider`}
                  onClick={() => {
                    if (onSave && handle) {
                      onSave(selectedPlatform, handle);
                    }
                    handleClose();
                  }}
                >
                  SAVE LINK
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between p-6 border-b border-slate-800 shrink-0">
              <h2 className="text-xl font-bold text-white">Add A New Link</h2>
              <button onClick={handleClose} className="text-slate-400 hover:text-white transition-colors">
                ✕
              </button>
            </div>

            <div className="p-4 shrink-0">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input 
                  type="text" 
                  placeholder="Search platforms, then drop in your handle."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-full py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-medium placeholder-slate-500"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-4 pb-12 style-scrollbar">
              {platformCategories.map((cat) => {
                const isExpanded = expandedCats[cat.name];
                const filteredPlatforms = cat.platforms.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
                
                if (searchQuery && filteredPlatforms.length === 0) return null;

                return (
                  <div key={cat.name} className="mb-6">
                    <button 
                      onClick={() => toggleCategory(cat.name)}
                      className="flex items-center justify-between w-full py-3 text-slate-300 hover:text-white transition-colors"
                    >
                      <span className="font-bold text-sm tracking-wider">{cat.name}</span>
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>
                    
                    {isExpanded && (
                      <div className="grid grid-cols-4 gap-4 mt-3">
                        {(searchQuery ? filteredPlatforms : cat.platforms).map((platform) => {
                          const Icon = platform.icon as any;
                          return (
                            <button 
                              key={platform.name} 
                              className="flex flex-col items-center gap-2 group"
                              onClick={() => setSelectedPlatform(platform)}
                            >
                              <div className={`w-14 h-14 rounded-full flex items-center justify-center ${platform.bgClass} shadow-lg shadow-black/20 group-hover:scale-110 transition-transform`}>
                                <Icon className="w-7 h-7 text-white" />
                              </div>
                              <span className="text-xs font-medium text-slate-400 group-hover:text-slate-300 text-center truncate w-full">
                                {platform.name}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </>
  );
}
