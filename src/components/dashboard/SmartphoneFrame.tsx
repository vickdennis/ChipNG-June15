import React, { useState, useRef } from 'react';
import { Share, ExternalLink, Check, ChevronLeft, Edit2, Plus, Link2, Phone, GripVertical, Download } from 'lucide-react';
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
  const defaultUsername = profileName || "username";
  const defaultDisplayName = profileName ? profileName.toUpperCase() : "Your Name";
  
  const [username, setUsername] = useState(defaultUsername);
  const [displayName, setDisplayName] = useState(defaultDisplayName);
  const [bio, setBio] = useState(`Welcome to ${defaultDisplayName}'s profile`);
  const [phone, setPhone] = useState('08100764154');
  const [bgImage, setBgImage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setBgImage(url);
    }
  };

  const downloadVCard = () => {
    const vcard = `BEGIN:VCARD\nVERSION:3.0\nFN:${displayName}\nTEL:${phone}\nEND:VCARD`;
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
    <div className={`flex flex-col items-center justify-center min-h-screen bg-black ${!isPublicView ? '' : ''}`}>
      <div className={`w-full max-w-md h-full min-h-screen bg-black relative flex flex-col font-sans text-white`}>
          
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
            className={`${isPublicView ? 'mt-4 ' : ''}relative w-full h-64 bg-gradient-to-b from-slate-200 to-black shrink-0 flex flex-col items-center justify-center overflow-hidden`}
            style={bgImage ? { backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
          >
             {!bgImage && (
               <div className="absolute inset-0 flex flex-col items-center justify-center opacity-70">
                  <div className="text-[5rem] font-black tracking-tighter leading-none flex items-start text-black uppercase">
                    {username}
                  </div>
                  <div className="absolute top-4 right-8 w-24 h-24 border-8 border-sky-500 rounded-full border-r-transparent border-b-transparent transform rotate-45 opacity-80"></div>
                  <div className="absolute top-8 right-12 w-16 h-16 border-8 border-sky-500 rounded-full border-r-transparent border-b-transparent transform rotate-45 opacity-80"></div>
                  <div className="absolute top-12 right-16 w-8 h-8 border-8 border-sky-500 rounded-full border-r-transparent border-b-transparent transform rotate-45 opacity-80"></div>
               </div>
             )}

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
                    <button onClick={() => fileInputRef.current?.click()} className="bg-black/20 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/10 shadow-xl text-white text-sm font-semibold pointer-events-auto cursor-pointer hover:bg-black/40 transition-colors flex items-center gap-2">
                       Change Photo or Video
                    </button>
                    <input type="file" ref={fileInputRef} className="hidden" accept="image/*,video/*" onChange={handleImageUpload} />
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
            {!isPublicView ? (
              <input 
                value={displayName}
                onChange={e => setDisplayName(e.target.value)}
                className="text-[1.7rem] font-bold tracking-tight mb-0.5 bg-transparent border-none text-center outline-none focus:ring-2 focus:ring-white/20 rounded px-2"
                placeholder="Your Name"
              />
            ) : (
              <h1 className="text-[1.7rem] font-bold tracking-tight mb-0.5">{displayName}</h1>
            )}

            {!isPublicView ? (
              <div className="flex items-center mb-4">
                <span className="text-[#888888] text-sm">@</span>
                <input 
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  className="text-[#888888] text-sm bg-transparent border-none outline-none focus:ring-2 focus:ring-white/20 rounded px-1 w-24"
                  placeholder="username"
                />
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
              
              <div className={`bg-[#1C1C1E] rounded-3xl p-5 ${!isPublicView ? 'flex items-start gap-4' : ''}`}>
                {!isPublicView && (
                  <div className="mt-1 cursor-grab text-stone-500 hover:text-white">
                     <GripVertical className="w-5 h-5" />
                  </div>
                )}
                <div className={`flex-1 ${!isPublicView ? 'space-y-3' : ''}`}>
                  {isPublicView ? (
                     <p className="text-white text-[0.95rem] font-medium text-center py-2">{bio}</p>
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
                      <textarea 
                        value={bio}
                        onChange={e => setBio(e.target.value)}
                        className="text-[#888888] text-sm font-medium bg-transparent border-none outline-none w-full resize-none"
                        rows={2}
                      />
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

               {/* Phone Block */}
              <div className={`bg-[#1C1C1E] rounded-3xl ${isPublicView ? 'p-5 flex items-center justify-between cursor-pointer hover:bg-[#252528] transition-colors gap-4' : 'p-5 flex items-start gap-4'}`} onClick={isPublicView ? downloadVCard : undefined}>
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
                      <input 
                         value={phone}
                         onChange={e => setPhone(e.target.value)}
                         className="text-[#888888] text-sm font-medium bg-transparent border-none outline-none w-full"
                         placeholder="Phone number"
                      />
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
