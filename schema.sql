-- Create a table for public profiles
create table public.profiles (
  id uuid references auth.users not null primary key,
  username text unique,
  business_name text,
  bio text,
  avatar_url text,
  theme_configuration jsonb default '{"id": "default"}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up Row Level Security (RLS) for profiles
alter table public.profiles enable row level security;

create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

create policy "Users can insert their own profile." on profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on profiles
  for update using (auth.uid() = id);

-- Create a table for user links
create table public.links (
  id uuid default gen_random_uuid() primary key,
  profile_id uuid references public.profiles(id) on delete cascade not null,
  title text not null default '',
  url text not null,
  platform_type text not null default 'custom',
  display_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up Row Level Security (RLS) for links
alter table public.links enable row level security;

create policy "Links are viewable by everyone." on links
  for select using (true);

create policy "Users can insert their own links." on links
  for insert with check (auth.uid() = profile_id);

create policy "Users can update their own links." on links
  for update using (auth.uid() = profile_id);

create policy "Users can delete their own links." on links
  for delete using (auth.uid() = profile_id);


-- Create a table for analytics/click tracking
create table public.analytics (
  id uuid default gen_random_uuid() primary key,
  profile_id uuid references public.profiles(id) on delete cascade not null,
  link_id uuid references public.links(id) on delete cascade,
  country text default 'Unknown',
  referrer text default 'Direct',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up Row Level Security (RLS) for analytics
alter table public.analytics enable row level security;

create policy "Users can view their own analytics." on analytics
  for select using (auth.uid() = profile_id);

create policy "Anyone can insert analytics. (no auth required for logging clicks)" on analytics
  for insert with check (true);
  
-- Function and trigger to auto-create profile on signup
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username, business_name)
  values (
    new.id, 
    new.raw_user_meta_data->>'username', 
    new.raw_user_meta_data->>'business_name'
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
