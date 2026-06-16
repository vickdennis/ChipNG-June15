import React from 'react';
import { Share, ExternalLink, Check, ChevronLeft, Edit2, Plus } from 'lucide-react';
import SocialBar from './SocialBar';

interface SmartphoneFrameProps {
  socialLinks?: any[];
  onAddSocialClick?: () => void;
  onSocialLinkClick?: (link: any) => void;
  isPublicView?: boolean;
  profileName?: string;
}

export default function SmartphoneFrame({ socialLinks = [], onAddSocialClick, onSocialLinkClick, isPublicView = false, profileName }: SmartphoneFrameProps) {
  const username = profileName || "username";
  const displayName = profileName ? profileName.toUpperCase() : "Your Name";
  const userUrl = `chipng.com/${username}`;

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen bg-black ${!isPublicView ? '' : ''}`}>
      <div className={`w-full max-w-md h-full min-h-screen bg-black relative flex flex-col font-sans text-white`}>
          
          {/* Header Banner */}
          <div className="relative w-full h-64 bg-gradient-to-b from-slate-200 to-black shrink-0 flex flex-col items-center justify-center overflow-hidden">
             <div className="absolute inset-0 flex flex-col items-center justify-center opacity-70">
                <div className="text-[5rem] font-black tracking-tighter leading-none flex items-start text-black uppercase">
                  {username}
                </div>
                <div className="absolute top-4 right-8 w-24 h-24 border-8 border-sky-500 rounded-full border-r-transparent border-b-transparent transform rotate-45 opacity-80"></div>
                <div className="absolute top-8 right-12 w-16 h-16 border-8 border-sky-500 rounded-full border-r-transparent border-b-transparent transform rotate-45 opacity-80"></div>
                <div className="absolute top-12 right-16 w-8 h-8 border-8 border-sky-500 rounded-full border-r-transparent border-b-transparent transform rotate-45 opacity-80"></div>
             </div>

             {/* Banner Action Buttons */}
             {!isPublicView && (
               <>
                 <button className="absolute top-6 left-5 w-8 h-8 rounded-full bg-black/20 flex items-center justify-center hover:bg-black/40 transition-colors">
                   <ChevronLeft className="w-5 h-5 text-black/50" />
                 </button>
                 <button className="absolute top-6 right-5 w-8 h-8 rounded-full bg-black/20 flex items-center justify-center hover:bg-black/40 transition-colors">
                   <Check className="w-5 h-5 text-black/50" />
                 </button>
                 <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="bg-black/20 backdrop-blur-md px-4 py-2 rounded-full text-white text-xs font-semibold pointer-events-auto cursor-pointer hover:bg-black/30 transition-colors flex items-center gap-2">
                       Change Photo or Video
                    </div>
                 </div>
               </>
             )}
          </div>

          <div className="px-5 flex flex-col items-center relative z-10 -mt-6">
            <h1 className="text-[1.7rem] font-bold tracking-tight mb-0.5">{isPublicView ? displayName : 'Your Name'}</h1>
            <p className="text-[#888888] text-sm mb-4">{`@${username}`}</p>

            <SocialBar 
               links={socialLinks} 
               isEditable={!isPublicView}
               onAddClick={onAddSocialClick}
               onLinkClick={(link) => isPublicView ? window.open(link.url, '_blank') : onSocialLinkClick?.(link)}
            />

            {!isPublicView && (
              <div className="flex items-center gap-1 mt-4 mb-8 text-xs text-[#888888] tracking-wider">
                <span className="font-bold text-white">10.4K</span> Total Followers <span className="ml-1 opacity-50">▾</span>
              </div>
            )}
            {isPublicView && <div className="h-4"></div>}

            {/* Profile Content Base */}
            <div className="w-full space-y-4">
              {/* Bio Block */}
              {!isPublicView && (
                <div className="flex items-center justify-between px-2 mb-2">
                  <span className="text-sm font-bold text-stone-400">Restore Defaults</span>
                  <span className="text-sm font-bold bg-white text-black px-4 py-1.5 rounded-full">Show on Profile</span>
                </div>
              )}
              
              <div className="bg-[#1C1C1E] rounded-3xl p-5 border border-white/5 space-y-3">
                {isPublicView ? (
                   <p className="text-white text-[0.95rem] font-medium text-center py-2">Welcome to {displayName}'s profile</p>
                ) : (
                  <>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="grid grid-cols-2 gap-0.5 opacity-50">
                          <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                          <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                          <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                          <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                        </div>
                        <span className="font-bold text-white tracking-wide">Bio</span>
                      </div>
                      <button className="w-11 h-6 rounded-full bg-indigo-500 relative transition-colors cursor-pointer">
                        <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5 shadow-sm"></div>
                      </button>
                    </div>
                    <p className="text-white text-[0.95rem] font-medium text-center py-2">Welcome to {displayName}'s profile</p>
                  </>
                )}
              </div>

              {/* Email Block */}
              <div className={`bg-[#1C1C1E] rounded-3xl ${isPublicView ? 'p-2 flex gap-2' : 'p-5'} border border-white/5`}>
                {isPublicView ? (
                  <>
                    <input 
                      type="email" 
                      placeholder="your@email.com" 
                      className="bg-transparent text-white px-4 py-3 flex-1 focus:outline-none placeholder-blue-500/80 font-medium"
                    />
                    <button className="bg-stone-500/30 text-white font-bold text-sm px-5 rounded-full flex items-center gap-2 hover:bg-stone-500/50 transition-colors shrink-0">
                      Connect
                    </button>
                  </>
                ) : (
                  <>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="grid grid-cols-2 gap-0.5 opacity-50">
                          <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                          <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                          <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                          <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                        </div>
                        <span className="font-bold text-white tracking-wide">Email Contact Form</span>
                      </div>
                      <button className="w-11 h-6 rounded-full bg-indigo-500 relative transition-colors cursor-pointer">
                        <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5 shadow-sm"></div>
                      </button>
                    </div>
                    <p className="text-[#888888] text-xs leading-relaxed text-center px-4">Capture fan emails and grow your email list directly from your profile.</p>
                  </>
                )}
              </div>

               {/* Phone Block (Public View only) */}
               {isPublicView && (
                  <div className="bg-[#1C1C1E] rounded-3xl p-4 px-6 border border-white/5 flex items-center gap-4 cursor-pointer hover:bg-[#252528] transition-colors">
                     <span className="text-stone-400">📞</span>
                     <span className="text-white font-bold tracking-wide">08100764154</span>
                  </div>
               )}

              {/* Add Content Container */}
              {!isPublicView && (
                <div className="bg-[#1C1C1E] rounded-3xl p-5 border border-white/5 flex justify-between items-center h-24">
                   <div className="flex items-center gap-3">
                      <div className="grid grid-cols-2 gap-0.5 opacity-50">
                        <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                      </div>
                      <span className="font-bold text-white tracking-wide">Featured Links</span>
                   </div>
                   <button className="bg-gradient-to-r from-pink-500 to-orange-400 text-white font-bold text-xs uppercase tracking-wider px-6 py-2.5 rounded-full shadow-lg">
                      ADD CONTENT
                   </button>
                </div>
              )}
            </div>

            {/* Bottom Nav / Tabs mocked */}
            {isPublicView && (
              <>
                <div className="flex items-center justify-center gap-8 mt-8 border-b border-stone-800 pb-4 w-full">
                  <button className="text-white font-bold text-sm">Shouts</button>
                  <button className="text-stone-500 font-bold text-sm">Media</button>
                </div>
                <div className="w-full mt-6 bg-[#1a1a1c] border border-stone-800 rounded-3xl p-5 min-h-[150px] relative">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[0.6rem] text-black font-bold border-2 border-stone-800 shrink-0 uppercase">{username.substring(0,3)}</div>
                    <span className="text-stone-400 text-sm">What's happening?</span>
                  </div>
                  <button className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-gradient-to-tr from-orange-500 to-pink-500 flex items-center justify-center shadow-lg">
                    <Plus className="w-5 h-5 text-white" />
                  </button>
                </div>
              </>
            )}

            {!isPublicView && (
               <div className="mt-8 mb-4">
                  <span className="text-[10px] font-bold text-[#444444] uppercase tracking-[0.2em]">chip ng</span>
               </div>
            )}
          </div>
        </div>
      </div>
  );
}
