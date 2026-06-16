import React from 'react';
import { Share, ExternalLink, Check, ChevronLeft, Edit2, Plus, Link2, Phone, GripVertical } from 'lucide-react';
import SocialBar from './SocialBar';

interface SmartphoneFrameProps {
  socialLinks?: any[];
  onAddSocialClick?: () => void;
  onSocialLinkClick?: (link: any) => void;
  isPublicView?: boolean;
  profileName?: string;
  onEditClick?: () => void;
  onSaveClick?: () => void;
}

export default function SmartphoneFrame({ socialLinks = [], onAddSocialClick, onSocialLinkClick, isPublicView = false, profileName, onEditClick, onSaveClick }: SmartphoneFrameProps) {
  const username = profileName || "username";
  const displayName = profileName ? profileName.toUpperCase() : "Your Name";
  const userUrl = `chipng.com/${username}`;

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen bg-black ${!isPublicView ? '' : ''}`}>
      <div className={`w-full max-w-md h-full min-h-screen bg-black relative flex flex-col font-sans text-white`}>
          
          {/* Navigation Header for View Mode */}
          {isPublicView && (
            <div className="flex items-center justify-between px-5 py-4 w-full bg-black shrink-0 relative z-20">
              <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors">
                <Link2 className="w-4 h-4" />
                <span className="text-sm font-semibold">Bio Link</span>
              </button>
              <div className="absolute left-1/2 -translate-x-1/2 text-stone-300 font-semibold text-[0.95rem]">
                Profile
              </div>
              {onEditClick ? (
                <button 
                  onClick={onEditClick}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                  <span className="text-sm font-semibold">Edit</span>
                </button>
              ) : (
                <div className="w-[88px]" /> /* spacer */
              )}
            </div>
          )}

          {/* Header Banner */}
          <div className={`${isPublicView ? 'mt-4 ' : ''}relative w-full h-64 bg-gradient-to-b from-slate-200 to-black shrink-0 flex flex-col items-center justify-center overflow-hidden`}>
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
                 <button className="absolute top-6 left-5 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors z-20" onClick={onSaveClick}>
                   <ChevronLeft className="w-5 h-5 text-white/70" />
                 </button>
                 <button className="absolute top-6 right-5 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors z-20" onClick={onSaveClick}>
                   <Check className="w-5 h-5 text-white/70" />
                 </button>
                 <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="bg-black/20 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/10 shadow-xl text-white text-sm font-semibold pointer-events-auto cursor-pointer hover:bg-black/40 transition-colors flex items-center gap-2">
                       Change Photo or Video
                    </div>
                 </div>
                 {/* Blue concentric waves */}
                 <div className="absolute -top-12 -right-12 w-64 h-64 pointer-events-none opacity-40">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-[12px] border-[#3b82f6] rounded-full"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-[12px] border-[#3b82f6] rounded-full"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 border-[12px] border-[#3b82f6] rounded-full"></div>
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
                <div className="flex items-center justify-between px-2 mb-2 mt-6">
                  <span className="text-sm font-bold text-stone-400 hover:text-white cursor-pointer transition-colors">Restore Defaults</span>
                  <button className="text-sm font-bold bg-white text-black px-5 py-1.5 rounded-full hover:bg-stone-200 transition-colors">Show on Profile</button>
                </div>
              )}
              
              <div className={`bg-[#1C1C1E] rounded-3xl p-5 ${!isPublicView ? 'flex items-start gap-4' : ''}`}>
                {!isPublicView && (
                  <div className="mt-1 cursor-grab text-stone-500 hover:text-white">
                    <GripVertical className="w-5 h-5" />
                  </div>
                )}
                <div className={`flex-1 ${!isPublicView ? 'space-y-3' : ''}`}>
                  {isPublicView ? (
                     <p className="text-white text-[0.95rem] font-medium text-center py-2">Welcome to {displayName}'s profile</p>
                  ) : (
                    <>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-white tracking-wide">Bio</span>
                        </div>
                        <button className="w-12 h-7 rounded-full bg-[#8B5CF6] relative transition-colors cursor-pointer border-2 border-transparent">
                          <div className="w-6 h-6 bg-white rounded-full absolute right-0 top-0 shadow-sm"></div>
                        </button>
                      </div>
                      <p className="text-[#888888] text-sm font-medium">Welcome to {displayName}'s profile</p>
                    </>
                  )}
                </div>
              </div>

              {/* Email Block */}
              <div className={`${isPublicView ? 'bg-white rounded-full p-2 flex gap-2 w-full max-w-full overflow-hidden' : 'bg-[#1C1C1E] rounded-3xl p-5 flex items-start gap-4'}`}>
                {!isPublicView && (
                  <div className="mt-1 cursor-grab text-stone-500 hover:text-white">
                    <GripVertical className="w-5 h-5" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  {isPublicView ? (
                    <div className="flex items-center w-full">
                      <input 
                        type="email" 
                        placeholder="your@email.com" 
                        className="bg-transparent text-[#3b82f6] px-5 py-3 flex-1 w-full min-w-0 focus:outline-none placeholder-[#3b82f6] font-medium"
                      />
                      <button className="bg-[#4a4a4a] text-white font-bold text-[0.95rem] px-6 py-3 rounded-full flex items-center gap-2 hover:bg-[#333] transition-colors shrink-0">
                        Connect with <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center shrink-0" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-white tracking-wide">Email Contact Form</span>
                        </div>
                        <button className="w-12 h-7 rounded-full bg-[#8B5CF6] relative transition-colors cursor-pointer border-2 border-transparent">
                          <div className="w-6 h-6 bg-white rounded-full absolute right-0 top-0 shadow-sm"></div>
                        </button>
                      </div>
                      <p className="text-[#888888] text-sm leading-relaxed pr-8">Capture fan emails and grow your email list directly from your profile.</p>
                    </>
                  )}
                </div>
              </div>

               {/* Phone Block (Public View only) */}
               {isPublicView && (
                  <div className="bg-[#1C1C1E] rounded-3xl p-5 border border-white/5 flex items-center gap-4 cursor-pointer hover:bg-[#252528] transition-colors">
                     <Phone className="w-5 h-5 text-stone-400" />
                     <span className="text-white font-bold tracking-wide">08100764154</span>
                  </div>
               )}

              {/* Add Content Container */}
              {!isPublicView && (
                <div className="bg-[#1C1C1E] rounded-3xl p-5 flex items-center gap-4">
                   <div className="mt-1 cursor-grab text-stone-500 hover:text-white">
                      <GripVertical className="w-5 h-5" />
                   </div>
                   <div className="flex-1 flex justify-between items-center">
                     <span className="font-bold text-white tracking-wide text-lg">Featured Links</span>
                     <button className="bg-gradient-to-r from-[#FF5E62] to-[#FF9966] text-white font-bold text-sm uppercase tracking-wider px-6 py-3 rounded-full shadow-lg">
                        ADD CONTENT
                     </button>
                   </div>
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
