-- BhashaBond Seed Data
-- Run this after 001_schema.sql

-- ─── Languages ───
INSERT INTO languages (id, name, native_name, icon, indictrans_code) VALUES
  ('en', 'English', 'English', '🌐', 'eng_Latn'),
  ('hi', 'Hindi', 'हिन्दी', '🪔', 'hin_Deva'),
  ('bn', 'Bengali', 'বাংলা', '🌾', 'ben_Beng'),
  ('te', 'Telugu', 'తెలుగు', '🏛️', 'tel_Telu'),
  ('mr', 'Marathi', 'मराठी', '🏰', 'mar_Deva'),
  ('ta', 'Tamil', 'தமிழ்', '🌴', 'tam_Taml'),
  ('gu', 'Gujarati', 'ગુજરાતી', '🦁', 'guj_Gujr'),
  ('kn', 'Kannada', 'ಕನ್ನಡ', '🌺', 'kan_Knda'),
  ('ml', 'Malayalam', 'മലയാളം', '🥥', 'mal_Mlym'),
  ('pa', 'Punjabi', 'ਪੰਜਾਬੀ', '🌾', 'pan_Guru'),
  ('or', 'Odia', 'ଓଡ଼ିଆ', '🛞', 'ory_Orya'),
  ('as', 'Assamese', 'অসমীয়া', '🦏', 'asm_Beng'),
  ('mai', 'Maithili', 'মৈথিলী', '🪷', 'mai_Deva'),
  ('ur', 'Urdu', 'اردو', '🕌', 'urd_Arab'),
  ('sd', 'Sindhi', 'سنڌي', '🏜️', 'snd_Arab'),
  ('kok', 'Konkani', 'कोंकणी', '🏖️', 'kok_Deva'),
  ('ne', 'Nepali', 'नेपाली', '🏔️', 'npi_Deva'),
  ('mni', 'Manipuri', 'মণিপুরী', '💃', 'mni_Beng'),
  ('brx', 'Bodo', 'बड़ो', '🌳', 'brx_Deva'),
  ('sa', 'Sanskrit', 'संस्कृतम्', '📜', 'san_Deva'),
  ('ks', 'Kashmiri', 'كٲشُر', '⛵', 'kas_Arab')
ON CONFLICT (id) DO NOTHING;

-- ─── Cities ───
INSERT INTO cities (name, state, language_id) VALUES
  ('Mumbai', 'Maharashtra', 'mr'),
  ('Delhi', 'Delhi', 'hi'),
  ('Bengaluru', 'Karnataka', 'kn'),
  ('Chennai', 'Tamil Nadu', 'ta'),
  ('Kolkata', 'West Bengal', 'bn'),
  ('Hyderabad', 'Telangana', 'te'),
  ('Ahmedabad', 'Gujarat', 'gu'),
  ('Pune', 'Maharashtra', 'mr'),
  ('Jaipur', 'Rajasthan', 'hi'),
  ('Lucknow', 'Uttar Pradesh', 'hi'),
  ('Kochi', 'Kerala', 'ml'),
  ('Chandigarh', 'Punjab', 'pa'),
  ('Bhubaneswar', 'Odisha', 'or'),
  ('Guwahati', 'Assam', 'as'),
  ('Varanasi', 'Uttar Pradesh', 'hi'),
  ('Panaji', 'Goa', 'kok'),
  ('Srinagar', 'Jammu & Kashmir', 'ks'),
  ('Imphal', 'Manipur', 'mni'),
  ('Patna', 'Bihar', 'hi'),
  ('Mysuru', 'Karnataka', 'kn');

-- ─── Phrasebook Categories ───
INSERT INTO phrasebook_categories (id, name, icon) VALUES
  ('Greetings', 'Greetings', '🙏'),
  ('Food', 'Food', '🍛'),
  ('Travel', 'Travel', '🚗'),
  ('Emergency', 'Emergency', '🚨'),
  ('Shopping', 'Shopping', '🛍️')
ON CONFLICT (id) DO NOTHING;
