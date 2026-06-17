import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Play, ArrowRight, Mail, ShoppingCart, BadgeCheck } from 'lucide-react';
import { getPlatformIcon } from '../../lib/platforms';

/* Layout Wrapper */
export function PremiumProfileLayout({ profile, socialLinks, children }: any) {
  const bgStyle = profile.bgImage 
    ? { backgroundImage: `url(${profile.bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : { background: 'linear-gradient(to bottom right, #111, #000)' };

  return (
    <div className="min-h-screen w-full relative sm:py-12 flex justify-center bg-black overflow-y-auto" style={bgStyle}>
      {/* Background Overlay */}
      {profile.bgImage && <div className="absolute inset-0 bg-black/50 backdrop-blur-3xl z-0" />}

      {/* Main Container */}
      <div className="w-full max-w-md min-h-screen sm:min-h-[850px] relative z-10 rounded-none sm:rounded-[40px] shadow-2xl overflow-y-auto hidden-scrollbar bg-black/40 backdrop-blur-xl border border-white/10 flex flex-col items-center pt-16 pb-12 px-6">
        
        {/* Profile Header */}
        <div className="relative mb-4 mt-6">
          {profile.isPro && (
            <div className="absolute -top-10 right-0 bg-black rounded-full p-[2px] shadow-lg translate-x-1 sm:translate-x-2 z-20">
              <BadgeCheck className="w-8 h-8 text-[#1da1f2] fill-white" />
            </div>
          )}
        </div>

        <h1 className="text-4xl font-black text-white px-4 text-center tracking-tight mb-2 flex items-center gap-2 drop-shadow-md">
          {profile.displayName || `@${profile.username}`}
        </h1>
        {profile.bio && (
          <p className="text-stone-300 text-center text-[0.95rem] mb-6 max-w-[280px] leading-relaxed drop-shadow-md">
            {profile.bio}
          </p>
        )}

        {/* Social Bar */}
        <div className="flex items-center justify-center gap-4 mb-8 w-full flex-wrap">
           {socialLinks.map((link: any) => {
             const Icon = getPlatformIcon(link.platform);
             if (!Icon) return null;

             const getBrandColor = (platform: string) => {
               const colors: Record<string, string> = {
                  youtube: "text-[#FF0000]",
                  instagram: "text-[#E1306C]",
                  tiktok: "text-[#ffffff]",
                  x: "text-[#ffffff]",
                  twitter: "text-[#1DA1F2]",
                  snapchat: "text-[#FFFC00]",
                  discord: "text-[#5865F2]",
                  spotify: "text-[#1DB954]",
                  twitch: "text-[#9146FF]",
               };
               return colors[platform.toLowerCase()] || "text-white";
             };

             return (
               <a 
                 key={link.id} 
                 href={link.url}
                 target="_blank"
                 rel="noreferrer"
                 className="w-12 h-12 rounded-full bg-black/60 border border-white/10 flex items-center justify-center hover:scale-110 transition-transform shadow-[0_0_15px_rgba(0,0,0,0.5)] backdrop-blur-md"
               >
                 <Icon className={`w-5 h-5 ${getBrandColor(link.platform)} drop-shadow-md`} />
               </a>
             );
           })}
        </div>

        {/* Content Blocks */}
        <div className="w-full flex flex-col gap-4">
           {children}
        </div>
        
        {/* Branding Footer */}
        <div className="mt-16 opacity-40 hover:opacity-100 transition-opacity flex flex-col items-center">
            <span className="text-[10px] font-black text-white uppercase tracking-[0.2em] mb-2 drop-shadow-md">POWERED BY</span>
            <div className="font-black text-white text-xl tracking-tight drop-shadow-md">CHIP NG</div>
        </div>
      </div>
    </div>
  );
}

/* Featured Media Embed (Highlight Block) */
export function FeaturedMediaBlock({ title, thumbnailUrl, videoUrl }: any) {
  return (
    <motion.a 
      href={videoUrl}
      target="_blank"
      rel="noreferrer"
      className="relative w-full aspect-video rounded-[1.5rem] overflow-hidden bg-stone-900 border border-white/10 group block shadow-xl"
      animate={{ scale: [1, 1.01, 1] }}
      transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
    >
      <img src={thumbnailUrl} alt={title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity group-hover:scale-105 duration-700" />
      <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
         <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-[#1da1f2] transition-colors shadow-2xl">
            <Play className="w-8 h-8 text-white fill-white ml-1" />
         </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
        <h3 className="text-white font-black text-lg leading-tight tracking-tight shadow-black drop-shadow-lg">{title}</h3>
      </div>
    </motion.a>
  );
}

/* Swipeable Carousel Block */
export function SwipeableCarousel({ items }: any) {
  if (!items || items.length === 0) return null;
  return (
    <div className="w-full -mx-6 px-6 mb-2 mt-2">
      <div className="flex gap-4 overflow-x-auto hidden-scrollbar pb-4 snap-x">
        {items.map((item: any, idx: number) => (
          <a
            key={idx}
            href={item.url}
            target="_blank"
            rel="noreferrer"
            className="snap-start shrink-0 w-36 aspect-square rounded-[1.25rem] overflow-hidden relative group bg-stone-900 border border-white/10 shadow-lg block"
          >
            <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
            <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/95 to-transparent">
              <p className="text-white font-bold text-sm truncate leading-tight drop-shadow-md">{item.title}</p>
              {item.price && <p className="text-emerald-400 font-bold text-xs drop-shadow-md">{item.price}</p>}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

/* Direct Action / Standard Link Buttons */
export function DirectActionLink({ platform, label, url }: any) {
  const Icon = getPlatformIcon(platform);
  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noreferrer"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="w-full flex items-center justify-between p-4 rounded-2xl bg-white/10 border border-white/10 hover:bg-white/20 transition-all backdrop-blur-md shadow-lg"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
          {Icon ? <Icon className="w-5 h-5 text-white" /> : <div className="w-5 h-5 rounded-full border-2 border-white" />}
        </div>
        <span className="font-bold text-white text-base tracking-tight">{label}</span>
      </div>
      <ArrowRight className="w-5 h-5 text-white/50" />
    </motion.a>
  );
}

/* Lead Capture / Fan Club Block */
export function LeadCaptureBlock({ ctaText }: any) {
  const [email, setEmail] = useState('');
  return (
    <div className="w-full rounded-[1.5rem] bg-gradient-to-br from-[#1a1a1a]/80 to-[#0a0a0a]/80 backdrop-blur-xl p-5 border border-white/10 shadow-xl mt-2 mb-2">
      <h3 className="font-black text-white text-lg mb-3 flex items-center gap-2 tracking-tight">
        <Mail className="w-5 h-5 text-fuchsia-400" />
        {ctaText || "Join the Fan Club"}
      </h3>
      <form onSubmit={(e) => { e.preventDefault(); alert("Subscribed: " + email); setEmail(''); }} className="flex gap-2">
        <input 
          type="email" 
          placeholder="your@email.com" 
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 bg-black/50 border border-white/10 rounded-[1rem] px-4 py-3 text-[0.95rem] font-medium text-white placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
        />
        <button type="submit" className="bg-white text-black font-black px-5 py-3 rounded-[1rem] hover:bg-stone-200 transition-colors shadow-lg active:scale-95">
          Join
        </button>
      </form>
    </div>
  );
}

/* Merch Store Integration */
export function MerchStoreBlock({ products }: any) {
  if (!products || products.length === 0) return null;
  return (
    <div className="w-full p-5 rounded-[1.5rem] bg-white/5 border border-white/10 backdrop-blur-xl shadow-xl mt-2">
      <h3 className="font-black text-white text-lg flex items-center gap-2 mb-4 tracking-tight">
        <ShoppingCart className="w-5 h-5 text-yellow-400" />
        Official Merch
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {products.map((product: any, idx: number) => (
          <a key={idx} href={product.url} target="_blank" rel="noreferrer" className="bg-black/50 rounded-2xl overflow-hidden border border-white/5 hover:border-white/20 transition-all group block shadow-md hover:shadow-xl">
             <div className="aspect-square bg-stone-900 group-hover:bg-stone-800 transition-colors p-4 flex items-center justify-center overflow-hidden">
               <img src={product.imageUrl} alt={product.name} className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-500" />
             </div>
             <div className="p-3 bg-stone-950/80">
               <p className="text-white font-bold text-sm truncate leading-tight drop-shadow-md mb-1">{product.name}</p>
               <p className="text-emerald-400 font-bold text-xs drop-shadow-md">{product.price}</p>
             </div>
          </a>
        ))}
      </div>
    </div>
  );
}
