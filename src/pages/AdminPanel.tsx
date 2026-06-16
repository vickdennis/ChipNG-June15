import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { ShieldAlert, CheckCircle, Search, Shield, Users, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminPanel() {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [profiles, setProfiles] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    async function checkAdminAndFetch() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          setLoading(false);
          return;
        }

        // Fetch current user's profile
        const { data: profile } = await supabase
          .from('profiles')
          .select('is_admin')
          .eq('id', session.user.id)
          .single();

        if (profile?.is_admin) {
          setIsAdmin(true);
          // Fetch all profiles
          const { data: allProfiles } = await supabase
             .from('profiles')
             .select('*')
             .order('created_at', { ascending: false });
          setProfiles(allProfiles || []);
        }
      } catch (err) {
        console.error("Admin check failed", err);
      } finally {
        setLoading(false);
      }
    }
    checkAdminAndFetch();
  }, []);

  const toggleAdmin = async (userId: string, currentStatus: boolean) => {
    try {
      const newStatus = !currentStatus;
      const { error } = await supabase
        .from('profiles')
        .update({ is_admin: newStatus })
        .eq('id', userId);
        
      if (!error) {
        setProfiles(profiles.map(p => p.id === userId ? { ...p, is_admin: newStatus } : p));
      } else {
        console.error("Error updating admin status:", error);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredProfiles = profiles.filter(p => 
    (p.username && p.username.toLowerCase().includes(searchQuery.toLowerCase())) || 
    (p.email && p.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (p.display_name && p.display_name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF5E62]"></div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center font-sans px-4 text-center">
        <ShieldAlert className="w-16 h-16 text-stone-600 mb-6" />
        <h1 className="text-2xl font-bold tracking-tight text-white mb-2">Access Restricted</h1>
        <p className="text-stone-400 max-w-md">You do not have the required permissions to view the admin control panel.</p>
        <Link to="/dashboard" className="mt-8 px-6 py-2.5 bg-white text-black font-semibold rounded-full hover:bg-stone-200 transition-colors">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#3b82f6] to-[#8b5cf6] flex items-center justify-center shadow-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Admin Console</h1>
              <p className="text-stone-400">Manage users, roles, and platform settings</p>
            </div>
          </div>
          <Link to="/dashboard" className="px-5 py-2 bg-stone-900 border border-stone-800 rounded-full text-sm font-semibold hover:bg-stone-800 transition-colors">
            Exit Admin
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#1C1C1E] p-6 rounded-3xl border border-white/5">
            <Users className="w-8 h-8 text-blue-500 mb-4" />
            <h3 className="text-stone-400 font-medium">Total Users</h3>
            <p className="text-3xl font-bold mt-1">{profiles.length}</p>
          </div>
          <div className="bg-[#1C1C1E] p-6 rounded-3xl border border-white/5">
            <Shield className="w-8 h-8 text-purple-500 mb-4" />
             <h3 className="text-stone-400 font-medium">Platform Admins</h3>
            <p className="text-3xl font-bold mt-1">{profiles.filter(p => p.is_admin).length}</p>
          </div>
          <div className="bg-[#1C1C1E] p-6 rounded-3xl border border-white/5">
            <Activity className="w-8 h-8 text-orange-500 mb-4" />
             <h3 className="text-stone-400 font-medium">Active Subscriptions</h3>
            <p className="text-3xl font-bold mt-1">{profiles.filter(p => p.is_pro).length}</p>
          </div>
        </div>

        <div className="bg-[#1C1C1E] rounded-3xl border border-white/5 overflow-hidden">
          <div className="p-6 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h2 className="text-xl font-bold">User Management</h2>
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" />
              <input 
                type="text"
                placeholder="Search by username or email..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full md:w-80 bg-black border border-stone-800 rounded-full pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-[#3b82f6] transition-colors"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#111111] text-stone-400">
                <tr>
                  <th className="px-6 py-4 font-semibold">User</th>
                  <th className="px-6 py-4 font-semibold">Email</th>
                  <th className="px-6 py-4 font-semibold">Plan</th>
                  <th className="px-6 py-4 font-semibold">Joined Date</th>
                  <th className="px-6 py-4 font-semibold text-right">Admin Role</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredProfiles.map((p) => (
                  <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-stone-800 flex items-center justify-center text-xs font-bold text-stone-300 uppercase">
                          {p.username ? p.username.substring(0,2) : p.id.substring(0,2)}
                        </div>
                        <div>
                          <p className="font-bold text-white">{p.display_name || p.username || 'Unnamed User'}</p>
                          <p className="text-xs text-stone-500">@{p.username || 'No handle'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-stone-400">{p.email || '—'}</td>
                    <td className="px-6 py-4">
                       {p.is_pro ? (
                         <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-orange-500/20 text-orange-400">Pro</span>
                       ) : (
                         <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-stone-800 text-stone-400">Free</span>
                       )}
                    </td>
                    <td className="px-6 py-4 text-stone-500">
                      {new Date(p.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                       <button 
                         onClick={() => toggleAdmin(p.id, !!p.is_admin)}
                         className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${p.is_admin ? 'bg-blue-500' : 'bg-stone-700'}`}
                       >
                         <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${p.is_admin ? 'translate-x-6' : 'translate-x-1'}`} />
                       </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredProfiles.length === 0 && (
              <div className="p-12 text-center text-stone-500">
                No users found matching your search.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
