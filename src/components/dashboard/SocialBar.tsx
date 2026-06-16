import React from 'react';
import { Plus } from 'lucide-react';
import { getPlatformIcon, getPlatformBgClass } from '../../lib/platforms';

interface SocialPlatform {
  id: string;
  platform: string;
  url: string;
  icon?: string | React.ElementType;
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
        const IconComponent = typeof link.icon === 'function' || typeof link.icon === 'object' ? link.icon : getPlatformIcon(link.platform);
        const bgClass = getPlatformBgClass(link.platform);
        
        return (
          <button
            key={link.id}
            onClick={() => onLinkClick?.(link)}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:scale-110 shrink-0 ${bgClass}`}
          >
            <div className="w-6 h-6 flex items-center justify-center transform hover:scale-110 transition-transform text-white">
               {React.createElement(IconComponent as React.ElementType, { 
                 className: "w-full h-full"
               })}
            </div>
          </button>
        );
      })}
    </div>
  );
}
