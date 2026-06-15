import { supabase } from './supabase';

/**
 * 1. AUTHENTICATION & SESSION MANAGEMENT
 */

export const signUp = async (email: string, password: string, data?: object) => {
  const { data: authData, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data,
    },
  });
  if (error) throw error;
  return authData;
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data;
};

export const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
  });
  if (error) throw error;
  return data;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

export const getSession = async () => {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  return data.session;
};

/**
 * 2. LINKS (CRUD)
 */

export const getLinks = async (profileId: string) => {
  const { data, error } = await supabase
    .from('links')
    .select('*')
    .eq('profile_id', profileId)
    .order('display_order', { ascending: true });
  
  if (error) throw error;
  return data;
};

export const addLink = async (profileId: string, url: string, platformType: string, displayOrder: number) => {
  const { data, error } = await supabase
    .from('links')
    .insert([
      { profile_id: profileId, url, platform_type: platformType, display_order: displayOrder, is_active: true }
    ])
    .select();

  if (error) throw error;
  return data;
};

export const updateLinkOrder = async (linkUpdates: { id: string; display_order: number }[]) => {
  // Supabase doesn't support bulk updates easily via RPC without creating one, 
  // so doing standard loop for simplicity or upsert.
  const { data, error } = await supabase
    .from('links')
    .upsert(linkUpdates, { onConflict: 'id' })
    .select();

  if (error) throw error;
  return data;
};

export const updateLink = async (linkId: string, updates: any) => {
  const { data, error } = await supabase
    .from('links')
    .update(updates)
    .eq('id', linkId)
    .select();

  if (error) throw error;
  return data;
};

export const deleteLink = async (linkId: string) => {
  const { error } = await supabase
    .from('links')
    .delete()
    .eq('id', linkId);

  if (error) throw error;
};

/**
 * 3. PROFILES
 */

export const getProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) throw error;
  return data;
};

export const updateProfile = async (userId: string, updates: { bio?: string, theme_configuration?: object, business_name?: string }) => {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select();

  if (error) throw error;
  return data;
};

/**
 * 4. ANALYTICS
 */

export const trackClick = async (profileId: string, linkId?: string, country?: string, referrer?: string) => {
  const { data, error } = await supabase
    .from('analytics')
    .insert([
      {
        profile_id: profileId,
        link_id: linkId || null,
        country: country || 'Unknown',
        referrer: referrer || document.referrer || 'Direct'
      }
    ]);

  // Optionally log the error in production, but usually analytics shouldn't block the user
  if (error) console.error('Error tracking click:', error);
  return data;
};
