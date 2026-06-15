export const sqlSchema = `
-- Custom Types
CREATE TYPE platform_type AS ENUM ('twitter', 'instagram', 'linkedin', 'github', 'website', 'other');

-- Table: profiles
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  business_name TEXT,
  bio TEXT,
  avatar_url TEXT,
  banner_url TEXT,
  theme_configuration JSONB DEFAULT '{}'::jsonb,
  verified_status BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table: links
CREATE TABLE links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  platform_type platform_type DEFAULT 'other',
  url TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table: analytics
CREATE TABLE analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  link_id UUID REFERENCES links(id) ON DELETE SET NULL,
  click_timestamp TIMESTAMPTZ DEFAULT NOW(),
  country TEXT,
  referrer TEXT
);

-- RLS SETUP
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE links ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
CREATE POLICY "Public profiles are viewable by everyone."
  ON profiles FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile."
  ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile."
  ON profiles FOR UPDATE USING (auth.uid() = id);

-- Links Policies
CREATE POLICY "Public links viewable by everyone."
  ON links FOR SELECT USING (true);

CREATE POLICY "Users can manage their own links."
  ON links FOR ALL USING (auth.uid() = profile_id);

-- Analytics Policies
CREATE POLICY "Anyone can insert analytics clicks"
  ON analytics FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can view own analytics."
  ON analytics FOR SELECT USING (auth.uid() = profile_id);
`.trim();

export const authInstructions = `
# CHIP NG - Supabase Auth Configuration

To configure Supabase Auth for CHIP NG, complete the following steps in your Supabase project dashboard under \`Authentication > Providers\`.

### 1. Email & Password
- **Status:** Enabled by default.
- **Action:** Open \`Auth -> Providers -> Email\`. Configure "Confirm email" according to your desired user onboarding flow.
- Customize your email templates in \`Auth -> Email Templates\` to brand the verification emails for CHIP NG.

### 2. Google OAuth
- Go to the [Google Cloud Console](https://console.cloud.google.com/) and create a new project.
- Navigate to \`APIs & Services > Credentials\`.
- Click \`Create Credentials\` -> \`OAuth client ID\` (Application type: Web application).
- Add your Supabase project's redirect URI under "Authorized redirect URIs":
  ➔ \`https://<project-ref>.supabase.co/auth/v1/callback\`
- Copy the generated **Client ID** and **Client Secret**.
- Return to Supabase: \`Auth -> Providers -> Google\`. Toggle it ON, paste the ID and Secret, and Save.

### 3. Apple OAuth
- Go to the [Apple Developer Portal](https://developer.apple.com/) -> \`Certificates, Identifiers & Profiles\`.
- **App ID:** Create a new App ID for CHIP NG.
- **Services ID:** Create a Services ID. Configure "Sign In with Apple" and provide your Supabase domain and the Return URL: 
  ➔ \`https://<project-ref>.supabase.co/auth/v1/callback\`
- **Keys:** Register a new Key for "Sign In with Apple". Download the \`.p8\` private key file.
- Return to Supabase: \`Auth -> Providers -> Apple\`. Complete the form with your **Services ID (Client ID)**, **Team ID**, **Key ID**, and the contents of the **Private Key file**.
`.trim();
