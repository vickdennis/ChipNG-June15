-- Run this in your Supabase SQL Editor

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  display_name TEXT,
  bio TEXT,
  phone TEXT,
  email TEXT,
  address TEXT,
  cover_image TEXT,
  avatar_image TEXT,
  is_admin BOOLEAN DEFAULT FALSE,
  is_pro BOOLEAN DEFAULT FALSE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create links table
CREATE TABLE public.links (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  platform TEXT NOT NULL,
  url TEXT NOT NULL,
  handle TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.links ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
CREATE POLICY "Public profiles are viewable by everyone."
  ON public.profiles FOR SELECT
  USING ( true );

CREATE POLICY "Users can insert their own profile."
  ON public.profiles FOR INSERT
  WITH CHECK ( auth.uid() = id );

CREATE POLICY "Users can update own profile."
  ON public.profiles FOR UPDATE
  USING ( auth.uid() = id );

CREATE POLICY "Admins can update any profile."
  ON public.profiles FOR UPDATE
  USING ( (SELECT is_admin FROM public.profiles WHERE id = auth.uid()) = true );

-- Trigger to auto-assign admin role to specific email
CREATE OR REPLACE FUNCTION public.set_admin_role()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.email = 'vickthor.dennis@gmail.com' THEN
    NEW.is_admin = true;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_profile_created_set_admin
  BEFORE INSERT ON public.profiles
  FOR EACH ROW EXECUTE PROCEDURE public.set_admin_role();
CREATE POLICY "Links are viewable by everyone."
  ON public.links FOR SELECT
  USING ( true );

CREATE POLICY "Users can insert own links."
  ON public.links FOR INSERT
  WITH CHECK ( auth.uid() = profile_id );

CREATE POLICY "Users can update own links."
  ON public.links FOR UPDATE
  USING ( auth.uid() = profile_id );

CREATE POLICY "Users can delete own links."
  ON public.links FOR DELETE
  USING ( auth.uid() = profile_id );

-- Storage bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('profile-images', 'profile-images', true);

-- Storage policies
CREATE POLICY "Profile images are publicly accessible"
  ON storage.objects FOR SELECT
  USING ( bucket_id = 'profile-images' );

CREATE POLICY "Anyone can upload profile images"
  ON storage.objects FOR INSERT
  WITH CHECK ( bucket_id = 'profile-images' AND auth.role() = 'authenticated' );

CREATE POLICY "Anyone can update their own profile images"
  ON storage.objects FOR UPDATE
  USING ( bucket_id = 'profile-images' AND auth.role() = 'authenticated' );
