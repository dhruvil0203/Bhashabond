-- BhashaBond Database Schema
-- Run this in Supabase SQL Editor

-- ─── Languages ───
CREATE TABLE IF NOT EXISTS languages (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  native_name TEXT NOT NULL,
  icon TEXT,
  indictrans_code TEXT NOT NULL
);

-- ─── Cities ───
CREATE TABLE IF NOT EXISTS cities (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  state TEXT,
  language_id TEXT REFERENCES languages(id)
);

-- ─── Phrasebook Categories ───
CREATE TABLE IF NOT EXISTS phrasebook_categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  icon TEXT
);

-- ─── Pre-loaded Phrases ───
CREATE TABLE IF NOT EXISTS phrasebook_phrases (
  id SERIAL PRIMARY KEY,
  category_id TEXT REFERENCES phrasebook_categories(id),
  english TEXT NOT NULL,
  translations JSONB DEFAULT '{}'
);

-- ─── User Saved Phrases ───
CREATE TABLE IF NOT EXISTS user_phrases (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  source_lang TEXT,
  target_lang TEXT,
  source_text TEXT NOT NULL,
  translated_text TEXT NOT NULL,
  pronunciation TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ─── Translation History ───
CREATE TABLE IF NOT EXISTS translation_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  source_lang TEXT,
  target_lang TEXT,
  source_text TEXT NOT NULL,
  translated_text TEXT NOT NULL,
  pronunciation TEXT,
  device_id TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ─── Row Level Security ───
ALTER TABLE user_phrases ENABLE ROW LEVEL SECURITY;
ALTER TABLE translation_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own phrases" ON user_phrases
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own history" ON translation_history
  FOR ALL USING (auth.uid() = user_id);

-- Public read access for languages, cities, phrasebook
ALTER TABLE languages ENABLE ROW LEVEL SECURITY;
ALTER TABLE cities ENABLE ROW LEVEL SECURITY;
ALTER TABLE phrasebook_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE phrasebook_phrases ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read languages" ON languages FOR SELECT USING (true);
CREATE POLICY "Public read cities" ON cities FOR SELECT USING (true);
CREATE POLICY "Public read categories" ON phrasebook_categories FOR SELECT USING (true);
CREATE POLICY "Public read phrases" ON phrasebook_phrases FOR SELECT USING (true);
