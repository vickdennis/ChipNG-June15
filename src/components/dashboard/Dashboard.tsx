import React, { useState, useRef } from 'react';
import { Plus, Link2, MonitorSmartphone, GripVertical, Download, Image as ImageIcon } from 'lucide-react';
import SmartphoneFrame from './SmartphoneFrame';
import AddLinkDrawer from './AddLinkDrawer';
import ManageSocialModal from './ManageSocialModal';

export default function Dashboard() {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [managePlatform, setManagePlatform] = useState<string | null>(null);

  // Profile State
  const [username, setUsername] = useState('nfcng');
  const [displayName, setDisplayName] = useState('NFC NG');
  const [bio, setBio] = useState("Welcome to NFC NG's profile");
  const [phone, setPhone] = useState('08100764154');
  const [email, setEmail] = useState('contact@nfc.ng');
  const [address, setAddress] = useState('Lagos, Nigeria');
  const [bgImage, setBgImage] = useState<string | null>(null);
  
  const [socialLinks, setSocialLinks] = useState<any[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
          
          <header className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#FF5E62] to-[#FF9966] flex items-center justify-center font-bold text-white shadow-lg">
                <Link2 className="w-5 h-5" />
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-white">Dashboard</h1>
            </div>
            <p className="text-stone-400">Manage your link-in-bio page and customize your public profile.</p>
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
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white ${link.bgClass || 'bg-stone-800'}`}>
                       {React.createElement(link.icon, { className: "w-6 h-6" })}
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

          <div className="pt-8 flex items-center justify-end">
            <button className="bg-gradient-to-r from-[#FF5E62] to-[#FF9966] text-white font-bold px-8 py-3.5 rounded-full shadow-lg hover:opacity-90 transition-opacity">
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
