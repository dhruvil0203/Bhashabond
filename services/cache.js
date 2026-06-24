import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from './api';

const CACHE_KEYS = {
  LANGUAGES: '@cache_languages',
  CITIES: '@cache_cities',
  PHRASEBOOK: '@cache_phrasebook',
  LAST_SYNC: '@cache_last_sync',
};

const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours

async function getCached(key) {
  try {
    const raw = await AsyncStorage.getItem(key);
    if (!raw) return null;

    const { data, timestamp } = JSON.parse(raw);
    const isExpired = Date.now() - timestamp > CACHE_TTL;

    return { data, isExpired };
  } catch {
    return null;
  }
}

async function setCache(key, data) {
  try {
    await AsyncStorage.setItem(
      key,
      JSON.stringify({ data, timestamp: Date.now() })
    );
  } catch (error) {
    console.warn('Cache write failed:', error);
  }
}

export const cache = {
  /**
   * Get languages — returns cached data immediately, refreshes from API if stale
   */
  getLanguages: async () => {
    const cached = await getCached(CACHE_KEYS.LANGUAGES);

    if (cached && !cached.isExpired) {
      return cached.data;
    }

    try {
      const fresh = await api.getLanguages();
      await setCache(CACHE_KEYS.LANGUAGES, fresh);
      return fresh;
    } catch (error) {
      // Offline fallback — return stale cache
      if (cached) return cached.data;
      // No cache at all — return hardcoded defaults
      return getDefaultLanguages();
    }
  },

  /**
   * Get cities — same cache-first strategy
   */
  getCities: async () => {
    const cached = await getCached(CACHE_KEYS.CITIES);

    if (cached && !cached.isExpired) {
      return cached.data;
    }

    try {
      const fresh = await api.getCities();
      await setCache(CACHE_KEYS.CITIES, fresh);
      return fresh;
    } catch (error) {
      if (cached) return cached.data;
      return getDefaultCities();
    }
  },

  /**
   * Get phrasebook phrases by category
   */
  getPhrasebook: async () => {
    const cached = await getCached(CACHE_KEYS.PHRASEBOOK);

    if (cached && !cached.isExpired) {
      return cached.data;
    }

    try {
      const fresh = await api.getPhrasebook();
      await setCache(CACHE_KEYS.PHRASEBOOK, fresh);
      return fresh;
    } catch (error) {
      if (cached) return cached.data;
      return getDefaultPhrasebook();
    }
  },

  /**
   * Force refresh all cached data
   */
  refreshAll: async () => {
    try {
      const [languages, cities, phrasebook] = await Promise.allSettled([
        api.getLanguages(),
        api.getCities(),
        api.getPhrasebook(),
      ]);

      if (languages.status === 'fulfilled') {
        await setCache(CACHE_KEYS.LANGUAGES, languages.value);
      }
      if (cities.status === 'fulfilled') {
        await setCache(CACHE_KEYS.CITIES, cities.value);
      }
      if (phrasebook.status === 'fulfilled') {
        await setCache(CACHE_KEYS.PHRASEBOOK, phrasebook.value);
      }

      await AsyncStorage.setItem(CACHE_KEYS.LAST_SYNC, Date.now().toString());
    } catch (error) {
      console.warn('Cache refresh failed:', error);
    }
  },

  /**
   * Clear all cached data
   */
  invalidateAll: async () => {
    await Promise.all(
      Object.values(CACHE_KEYS).map((key) => AsyncStorage.removeItem(key))
    );
  },

  /**
   * Get last sync timestamp
   */
  getLastSync: async () => {
    const ts = await AsyncStorage.getItem(CACHE_KEYS.LAST_SYNC);
    return ts ? parseInt(ts, 10) : null;
  },
};

// ─── Hardcoded Defaults (for first launch without network) ───

