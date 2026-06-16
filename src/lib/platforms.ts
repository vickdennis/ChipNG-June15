import {
  SiInstagram, SiSnapchat, SiFacebook, SiX, SiYoutube,
  SiTelegram, SiWhatsapp, SiCalendly,
  SiApplemusic, SiSpotify, SiSoundcloud, SiYoutubemusic, SiAudiomack,
  SiPaypal, SiVenmo, SiCashapp, SiZelle,
  SiPlaystation, SiSteam, SiTwitch, SiKick
} from 'react-icons/si';
import { FaLinkedin, FaSkype, FaXbox } from 'react-icons/fa';
import { Link2 } from 'lucide-react';
import React from 'react';

export const platformCategories = [
  {
    name: 'SOCIAL',
    platforms: [
      { name: 'Instagram', icon: SiInstagram, bgClass: 'bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888]', baseUrl: 'https://www.instagram.com/' },
      { name: 'Snapchat', icon: SiSnapchat, bgClass: 'bg-[#FFFC00] text-black', baseUrl: 'https://www.snapchat.com/add/' },
      { name: 'Facebook', icon: SiFacebook, bgClass: 'bg-[#1877F2]', baseUrl: 'https://www.facebook.com/' },
      { name: 'X', icon: SiX, bgClass: 'bg-[#000000]', baseUrl: 'https://x.com/' },
      { name: 'YouTube', icon: SiYoutube, bgClass: 'bg-[#FF0000]', baseUrl: 'https://www.youtube.com/@' },
    ]
  },
  {
    name: 'BUSINESS',
    platforms: [
      { name: 'LinkedIn', icon: FaLinkedin, bgClass: 'bg-[#0A66C2]', baseUrl: 'https://www.linkedin.com/in/' },
      { name: 'Skype', icon: FaSkype, bgClass: 'bg-[#00AFF0]', baseUrl: 'https://join.skype.com/invite/' },
      { name: 'Telegram', icon: SiTelegram, bgClass: 'bg-[#26A5E4]', baseUrl: 'https://t.me/' },
      { name: 'WhatsApp', icon: SiWhatsapp, bgClass: 'bg-[#25D366]', baseUrl: 'https://wa.me/' },
      { name: 'Calendly', icon: SiCalendly, bgClass: 'bg-[#006BFF]', baseUrl: 'https://calendly.com/' },
    ]
  },
  {
    name: 'MUSIC',
    platforms: [
      { name: 'Apple Music', icon: SiApplemusic, bgClass: 'bg-gradient-to-br from-[#FA243C] to-[#FA243C]', baseUrl: 'https://music.apple.com/' },
      { name: 'Spotify', icon: SiSpotify, bgClass: 'bg-[#1DB954]', baseUrl: 'https://open.spotify.com/user/' },
      { name: 'SoundCloud', icon: SiSoundcloud, bgClass: 'bg-[#FF3300]', baseUrl: 'https://soundcloud.com/' },
      { name: 'YouTube Music', icon: SiYoutubemusic, bgClass: 'bg-[#FF0000]', baseUrl: 'https://music.youtube.com/channel/' },
      { name: 'Audiomack', icon: SiAudiomack, bgClass: 'bg-[#FFA200]', baseUrl: 'https://audiomack.com/' },
    ]
  },
  {
    name: 'PAYMENT',
    platforms: [
      { name: 'PayPal', icon: SiPaypal, bgClass: 'bg-[#00457C]', baseUrl: 'https://paypal.me/' },
      { name: 'Venmo', icon: SiVenmo, bgClass: 'bg-[#008CFF]', baseUrl: 'https://venmo.com/u/' },
      { name: 'CashApp', icon: SiCashapp, bgClass: 'bg-[#00D632]', baseUrl: 'https://cash.app/$' },
      { name: 'Zelle', icon: SiZelle, bgClass: 'bg-[#741DF2]', baseUrl: 'https://enroll.zellepay.com/' },
    ]
  },
  {
    name: 'LIFESTYLE & ENTERTAINMENT',
    platforms: [
      { name: 'PlayStation', icon: SiPlaystation, bgClass: 'bg-[#003791]', baseUrl: 'https://my.playstation.com/profile/' },
      { name: 'Xbox', icon: FaXbox, bgClass: 'bg-[#107C10]', baseUrl: 'https://account.xbox.com/en-us/profile?gamertag=' },
      { name: 'Steam', icon: SiSteam, bgClass: 'bg-[#000000]', baseUrl: 'https://steamcommunity.com/id/' },
      { name: 'Twitch', icon: SiTwitch, bgClass: 'bg-[#9146FF]', baseUrl: 'https://www.twitch.tv/' },
      { name: 'Kick', icon: SiKick, bgClass: 'bg-[#53FC18]', baseUrl: 'https://kick.com/' },
    ]
  }
];

export const allPlatforms = platformCategories.flatMap(cat => cat.platforms);

export const getPlatformIcon = (platformName: string) => {
  const platform = allPlatforms.find(p => p.name.toLowerCase() === platformName.toLowerCase());
  return platform?.icon || Link2;
};

export const getPlatformBgClass = (platformName: string) => {
  const platform = allPlatforms.find(p => p.name.toLowerCase() === platformName.toLowerCase());
  return platform?.bgClass || 'bg-stone-800 text-white';
};
