import React from 'react';

export default function BrandLogo({ className = "w-32 h-auto" }: { className?: string }) {
  return (
    <div className={className}>
      <svg viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Background (optional, but keep it transparent) */}
        
        {/* Center Microchip */}
        <g transform="translate(150, 40)">
          {/* Chip Body */}
          <rect x="25" y="10" width="60" height="60" rx="8" stroke="black" strokeWidth="3" fill="white"/>
          
          {/* Inner circuit pattern */}
          <rect x="35" y="20" width="40" height="40" rx="4" stroke="black" strokeWidth="2" fill="white"/>
          <path d="M45 30H55V40H45V30Z" fill="black" />
          <path d="M60 45H65V50H60V45Z" fill="black" />
          <circle cx="45" cy="50" r="2" fill="black" />
          <circle cx="50" cy="50" r="2" fill="black" />
          
          {/* Border dots */}
          <circle cx="30" cy="15" r="1.5" fill="black"/>
          <circle cx="80" cy="15" r="1.5" fill="black"/>
          <circle cx="30" cy="65" r="1.5" fill="black"/>
          <circle cx="80" cy="65" r="1.5" fill="black"/>

          {/* Left pins */}
          <path d="M25 30H20" stroke="black" strokeWidth="2" strokeLinecap="round"/>
          <path d="M25 35H18" stroke="black" strokeWidth="2" strokeLinecap="round"/>
          <path d="M25 40H18" stroke="black" strokeWidth="2" strokeLinecap="round"/>
          <path d="M25 45H18" stroke="black" strokeWidth="2" strokeLinecap="round"/>
          <path d="M25 50H20" stroke="black" strokeWidth="2" strokeLinecap="round"/>

          {/* Right pins */}
          <path d="M85 30H90" stroke="black" strokeWidth="2" strokeLinecap="round"/>
          <path d="M85 35H92" stroke="black" strokeWidth="2" strokeLinecap="round"/>
          <path d="M85 40H92" stroke="black" strokeWidth="2" strokeLinecap="round"/>
          <path d="M85 45H92" stroke="black" strokeWidth="2" strokeLinecap="round"/>
          <path d="M85 50H90" stroke="black" strokeWidth="2" strokeLinecap="round"/>
          
          {/* Bottom pins */}
          <path d="M45 70V75" stroke="black" strokeWidth="2" strokeLinecap="round"/>
          <path d="M50 70V75" stroke="black" strokeWidth="2" strokeLinecap="round"/>
          <path d="M55 70V75" stroke="black" strokeWidth="2" strokeLinecap="round"/>
          <path d="M60 70V75" stroke="black" strokeWidth="2" strokeLinecap="round"/>
          <path d="M65 70V75" stroke="black" strokeWidth="2" strokeLinecap="round"/>

        </g>
        
        {/* Small text @4167 */}
        <text x="210" y="120" fontSize="8" fontWeight="bold" fill="black" textAnchor="middle">@4167</text>

        {/* Main text CHIPNG */}
        <text x="200" y="160" fontSize="56" fontWeight="900" fill="black" textAnchor="middle" letterSpacing="-2">
          CHIPN<tspan fontWeight="300">G</tspan>
        </text>
      </svg>
    </div>
  );
}
