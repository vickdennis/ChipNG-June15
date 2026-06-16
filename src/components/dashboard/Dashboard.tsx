import React, { useState, useRef, useEffect } from 'react';
import { Plus, Link2, MonitorSmartphone, GripVertical, Download, Image as ImageIcon, BadgeCheck, Activity, Users, MousePointerClick, Globe, Shield } from 'lucide-react';
import SmartphoneFrame from './SmartphoneFrame';
import AddLinkDrawer from './AddLinkDrawer';
import ManageSocialModal from './ManageSocialModal';
import { supabase } from '../../supabaseClient';
import { getPlatformIcon, getPlatformBgClass } from '../../lib/platforms';

export default function Dashboard() {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [managePlatform, setManagePlatform] = useState<string | null>(null);

  // Profile State
  const [userId, setUserId] = useState<string | null>(null);
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [bgImage, setBgImage] = useState<string | null>(null);
  const [isPro, setIsPro] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  
  const [socialLinks, setSocialLinks] = useState<any[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function fetchProfile() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      setUserId(session.user.id);
      
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();
        
      if (data) {
        setUsername(data.username || '');
        setDisplayName(data.display_name || '');
        setBio(data.bio || '');
        setPhone(data.phone || '');
        setEmail(data.email || '');
        setAddress(data.address || '');
        setBgImage(data.cover_image || null);
        setIsPro(data.is_pro || false);
        setIsAdmin(data.is_admin || false);
      }
      
      const { data: links } = await supabase
        .from('links')
        .select('*')
        .eq('profile_id', session.user.id)
        .order('sort_order', { ascending: true });
        
      if (links) {
        setSocialLinks(links); // Needs mapping to icons context in reality
      }
    }
    fetchProfile();
  }, []);

  const handleSaveProfile = async () => {
    if (!userId) return;
    const { error } = await supabase.from('profiles').update({
      display_name: displayName,
      bio,
      phone,
      email,
      address,
      username,
      is_pro: isPro // Mocking ability to toggle it for testing, or simulate subscription
    }).eq('id', userId);
    
    if (!error) {
      alert("Profile updated successfully");
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setBgImage(url);
      // In a real implementation we would convert this to a file and upload it to Supabase storage
    }
  };

  const handleAddSocialLink = (platform: any, handle: string) => {
    setSocialLinks(prev => [
      ...prev,
      {
        id: Math.random().toString(36).substr(2, 9),
        platform: platform.name,
        url: platform.baseUrl + handle,
        handle: handle,
        icon: platform.icon,
        bgClass: platform.bgClass,
        baseUrl: platform.baseUrl
      }
    ]);
  };

  const activeManageLinks = managePlatform 
    ? socialLinks.filter(l => l.platform === managePlatform)
    : [];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col md:flex-row font-sans">
      
      {/* Left Column: Editor Toolkit */}
      <div className="w-full md:w-3/5 lg:w-2/3 h-screen overflow-y-auto px-6 py-10 md:px-12 md:py-16 border-r border-[#1C1C1E]">
        <div className="max-w-2xl mx-auto space-y-12">
          
          <header className="space-y-2 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#FF5E62] to-[#FF9966] flex items-center justify-center font-bold text-white shadow-lg">
                  <Link2 className="w-5 h-5" />
                </div>
                <h1 className="text-3xl font-bold tracking-tight text-white">Dashboard</h1>
              </div>
              <p className="text-stone-400 mt-2">Manage your link-in-bio page and customize your public profile.</p>
            </div>
            {isAdmin && (
              <a href="/admin" className="inline-flex items-center gap-2 px-4 py-2 bg-stone-900 border border-stone-800 rounded-full text-white text-sm font-bold hover:bg-stone-800 transition-colors shadow-sm">
                <Shield className="w-4 h-4 text-purple-400" /> Admin Console
              </a>
            )}
          </header>

          <section className="space-y-6">
            <h2 className="text-xl font-bold tracking-wide">Basic Information</h2>
            
            <div className="bg-[#1C1C1E] p-6 rounded-3xl border border-white/5 space-y-5">
              
              <div>
                <label className="block text-sm font-semibold text-stone-300 mb-2">Cover Image</label>
                <div 
                  className="w-full h-32 rounded-2xl border-2 border-dashed border-stone-700 bg-stone-900/50 flex flex-col items-center justify-center cursor-pointer hover:border-stone-500 hover:bg-stone-800 transition-colors overflow-hidden"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {bgImage ? (
                    <img src={bgImage} alt="Cover" className="w-full h-full object-cover opacity-60" />
                  ) : (
                    <>
                      <ImageIcon className="w-6 h-6 text-stone-500 mb-2" />
                      <span className="text-sm font-semibold text-stone-400">Click to upload image</span>
                    </>
                  )}
                </div>
                <input type="file" ref={fileInputRef} className="hidden" accept="image/*,video/*" onChange={handleImageUpload} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-stone-300 mb-2">Display Name</label>
                  <input 
                    type="text" 
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full bg-black border border-stone-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FF5E62] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-stone-300 mb-2">Username</label>
                  <div className="flex items-center w-full bg-black border border-stone-800 rounded-xl px-4 py-3 focus-within:border-[#FF5E62] transition-colors">
                    <span className="text-stone-500 mr-2">chipng.com/</span>
                    <input 
                      type="text" 
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="bg-transparent text-white w-full focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-stone-300 mb-2">Bio</label>
                <textarea 
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full bg-black border border-stone-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FF5E62] transition-colors resize-none"
                  rows={3}
                />
              </div>

            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-xl font-bold tracking-wide">Contact Details</h2>
            
            <div className="bg-[#1C1C1E] p-6 rounded-3xl border border-white/5 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-stone-300 mb-2">Phone Number</label>
                  <input 
                    type="tel" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-black border border-stone-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FF5E62] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-stone-300 mb-2">Email</label>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-black border border-stone-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FF5E62] transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-stone-300 mb-2">Address / Location</label>
                <input 
                  type="text" 
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-black border border-stone-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FF5E62] transition-colors"
                />
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold tracking-wide">Links & Social</h2>
              <button 
                onClick={() => setDrawerOpen(true)}
                className="bg-white text-black font-bold text-sm px-4 py-2 rounded-full hover:bg-stone-200 transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" /> Add Link
              </button>
            </div>
            
            <div className="space-y-3">
              {socialLinks.length === 0 ? (
                <div className="bg-[#1C1C1E] p-8 rounded-3xl border border-dashed border-stone-700 text-center flex flex-col items-center">
                   <Link2 className="w-8 h-8 text-stone-600 mb-3" />
                   <p className="text-stone-400 font-medium">No links added yet.</p>
                   <p className="text-stone-500 text-sm mt-1">Add your social media profiles and websites to display on your profile.</p>
                </div>
              ) : (
                socialLinks.map((link) => (
                  <div key={link.id} className="bg-[#1C1C1E] p-4 rounded-2xl border border-white/5 flex items-center gap-4 group">
                    <div className="cursor-grab text-stone-600 hover:text-stone-300 transition-colors">
                       <GripVertical className="w-5 h-5" />
                    </div>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white ${link.bgClass || getPlatformBgClass(link.platform) || 'bg-stone-800'}`}>
                       {React.createElement(link.icon || getPlatformIcon(link.platform), { className: "w-6 h-6" })}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-white">{link.platform}</p>
                      <p className="text-stone-500 text-sm truncate">{link.url}</p>
                    </div>
                    <button 
                      onClick={() => setManagePlatform(link.platform)}
                      className="px-4 py-2 rounded-full bg-stone-800 text-stone-300 font-semibold text-sm hover:bg-stone-700 transition-colors"
                    >
                      Edit
                    </button>
                  </div>
                ))
              )}
            </div>
          </section>

          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold tracking-wide">Premium Features</h2>
              {isPro ? (
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider">
                  <BadgeCheck className="w-4 h-4" /> Pro Active
                </span>
              ) : (
                <span className="px-3 py-1 rounded-full bg-stone-800 text-stone-400 text-xs font-bold uppercase tracking-wider">
                  Free Plan
                </span>
              )}
            </div>
            
            <div className="bg-[#1C1C1E] p-6 rounded-3xl border border-white/5 space-y-6">
              <div className="flex items-center justify-between p-4 bg-black rounded-2xl border border-stone-800">
                <div className="flex flex-col">
                   <span className="font-bold text-white flex items-center gap-2">
                     Profile Verification Badge
                     {isPro && <BadgeCheck className="w-5 h-5 text-blue-500" />}
                   </span>
                   <span className="text-stone-500 text-sm">Display a blue checkmark on your public profile.</span>
                </div>
                <button 
                  onClick={() => setIsPro(!isPro)} 
                  className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${isPro ? 'bg-blue-500' : 'bg-stone-700'}`}
                >
                  <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${isPro ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>

              {isPro ? (
                 <div className="space-y-4">
                    <h3 className="font-bold text-lg flex items-center gap-2 mt-2">
                       <Activity className="w-5 h-5 text-[#FF5E62]" /> Subscriptions & Analytics
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-black border border-stone-800 p-4 rounded-2xl flex flex-col items-center justify-center text-center">
                         <span className="text-stone-500 text-xs font-bold uppercase tracking-wider mb-2">Total Views</span>
                         <span className="text-2xl font-black">12.4K</span>
                      </div>
                      <div className="bg-black border border-stone-800 p-4 rounded-2xl flex flex-col items-center justify-center text-center">
                         <span className="text-stone-500 text-xs font-bold uppercase tracking-wider mb-2">Link Clicks</span>
                         <span className="text-2xl font-black">3,842</span>
                      </div>
                      <div className="bg-black border border-stone-800 p-4 rounded-2xl flex flex-col items-center justify-center text-center">
                         <span className="text-stone-500 text-xs font-bold uppercase tracking-wider mb-2">CTR</span>
                         <span className="text-2xl font-black text-green-400">31%</span>
                      </div>
                      <div className="bg-black border border-stone-800 p-4 rounded-2xl flex flex-col items-center justify-center text-center">
                         <span className="text-stone-500 text-xs font-bold uppercase tracking-wider mb-2">Top Region</span>
                         <span className="text-xl font-bold">Nigeria 🇳🇬</span>
                      </div>
                    </div>
                 </div>
              ) : (
                <div className="border border-stone-800 bg-black rounded-2xl p-6 text-center space-y-4 relative overflow-hidden">
                  <div className="absolute -top-12 -right-12 w-64 h-64 bg-gradient-to-br from-[#FF5E62]/10 to-transparent blur-3xl rounded-full"></div>
                  <h3 className="text-lg font-bold">Unlock Advanced Analytics</h3>
                  <p className="text-stone-400 text-sm max-w-sm mx-auto">Get deep insights into your audience, export data, and remove branding with the Pro Plan.</p>
                  <button onClick={() => setIsPro(true)} className="bg-white text-black font-bold px-6 py-2.5 rounded-full hover:bg-stone-200 transition-colors">
                    Upgrade for ₦3,000/mo
                  </button>
                </div>
              )}
            </div>
          </section>

          <div className="pt-8 flex items-center justify-end">
            <button onClick={handleSaveProfile} className="bg-gradient-to-r from-[#FF5E62] to-[#FF9966] text-white font-bold px-8 py-3.5 rounded-full shadow-lg hover:opacity-90 transition-opacity">
              Save Changes
            </button>
          </div>

        </div>
      </div>

      {/* Right Column: Live Mobile Preview */}
      <div className="w-full md:w-2/5 lg:w-1/3 bg-[#050505] hidden md:flex items-center justify-center border-l border-stone-800 relative shadow-2xl">
        <div className="absolute top-6 flex items-center gap-2 bg-stone-900/80 backdrop-blur border border-stone-700 rounded-full px-4 py-2 z-10">
           <MonitorSmartphone className="w-4 h-4 text-stone-400" />
           <span className="text-xs font-bold text-stone-300 tracking-wide uppercase">Live Preview</span>
        </div>
        <div className="scale-[0.80] 2xl:scale-90 transform-gpu overflow-hidden rounded-[3rem] ring-[12px] ring-stone-900 shadow-2xl bg-black">
          <SmartphoneFrame 
             isPublicView={true}
             username={username}
             displayName={displayName}
             bio={bio}
             phone={phone}
             bgImage={bgImage}
             isPro={isPro}
             socialLinks={socialLinks} 
             onAddSocialClick={() => setDrawerOpen(true)} 
             onSocialLinkClick={(link) => setManagePlatform(link.platform)}
          />
        </div>
      </div>

      {/* Drawers and Modals */}
      <AddLinkDrawer isOpen={isDrawerOpen} onClose={() => setDrawerOpen(false)} onSave={handleAddSocialLink} />
      
      <ManageSocialModal 
        isOpen={!!managePlatform} 
        onClose={() => setManagePlatform(null)} 
        platform={managePlatform || ''}
        links={activeManageLinks}
        onRemove={(id) => setSocialLinks(prev => prev.filter(l => l.id !== id))}
        onEdit={(link) => {
           setManagePlatform(null);
           setDrawerOpen(true);
        }}
        onAddAnother={() => {
           setManagePlatform(null);
           setDrawerOpen(true);
        }}
      />
    </div>
  );
}
