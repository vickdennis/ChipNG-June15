import React, { useState } from 'react';
import { Plus, Link2, MonitorSmartphone } from 'lucide-react';
import StyleSwitcher from './StyleSwitcher';
import LinksList from './LinksList';
import AddLinkDrawer from './AddLinkDrawer';
import SmartphoneFrame from './SmartphoneFrame';

export default function Dashboard() {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [showPreviewMobile, setShowPreviewMobile] = useState(false);

  return (
    <div className="flex bg-white min-h-screen font-sans selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col h-screen overflow-hidden ${showPreviewMobile ? 'hidden md:flex' : 'flex'}`}>
        {/* Top Navbar */}
        <header className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-6 shrink-0">
          <div className="font-black text-xl tracking-tight text-slate-900">CHIP NG</div>
          
          {/* Mobile Preview Toggle */}
          <button 
            className="md:hidden flex items-center gap-2 font-bold text-sm text-slate-700 bg-slate-100 py-2 px-4 rounded-full"
            onClick={() => setShowPreviewMobile(true)}
          >
            <MonitorSmartphone className="w-4 h-4" /> Preview
          </button>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto style-scrollbar p-6 md:p-10 relative">
          <div className="max-w-2xl mx-auto">
            {/* Action Bar */}
            <div className="mb-10 text-center">
              <button 
                onClick={() => setDrawerOpen(true)}
                className="w-full bg-slate-900 text-white font-bold text-lg py-5 rounded-3xl hover:bg-slate-800 transition-colors shadow-lg shadow-black/10 flex items-center justify-center gap-2"
              >
                <Plus className="w-6 h-6" /> Add A New Link
              </button>
            </div>

            <StyleSwitcher />
            
            <LinksList />
          </div>
        </div>
      </div>

      {/* Live Preview Pane (Desktop) & Mobile Toggle View */}
      <div className={`w-full md:w-[450px] lg:w-[500px] shrink-0 h-screen overflow-y-auto ${showPreviewMobile ? 'block' : 'hidden md:block'}`}>
         {showPreviewMobile && (
             <div className="md:hidden bg-slate-50 p-4 border-b border-slate-200 sticky top-0 z-20 flex justify-between items-center">
               <button onClick={() => setShowPreviewMobile(false)} className="font-bold text-slate-700">Close</button>
               <span className="font-bold">Live Preview</span>
             </div>
         )}
         <SmartphoneFrame />
      </div>

      {/* Right Drawer - Add Link */}
      <AddLinkDrawer isOpen={isDrawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  );
}
