import React, { useState } from 'react';
import { Plus, Link2, MonitorSmartphone } from 'lucide-react';
import StyleSwitcher from './StyleSwitcher';
import LinksList from './LinksList';
import AddLinkDrawer from './AddLinkDrawer';
import SmartphoneFrame from './SmartphoneFrame';
import ContactInfoModal from './ContactInfoModal';
import EditBioModal from './EditBioModal';
import ManageSocialModal from './ManageSocialModal';

export default function Dashboard() {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [showPreviewMobile, setShowPreviewMobile] = useState(false);
  const [isContactModalOpen, setContactModalOpen] = useState(false);
  const [isBioModalOpen, setBioModalOpen] = useState(false);

  const [isEditMode, setIsEditMode] = useState(false);

  // Social Links State
  const [socialLinks, setSocialLinks] = useState<any[]>([]);
  const [managePlatform, setManagePlatform] = useState<string | null>(null);

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
    <div className="font-sans selection:bg-indigo-500/30 selection:text-white bg-black">
         <SmartphoneFrame 
           isPublicView={!isEditMode}
           onEditClick={() => setIsEditMode(true)}
           onSaveClick={() => setIsEditMode(false)}
           socialLinks={socialLinks} 
           onAddSocialClick={() => setDrawerOpen(true)} 
           onSocialLinkClick={(link) => setManagePlatform(link.platform)}
         />

      {/* Right Drawer - Add Link */}
      <AddLinkDrawer isOpen={isDrawerOpen} onClose={() => setDrawerOpen(false)} onSave={handleAddSocialLink} />
      
      {/* Modals */}
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
