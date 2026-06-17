import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { ShieldAlert } from 'lucide-react';
import { 
  PremiumProfileLayout, 
  FeaturedMediaBlock, 
  SwipeableCarousel, 
  DirectActionLink, 
  LeadCaptureBlock, 
  MerchStoreBlock 
} from '../components/public/PremiumProfile';

export default function PublicProfile() {
  const { username } = useParams();
  
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [socialLinks, setSocialLinks] = useState<any[]>([]);

  useEffect(() => {
    async function getProfile() {
      if (!username) return;
      
      try {
        setLoading(true);
        // Supabase query to get profile
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('username', username)
          .single();

        if (error) {
          console.error("Error fetching profile:", error);
          setProfile(null);
        } else if (data) {
          setProfile({
            username: data.username,
            displayName: data.display_name,
            bio: data.bio,
            phone: data.phone,
            email: data.email,
            address: data.address,
            bgImage: data.cover_image,
            avatarImage: data.avatar_image,
            isPro: data.is_pro || true // Default to true to show premium features
          });

          // Fetch links associated with profile
          const { data: linkData } = await supabase
            .from('links')
            .select('*')
            .eq('profile_id', data.id)
            .order('sort_order', { ascending: true });
            
          if (linkData) setSocialLinks(linkData);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
      } finally {
        setLoading(false);
      }
    }

    getProfile();
  }, [username]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-[#FF5E62] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-stone-400 mt-4 font-semibold tracking-wide">Loading @{username}...</p>
        </div>
      </div>
    );
  }

  // Graceful 404 handling
  if (!profile) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center font-sans px-4">
        <div className="max-w-md w-full bg-[#1C1C1E] border border-white/5 p-8 rounded-3xl text-center space-y-6 shadow-2xl">
          <div className="w-20 h-20 mx-auto rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center mb-6">
            <ShieldAlert className="w-10 h-10 text-stone-500" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white mb-2">Profile Not Found</h1>
          <p className="text-stone-400 leading-relaxed text-[0.95rem]">
            The link you followed may be broken, or the page may have been removed. We couldn't find a profile for <span className="text-white font-semibold">@{username}</span>.
          </p>
          <div className="pt-4 pb-2">
            <Link to="/" className="inline-block bg-white text-black font-bold px-8 py-3.5 rounded-full shadow-lg hover:bg-stone-200 transition-colors w-full text-center">
              Go Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <PremiumProfileLayout profile={profile} socialLinks={socialLinks}>
      {socialLinks.length > 0 && socialLinks.map((link) => (
        <DirectActionLink 
          key={link.id}
          platform={link.platform}
          label={`Follow on ${link.platform.charAt(0).toUpperCase() + link.platform.slice(1)}`}
          url={link.url}
        />
      ))}
    </PremiumProfileLayout>
  );
}