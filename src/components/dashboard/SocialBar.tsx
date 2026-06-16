import React from 'react';
import { Plus } from 'lucide-react';

interface SocialPlatform {
  id: string;
  platform: string;
  url: string;
  icon: string | React.ElementType;
}

interface SocialBarProps {
  links: SocialPlatform[];
  isEditable?: boolean;
  onAddClick?: () => void;
  onLinkClick?: (link: SocialPlatform) => void;
}

export default function SocialBar({ links, isEditable = false, onAddClick, onLinkClick }: SocialBarProps) {
  return (
    <div className="flex items-center justify-center gap-3 mt-4 mb-2 flex-wrap max-w-full">
      {isEditable && (
        <button 
          onClick={onAddClick}
          className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-coral-400 flex items-center justify-center shadow-md transform hover:scale-105 transition-transform shrink-0"
          style={{ background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)' }}
        >
          <Plus className="w-5 h-5 text-white" />
        </button>
      )}

      {links.map((link) => {
        return (
          <button
            key={link.id}
            onClick={() => onLinkClick?.(link)}
            className="w-10 h-10 rounded-full bg-transparent flex items-center justify-center transition-transform hover:scale-110 shrink-0"
          >
            {/* If icon is a React component (lucide), render it, otherwise render an img. Mocking img for now based on text */}
            {typeof link.icon === 'string' ? (
              <img src={link.icon} alt={link.platform} className="w-full h-full object-contain drop-shadow-md" />
            ) : (
              <div className="w-9 h-9 flex items-center justify-center transform hover:scale-110 transition-transform">
                 {React.createElement(link.icon as React.ElementType, { 
                   className: `w-full h-full ${link.platform === 'TikTok' ? 'text-white drop-shadow-[2px_2px_0_#00f2fe,-2px_-2px_0_#fe0979]' : link.platform === 'Telegram' ? 'text-[#2aabee]' : link.platform === 'WhatsApp' ? 'text-[#25D366]' : 'text-white'}` 
                 })}
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
