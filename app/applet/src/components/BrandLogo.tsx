import React from 'react';

export default function BrandLogo({ className = "w-32 h-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Background (optional, but keep it transparent) */}
      
      {/* Top right Wifi logo */}
      <g transform="translate(320, 20) rotate(90) scale(0.6)">
         <path d="M12 20C12 20 12 20 12 20C12 20 12 20 12 20C12 20 12 20 12 20C12 20 12 20 12 20Z" stroke="black" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
         <path d="M12 20C12 20 12 20 12 20C12 20 12 20 12 20C12 20 12 20 12 20C12 20 12 20 12 20Z" stroke="black" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
         <path d="M8.5 16.5C10.433 14.567 13.567 14.567 15.5 16.5" stroke="black" strokeWidth="4" strokeLinecap="round"/>
         <path d="M5 13C8.866 9.134 15.134 9.134 19 13" stroke="black" strokeWidth="4" strokeLinecap="round"/>
         <path d="M1.5 9.5C7.299 3.701 16.701 3.701 22.5 9.5" stroke="black" strokeWidth="4" strokeLinecap="round"/>
      </g>
      
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

      {/* Mastercard Logo Bottom Right */}
      <g transform="translate(320, 150) scale(0.6)">
         <circle cx="15" cy="15" r="15" fill="#EB001B"/>
         <circle cx="35" cy="15" r="15" fill="#F79E1B" opacity="0.9"/>
         {/* Overlap stripes can be omitted or matched */}
         <path d="M25,5 C28,10 28,20 25,25 C22,20 22,10 25,5 Z" fill="#FF5F00" opacity="0"/> 
         <line x1="22" y1="8" x2="28" y2="8" stroke="#F79E1B" strokeWidth="1.5"/>
         <line x1="21" y1="12" x2="29" y2="12" stroke="#F79E1B" strokeWidth="1.5"/>
         <line x1="21" y1="16" x2="29" y2="16" stroke="#F79E1B" strokeWidth="1.5"/>
         <line x1="22" y1="20" x2="28" y2="20" stroke="#F79E1B" strokeWidth="1.5"/>
      </g>
    </svg>
  );
}
