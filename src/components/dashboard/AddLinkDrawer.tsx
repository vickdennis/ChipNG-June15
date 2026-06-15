import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';
import {
  SiInstagram, SiSnapchat, SiFacebook, SiX, SiYoutube,
  SiTelegram, SiWhatsapp, SiCalendly,
  SiApplemusic, SiSpotify, SiSoundcloud, SiYoutubemusic, SiAudiomack,
  SiPaypal, SiVenmo, SiCashapp, SiZelle,
  SiPlaystation, SiSteam, SiTwitch, SiKick
} from 'react-icons/si';
import { FaLinkedin, FaSkype, FaXbox } from 'react-icons/fa';

const platformCategories = [
  {
    name: 'SOCIAL',
    platforms: [
      { name: 'Instagram', icon: SiInstagram, bgClass: 'bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888]' },
      { name: 'Snapchat', icon: SiSnapchat, bgClass: 'bg-[#FFFC00]' },
      { name: 'Facebook', icon: SiFacebook, bgClass: 'bg-[#1877F2]' },
      { name: 'X', icon: SiX, bgClass: 'bg-[#000000]' },
      { name: 'YouTube', icon: SiYoutube, bgClass: 'bg-[#FF0000]' },
    ]
  },
  {
    name: 'BUSINESS',
    platforms: [
      { name: 'LinkedIn', icon: FaLinkedin, bgClass: 'bg-[#0A66C2]' },
      { name: 'Skype', icon: FaSkype, bgClass: 'bg-[#00AFF0]' },
      { name: 'Telegram', icon: SiTelegram, bgClass: 'bg-[#26A5E4]' },
      { name: 'WhatsApp', icon: SiWhatsapp, bgClass: 'bg-[#25D366]' },
      { name: 'Calendly', icon: SiCalendly, bgClass: 'bg-[#006BFF]' },
    ]
  },
  {
    name: 'MUSIC',
    platforms: [
      { name: 'Apple Music', icon: SiApplemusic, bgClass: 'bg-gradient-to-br from-[#FA243C] to-[#FA243C]' },
      { name: 'Spotify', icon: SiSpotify, bgClass: 'bg-[#1DB954]' },
      { name: 'SoundCloud', icon: SiSoundcloud, bgClass: 'bg-[#FF3300]' },
      { name: 'YouTube Music', icon: SiYoutubemusic, bgClass: 'bg-[#FF0000]' },
      { name: 'Audiomack', icon: SiAudiomack, bgClass: 'bg-[#FFA200]' },
    ]
  },
  {
    name: 'PAYMENT',
    platforms: [
      { name: 'PayPal', icon: SiPaypal, bgClass: 'bg-[#00457C]' },
      { name: 'Venmo', icon: SiVenmo, bgClass: 'bg-[#008CFF]' },
      { name: 'CashApp', icon: SiCashapp, bgClass: 'bg-[#00D632]' },
      { name: 'Zelle', icon: SiZelle, bgClass: 'bg-[#741DF2]' },
    ]
  },
  {
    name: 'LIFESTYLE & ENTERTAINMENT',
    platforms: [
      { name: 'PlayStation', icon: SiPlaystation, bgClass: 'bg-[#003791]' },
      { name: 'Xbox', icon: FaXbox, bgClass: 'bg-[#107C10]' },
      { name: 'Steam', icon: SiSteam, bgClass: 'bg-[#000000]' },
      { name: 'Twitch', icon: SiTwitch, bgClass: 'bg-[#9146FF]' },
      { name: 'Kick', icon: SiKick, bgClass: 'bg-[#53FC18]' },
    ]
  }
];

export default function AddLinkDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
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

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/40 z-40 md:hidden" 
        onClick={onClose}
      />
      <div className="fixed md:absolute bottom-0 md:top-0 right-0 left-0 md:left-auto w-full md:w-[400px] h-[85vh] md:h-full bg-[#0e1117] md:border-l border-slate-800 z-50 flex flex-col md:rounded-none rounded-t-3xl shadow-2xl transition-transform transform">
        <div className="flex items-center justify-between p-6 border-b border-slate-800 shrink-0">
          <h2 className="text-xl font-bold text-white">Add A New Link</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
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
                      const Icon = platform.icon;
                      // Snapchat and Kick need dark icons for contrast if bg is entirely light,
                      // but user requested solid white. We will stick to white for everything except if explicitly bad.
                      // Wait, snapchat yellow with white icon might be invisible, but the prompt says:
                      // "logo inside the circle must be solid white... exceptions: gradients"
                      return (
                        <button key={platform.name} className="flex flex-col items-center gap-2 group">
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
      </div>
    </>
  );
}