function getDefaultLanguages() {
  return [
    { id: 'hi', name: 'Hindi', native: 'हिन्दी', icon: '🪔', indictrans_code: 'hin_Deva' },
    { id: 'bn', name: 'Bengali', native: 'বাংলা', icon: '🌾', indictrans_code: 'ben_Beng' },
    { id: 'te', name: 'Telugu', native: 'తెలుగు', icon: '🏛️', indictrans_code: 'tel_Telu' },
    { id: 'mr', name: 'Marathi', native: 'मराठी', icon: '🏰', indictrans_code: 'mar_Deva' },
    { id: 'ta', name: 'Tamil', native: 'தமிழ்', icon: '🌴', indictrans_code: 'tam_Taml' },
    { id: 'gu', name: 'Gujarati', native: 'ગુજરાતી', icon: '🦁', indictrans_code: 'guj_Gujr' },
    { id: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ', icon: '🌺', indictrans_code: 'kan_Knda' },
    { id: 'ml', name: 'Malayalam', native: 'മലയാളം', icon: '🥥', indictrans_code: 'mal_Mlym' },
    { id: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ', icon: '🌾', indictrans_code: 'pan_Guru' },
    { id: 'or', name: 'Odia', native: 'ଓଡ଼ିଆ', icon: '🛞', indictrans_code: 'ory_Orya' },
    { id: 'as', name: 'Assamese', native: 'অসমীয়া', icon: '🦏', indictrans_code: 'asm_Beng' },
    { id: 'mai', name: 'Maithili', native: 'মৈথিলী', icon: '🪷', indictrans_code: 'mai_Deva' },
    { id: 'ur', name: 'Urdu', native: 'اردو', icon: '🕌', indictrans_code: 'urd_Arab' },
    { id: 'sd', name: 'Sindhi', native: 'سنڌي', icon: '🏜️', indictrans_code: 'snd_Arab' },
    { id: 'kok', name: 'Konkani', native: 'कोंकणी', icon: '🏖️', indictrans_code: 'kok_Deva' },
    { id: 'ne', name: 'Nepali', native: 'नेपाली', icon: '🏔️', indictrans_code: 'npi_Deva' },
    { id: 'mni', name: 'Manipuri', native: 'মণিপুরী', icon: '💃', indictrans_code: 'mni_Beng' },
    { id: 'brx', name: 'Bodo', native: 'बड़ो', icon: '🌳', indictrans_code: 'brx_Deva' },
    { id: 'sa', name: 'Sanskrit', native: 'संस्कृतम्', icon: '📜', indictrans_code: 'san_Deva' },
    { id: 'ks', name: 'Kashmiri', native: 'كٲشُر', icon: '⛵', indictrans_code: 'kas_Arab' },
    { id: 'en', name: 'English', native: 'English', icon: '🌐', indictrans_code: 'eng_Latn' },
  ];
}

function getDefaultCities() {
  return [
    { name: 'Mumbai', state: 'Maharashtra', language_id: 'mr' },
    { name: 'Delhi', state: 'Delhi', language_id: 'hi' },
    { name: 'Bengaluru', state: 'Karnataka', language_id: 'kn' },
    { name: 'Chennai', state: 'Tamil Nadu', language_id: 'ta' },
    { name: 'Kolkata', state: 'West Bengal', language_id: 'bn' },
    { name: 'Hyderabad', state: 'Telangana', language_id: 'te' },
    { name: 'Ahmedabad', state: 'Gujarat', language_id: 'gu' },
    { name: 'Pune', state: 'Maharashtra', language_id: 'mr' },
    { name: 'Jaipur', state: 'Rajasthan', language_id: 'hi' },
    { name: 'Lucknow', state: 'Uttar Pradesh', language_id: 'hi' },
    { name: 'Kochi', state: 'Kerala', language_id: 'ml' },
    { name: 'Chandigarh', state: 'Punjab', language_id: 'pa' },
    { name: 'Bhubaneswar', state: 'Odisha', language_id: 'or' },
    { name: 'Guwahati', state: 'Assam', language_id: 'as' },
    { name: 'Varanasi', state: 'Uttar Pradesh', language_id: 'hi' },
    { name: 'Panaji', state: 'Goa', language_id: 'kok' },
    { name: 'Srinagar', state: 'Jammu & Kashmir', language_id: 'ks' },
    { name: 'Imphal', state: 'Manipur', language_id: 'mni' },
    { name: 'Patna', state: 'Bihar', language_id: 'hi' },
    { name: 'Mysuru', state: 'Karnataka', language_id: 'kn' },
  ];
}

function getDefaultPhrasebook() {
  return {
    Food: [
      { id: 5, english: 'I am hungry', translations: {} },
      { id: 6, english: 'Give me water', translations: {} },
      { id: 7, english: 'Is it spicy?', translations: {} },
    ],
    Travel: [
      { id: 8, english: 'Where is the temple?', translations: {} },
      { id: 9, english: 'Go left', translations: {} },
      { id: 10, english: 'Go right', translations: {} },
    ],
    Emergency: [
      { id: 11, english: 'Help me', translations: {} },
      { id: 12, english: 'Call a doctor', translations: {} },
      { id: 13, english: 'I am lost', translations: {} },
    ],
    Shopping: [
      { id: 16, english: 'Please reduce the price', translations: {} },
    ],
  };
}
