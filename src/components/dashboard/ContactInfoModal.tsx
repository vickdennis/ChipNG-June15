import React, { useState } from 'react';
import { ChevronLeft, Menu, User } from 'lucide-react';

export default function ContactInfoModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [activeTab, setActiveTab] = useState('Email');
  const [email, setEmail] = useState('');

  if (!isOpen) return null;

  const tabs = ['Email', 'Phone', 'Website', 'Address'];

  return (
    <div className="fixed inset-0 bg-black z-50 flex justify-center items-center font-sans selection:bg-indigo-500/30 selection:text-white">
      <div className="w-full h-full max-w-md bg-black flex flex-col relative overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6">
          <button onClick={onClose} className="w-10 h-10 rounded-full bg-stone-900 flex items-center justify-center text-white hover:bg-stone-800 transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-3">
            <button className="w-10 h-10 rounded-full bg-stone-900 flex items-center justify-center text-white hover:bg-stone-800 transition-colors">
              <Menu className="w-4 h-4" />
            </button>
            <button className="w-10 h-10 rounded-full bg-stone-900 flex items-center justify-center text-slate-400 hover:text-white hover:bg-stone-800 transition-colors">
              <User className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 flex-1 flex flex-col">
          <h2 className="text-2xl font-bold text-white mb-6">Contact Info</h2>
          
          {/* Tabs */}
          <div className="bg-[#111111] p-1.5 rounded-[1.5rem] flex items-center justify-between mb-8 overflow-x-auto style-scrollbar">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-4 rounded-full text-sm font-medium transition-colors whitespace-nowrap flex-1 text-center ${
                  activeTab === tab 
                    ? 'bg-[#2a2a2a] text-white' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Form Area */}
          <div className="space-y-4">
            <input 
              type="text" 
              placeholder={activeTab === 'Email' ? 'name@example.com' : `Enter ${activeTab.toLowerCase()}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#111111] text-white placeholder-stone-600 rounded-3xl py-4 flex-1 px-5 focus:outline-none focus:ring-1 focus:ring-stone-700"
            />
            
            <button className="w-full py-4 text-slate-300 font-semibold bg-[#1a1a1a] rounded-3xl hover:bg-[#222222] transition-colors border border-[#2a2a2a]/50">
              + Add {activeTab}
            </button>
          </div>
        </div>

        {/* Footer sticky action */}
        <div className="p-6 pb-8 md:pb-6 mt-auto">
          <button 
            onClick={onClose}
            className="w-full bg-white text-black font-bold text-lg py-4 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:scale-[1.02] active:scale-[0.98] transition-transform"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
