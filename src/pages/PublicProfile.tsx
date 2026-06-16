import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import SmartphoneFrame from '../components/dashboard/SmartphoneFrame';
import { SiTiktok, SiTelegram, SiWhatsapp } from 'react-icons/si';

export default function PublicProfile() {
  const { username } = useParams();

  // Mock initial links for the public profile as seen in the design
  const [socialLinks] = useState([
    {
      id: "1",
      platform: "TikTok",
      url: "https://tiktok.com/@nfcng",
      handle: "nfcng",
      icon: SiTiktok,
      bgClass: "bg-black",
      baseUrl: "https://tiktok.com/@"
    },
    {
      id: "2",
      platform: "Telegram",
      url: "https://t.me/nfcng",
      handle: "nfcng",
      icon: SiTelegram,
      bgClass: "bg-[#26A5E4]",
      baseUrl: "https://t.me/"
    },
    {
      id: "3",
      platform: "WhatsApp",
      url: "https://wa.me/123456789",
      handle: "123456789",
      icon: SiWhatsapp,
      bgClass: "bg-[#25D366]",
      baseUrl: "https://wa.me/"
    }
  ]);

  return (
    <div className="min-h-screen bg-black flex justify-center">
       <SmartphoneFrame isPublicView={true} socialLinks={socialLinks} />
    </div>
  );
}