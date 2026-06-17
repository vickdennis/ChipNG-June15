import React, { useState, useRef } from 'react';
import { Share, ExternalLink, Check, ChevronLeft, Edit2, Plus, Link2, Phone, GripVertical, Download, BadgeCheck } from 'lucide-react';
import SocialBar from './SocialBar';
import { getPlatformIcon } from '../../lib/platforms';
import BrandLogo from '../BrandLogo';

interface SmartphoneFrameProps {
  socialLinks?: any[];
  onAddSocialClick?: () => void;
  onSocialLinkClick?: (link: any) => void;
  isPublicView?: boolean;
  
  username?: string;
  displayName?: string;
  bio?: string;
  phone?: string;
  email?: string;
  address?: string;
  bgImage?: string | null;
  avatarImage?: string | null;
  isPro?: boolean;

  onEditClick?: () => void;
  onSaveClick?: () => void;
}

export default function SmartphoneFrame({ 
  socialLinks = [], 
  onAddSocialClick, 
  onSocialLinkClick, 
  isPublicView = false, 
  username = "username",
  displayName = "Your Name",
  bio = "Welcome to my profile",
  phone = "08100764154",
  email = "",
  address = "",
  bgImage = null,
  avatarImage = null,
  isPro = false,
  onEditClick, 
  onSaveClick 
}: SmartphoneFrameProps) {

  const downloadVCard = () => {
    const vcard = `BEGIN:VCARD\nVERSION:3.0\nFN:${displayName}\nTEL:${phone}\nEMAIL:${email}\nADR:;;${address};;;\nEND:VCARD`;
    const blob = new Blob([vcard], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${displayName.replace(/\s+/g, '_')}_Contact.vcf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const userUrl = `chipng.com/${username}`;

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen ${isPublicView ? 'bg-[#050505] p-0 sm:py-12 bg-grid-white/[0.02]' : 'bg-black'}`}>
      <div className={`w-full max-w-md h-full relative flex flex-col font-sans text-white ${isPublicView ? 'min-h-screen sm:min-h-[850px] bg-[#0a0a0a] sm:rounded-[40px] sm:shadow-2xl sm:ring-1 sm:ring-white/10 overflow-hidden shadow-black/50' : 'min-h-screen bg-black'}`}>
          
          {/* Navigation Header for View Mode */}
          {isPublicView && (
            <div className="flex items-center justify-between px-5 py-4 w-full bg-black shrink-0 relative z-20">
              <button 
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                onClick={() => {
                  navigator.clipboard.writeText(`https://chipng.com/${username}`);
                }}
              >
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
          <div 
            className={`${isPublicView ? '' : 'mt-4 '}relative w-full h-[220px] bg-gradient-to-b from-stone-800 to-black shrink-0 flex flex-col items-center justify-center overflow-visible`}
            style={bgImage ? { backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
          >
             {!bgImage && (
               <div className="absolute inset-0 flex flex-col items-center justify-center bg-stone-900 border-b border-stone-800">
                  <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
               </div>
             )}

             {/* Banner Action Buttons */}
             {!isPublicView && (
               <>
                 <button className="absolute top-6 left-5 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-black/60 transition-colors z-20" onClick={onSaveClick}>
                   <ChevronLeft className="w-5 h-5 text-white" />
                 </button>
                 <button className="absolute top-6 right-5 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-black/60 transition-colors z-20" onClick={onSaveClick}>
                   <Check className="w-5 h-5 text-white" />
                 </button>
                 <div className="absolute inset-x-0 bottom-12 flex items-center justify-center pointer-events-none">
                    <button onClick={onEditClick} className="bg-black/40 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/10 shadow-xl text-white text-sm font-semibold pointer-events-auto cursor-pointer hover:bg-black/60 transition-colors flex items-center gap-2">
                       Change Cover
                    </button>
                 </div>
               </>
             )}
          </div>

          <div className="px-5 flex flex-col items-center relative z-10 -mt-16">
             {/* Avatar Profile Picture */}
            <div className="relative mb-3 group cursor-pointer" onClick={onEditClick}>
              <div className="w-[120px] h-[120px] rounded-full border-[5px] border-[#0a0a0a] bg-stone-800 shadow-xl overflow-hidden flex items-center justify-center relative z-10">
                 {avatarImage ? (
                    <img src={avatarImage} alt="Profile" className="w-full h-full object-cover" />
                 ) : (
                    <span className="text-4xl font-bold text-white uppercase">{username.substring(0,2)}</span>
                 )}
                 {!isPublicView && (
                   <div className="absolute inset-0 bg-black/40 hidden group-hover:flex items-center justify-center transition-colors">
                      <Edit2 className="w-6 h-6 text-white" />
                   </div>
                 )}
              </div>
              {isPro && (
                <div className="absolute bottom-2 right-2 bg-black rounded-full p-[2px] shadow-sm z-20">
                  <BadgeCheck className="w-7 h-7 text-[#1d9bf0] fill-white" />
                </div>
              )}
            </div>

            {!isPublicView ? (
              <div 
                className="text-[1.7rem] font-bold tracking-tight mb-0.5 bg-transparent border-none text-center px-2 cursor-text flex items-center justify-center gap-1.5"
                onClick={onEditClick}
              >
                {displayName}
                {isPro && <BadgeCheck className="w-6 h-6 text-[#1d9bf0] ml-1 fill-white" />}
              </div>
            ) : (
              <h1 className="text-[1.7rem] font-bold tracking-tight mb-0.5 flex items-center justify-center gap-1.5">
                {displayName}
                {isPro && <BadgeCheck className="w-6 h-6 text-[#1d9bf0] ml-1 fill-white" />}
              </h1>
            )}

            {!isPublicView ? (
              <div className="flex items-center mb-4 cursor-text" onClick={onEditClick}>
                <span className="text-[#888888] text-sm">@</span>
                <span className="text-[#888888] text-sm bg-transparent px-1">{username}</span>
              </div>
            ) : (
              <p className="text-[#888888] text-sm mb-4">{`@${username}`}</p>
            )}

            {!isPublicView && (
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(`https://chipng.com/${username}`);
                }}
                className="mb-2 flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800 text-stone-300 hover:text-white hover:bg-slate-700 transition-colors text-xs font-semibold"
              >
                <Share className="w-3 h-3" />
                Share bio link
              </button>
            )}

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
              
              <div className={`${isPublicView ? 'bg-white/5 backdrop-blur-md border border-white/10' : 'bg-[#1C1C1E]'} rounded-[24px] p-5 ${!isPublicView ? 'flex items-start gap-4' : ''}`}>
                {!isPublicView && (
                  <div className="mt-1 cursor-grab text-stone-500 hover:text-white">
                     <GripVertical className="w-5 h-5" />
                  </div>
                )}
                <div className={`flex-1 ${!isPublicView ? 'space-y-3' : ''}`}>
                  {isPublicView ? (
                     <p className="text-stone-300 text-[1rem] leading-relaxed text-center py-2">{bio}</p>
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
                      <div className="text-[#888888] text-sm font-medium bg-transparent border-none w-full whitespace-pre-wrap cursor-text" onClick={onEditClick}>
                        {bio}
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Email Block */}
              <div className={`${isPublicView ? 'bg-white/5 backdrop-blur-md rounded-[24px] p-2 flex gap-2 w-full max-w-full border border-white/10 overflow-hidden' : 'bg-[#1C1C1E] rounded-3xl p-5 flex items-start gap-4'}`}>
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
                        className="bg-transparent text-white px-5 py-3 flex-1 w-full min-w-0 focus:outline-none placeholder-stone-500 font-medium"
                      />
                      <button className="bg-white text-black font-bold text-[0.95rem] px-6 py-3 rounded-[20px] flex items-center gap-2 hover:bg-stone-200 transition-colors shrink-0">
                        Subscribe
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

               {/* Phone Block */}
              <div className={`${isPublicView ? 'bg-white/5 backdrop-blur-md border border-white/10 rounded-[28px]' : 'bg-[#1C1C1E] rounded-3xl'} ${isPublicView ? 'p-5 flex items-center justify-between cursor-pointer hover:bg-white/10 transition-colors gap-4' : 'p-5 flex items-start gap-4'}`} onClick={isPublicView ? downloadVCard : undefined}>
                {!isPublicView ? (
                  <>
                    <div className="mt-1 cursor-grab text-stone-500 hover:text-white">
                      <GripVertical className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-white tracking-wide">Contact Information</span>
                        </div>
                        <button className="w-12 h-7 rounded-full bg-[#8B5CF6] relative transition-colors cursor-pointer border-2 border-transparent">
                          <div className="w-6 h-6 bg-white rounded-full absolute right-0 top-0 shadow-sm"></div>
                        </button>
                      </div>
                      <div 
                         className="text-[#888888] text-sm font-medium bg-transparent w-full mt-2 cursor-text"
                         onClick={onEditClick}
                      >
                         {phone || "Phone number"}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                     <div className="flex items-center gap-4">
                       <Phone className="w-5 h-5 text-stone-400" />
                       <span className="text-white font-bold tracking-wide">{phone}</span>
                     </div>
                     <button className="text-sm font-semibold text-[#FF9966] bg-[#FF9966]/10 px-3 py-1.5 rounded-full flex items-center gap-1 hover:bg-[#FF9966]/20 transition-colors shrink-0">
                       <Download className="w-4 h-4" /> Save Contact
                     </button>
                  </>
                )}
              </div>

              {/* Add Content Container */}
              {!isPublicView && (
                <div className="bg-[#1C1C1E] rounded-3xl p-5 flex items-center gap-4">
                   <div className="mt-1 cursor-grab text-stone-500 hover:text-white">
                      <GripVertical className="w-5 h-5" />
                   </div>
                   <div className="flex-1 flex justify-between items-center">
                     <span className="font-bold text-white tracking-wide text-lg">Featured Links</span>
                     <button className="bg-gradient-to-r from-[#FF5E62] to-[#FF9966] text-white font-bold text-sm uppercase tracking-wider px-6 py-3 rounded-full shadow-lg" onClick={onAddSocialClick}>
                        ADD CONTENT
                     </button>
                   </div>
                </div>
              )}

              {/* Big List of Links like Link.me */}
              {isPublicView && socialLinks.length > 0 && (
                <div className="flex flex-col gap-3 mt-4">
                  {socialLinks.map((link) => (
                    <button 
                      key={link.id} 
                      onClick={() => window.open(link.url, '_blank')}
                      className={`w-full group rounded-full py-4 px-6 flex items-center justify-between transition-transform hover:scale-[1.02] active:scale-[0.98] bg-white text-black font-semibold shadow-xl border border-white/10 relative overflow-hidden`}
                    >
                      <div className="flex items-center gap-4 relative z-10 w-full justify-center">
                        <div className="absolute left-0 w-8 h-8 rounded-full flex items-center justify-center bg-black/5">
                           {React.createElement(link.icon || getPlatformIcon(link.platform), { className: "w-5 h-5 text-black" })}
                        </div>
                        <span className="text-lg tracking-wide capitalize">{link.platform}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Bottom Nav / Tabs mocked */}
            {isPublicView && (
              <>
                 <div className="flex items-center justify-center gap-8 mt-12 border-b border-white/10 pb-4 w-full">
                  <button className="text-white font-bold text-sm tracking-wide">SHOUTS</button>
                  <button className="text-stone-500 font-bold text-sm tracking-wide hover:text-stone-300 transition-colors">MEDIA</button>
                </div>
                <div className="w-full mt-6 bg-white/5 border border-white/10 rounded-[28px] p-6 min-h-[150px] relative backdrop-blur-md mb-8">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-[0.6rem] text-white font-black shrink-0 uppercase shadow-lg border border-white/20">{username.substring(0,3)}</div>
                    <span className="text-stone-400 text-sm font-medium">What's happening?</span>
                  </div>
                  <button className="absolute bottom-5 right-5 w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-xl hover:scale-105 transition-transform">
                    <Plus className="w-6 h-6 text-black" />
                  </button>
                </div>
                
                {/* Clean watermark */}
                {!isPro && (
                  <div className="pb-8 pt-4 flex flex-col items-center justify-center opacity-40 hover:opacity-100 transition-opacity">
                    <span className="text-[9px] font-black text-white mb-2 uppercase tracking-[0.2em]">POWERED BY</span>
                    <BrandLogo className="w-20 h-auto" />
                  </div>
                )}
              </>
            )}

            {!isPublicView && (
               <div className="mt-8 mb-4 opacity-50 flex items-center justify-center">
                  <BrandLogo className="w-20 h-auto" />
               </div>
            )}
          </div>
        </div>
      </div>
  );
}
