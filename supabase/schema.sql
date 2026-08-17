-- Trippy Mates — Supabase Schema
-- Run this in your Supabase SQL Editor (Dashboard > SQL Editor > New Query)

-- ══════════════════════════════════════════════════════════════════════════════
-- TABLES
-- ══════════════════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS trips (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  destination TEXT NOT NULL,
  country TEXT NOT NULL DEFAULT 'India',
  image_url TEXT,
  duration_days INT NOT NULL DEFAULT 1,
  price_per_person INT NOT NULL DEFAULT 0,
  max_travelers INT NOT NULL DEFAULT 20,
  current_travelers INT NOT NULL DEFAULT 0,
  start_date DATE,
  end_date DATE,
  type TEXT NOT NULL CHECK (type IN ('domestic', 'international', 'corporate')),
  category TEXT NOT NULL DEFAULT 'adventure',
  rating NUMERIC(2,1) NOT NULL DEFAULT 0,
  review_count INT NOT NULL DEFAULT 0,
  available_captains INT NOT NULL DEFAULT 0,
  description TEXT,
  highlights TEXT[] DEFAULT '{}',
  inclusions TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS captains (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  photo_url TEXT,
  country TEXT NOT NULL DEFAULT 'India',
  city TEXT NOT NULL,
  languages TEXT[] DEFAULT '{}',
  expertise TEXT[] DEFAULT '{}',
  rating NUMERIC(2,1) NOT NULL DEFAULT 0,
  review_count INT NOT NULL DEFAULT 0,
  hourly_rate INT NOT NULL DEFAULT 0,
  availability TEXT NOT NULL DEFAULT 'available' CHECK (availability IN ('available', 'busy', 'offline')),
  bio TEXT,
  verified BOOLEAN NOT NULL DEFAULT false,
  category TEXT NOT NULL DEFAULT 'adventure' CHECK (category IN ('adventure', 'luxury', 'cultural', 'food', 'budget', 'nature', 'trekking')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT,
  text TEXT NOT NULL,
  avatar_color TEXT DEFAULT '#007AFF',
  avatar_initial TEXT,
  rating INT NOT NULL DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
  destination TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS destinations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  country TEXT NOT NULL DEFAULT 'India',
  color TEXT DEFAULT '#007AFF',
  secondary_color TEXT DEFAULT '#0056CC',
  image_url TEXT,
  price INT NOT NULL DEFAULT 0,
  rating NUMERIC(2,1) NOT NULL DEFAULT 0,
  captains INT NOT NULL DEFAULT 0,
  trip_count INT NOT NULL DEFAULT 0,
  badge TEXT,
  type TEXT NOT NULL DEFAULT 'domestic' CHECK (type IN ('domestic', 'international')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS custom_trip_enquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  destination TEXT NOT NULL,
  start_date DATE,
  end_date DATE,
  travelers INT NOT NULL DEFAULT 1,
  budget_range TEXT,
  trip_type TEXT,
  captain_required TEXT NOT NULL DEFAULT 'not_sure' CHECK (captain_required IN ('yes', 'no', 'not_sure')),
  captain_type TEXT,
  accommodation_needed BOOLEAN NOT NULL DEFAULT false,
  transport_needed BOOLEAN NOT NULL DEFAULT false,
  additional_requirements TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'planning', 'completed', 'cancelled')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ══════════════════════════════════════════════════════════════════════════════
-- ROW LEVEL SECURITY
-- ══════════════════════════════════════════════════════════════════════════════

ALTER TABLE trips ENABLE ROW LEVEL SECURITY;
ALTER TABLE captains ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE custom_trip_enquiries ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Public read trips" ON trips FOR SELECT USING (true);
CREATE POLICY "Public read captains" ON captains FOR SELECT USING (true);
CREATE POLICY "Public read testimonials" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Public read destinations" ON destinations FOR SELECT USING (true);

-- Public insert for enquiries (anyone can submit a custom trip form)
CREATE POLICY "Public insert enquiries" ON custom_trip_enquiries FOR INSERT WITH CHECK (true);

-- Admin full access (user must have role = 'admin' in raw_app_meta_data)
CREATE POLICY "Admin manage trips" ON trips FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin' OR (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admin manage captains" ON captains FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin' OR (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admin manage testimonials" ON testimonials FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin' OR (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admin manage destinations" ON destinations FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin' OR (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admin manage enquiries" ON custom_trip_enquiries FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin' OR (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- ══════════════════════════════════════════════════════════════════════════════
-- STORAGE (run separately if needed)
-- ══════════════════════════════════════════════════════════════════════════════
-- Create a public bucket named 'images' in Supabase Dashboard > Storage
-- Then run:
-- CREATE POLICY "Public read images" ON storage.objects FOR SELECT USING (bucket_id = 'images');
-- CREATE POLICY "Admin upload images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'images' AND (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
-- CREATE POLICY "Admin delete images" ON storage.objects FOR DELETE USING (bucket_id = 'images' AND (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
