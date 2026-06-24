/**
 * Offline-first Translation Service
 *
 * Priority order:
 *   1. Built-in offline dictionary (instant, no internet needed)
 *   2. Google Cloud Translation API via backend (any phrase, all 22+ languages)
 *
 * Set GOOGLE_TRANSLATE_API_KEY in backend/.env to use the official Cloud API.
 * Without a key the backend automatically uses the free Google Translate endpoint.
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { romanize } from './romanizer';

// Cache configuration
const CACHE_LIMIT = 500;
let inMemoryCache = null;

async function loadCache() {
  if (inMemoryCache !== null) return inMemoryCache;
  try {
    const raw = await AsyncStorage.getItem('@dynamic_translation_cache');
    inMemoryCache = raw ? JSON.parse(raw) : {};
  } catch (err) {
    console.warn('[Translation Cache] Load failed:', err);
    inMemoryCache = {};
  }
  return inMemoryCache;
}

async function saveCache(cacheData) {
  try {
    await AsyncStorage.setItem('@dynamic_translation_cache', JSON.stringify(cacheData));
  } catch (error) {
    console.warn('[Translation Cache] Save failed:', error);
  }
}

async function getCachedTranslation(sourceText, sourceLangCode, targetLangCode) {
  const cache = await loadCache();
  const key = `${sourceLangCode}_${targetLangCode}_${sourceText.trim().toLowerCase()}`;
  return cache[key] || null;
}

async function setCachedTranslation(sourceText, sourceLangCode, targetLangCode, result) {
  const cache = await loadCache();
  const key = `${sourceLangCode}_${targetLangCode}_${sourceText.trim().toLowerCase()}`;
  cache[key] = result;

  // Manage cache size: limit to CACHE_LIMIT entries (FIFO-like behavior)
  const keys = Object.keys(cache);
  if (keys.length > CACHE_LIMIT) {
    delete cache[keys[0]];
  }

  await saveCache(cache);
}

// Candidates for backend URL (checked in order)
// Priority: Environment variable > Production > Development
const RENDER_URL = process.env.EXPO_PUBLIC_API_URL || 'https://bhashabond-api.onrender.com';

const CANDIDATE_URLS = [
  RENDER_URL,                           // Production: Deployed on Render (works globally)
  'http://192.168.0.101:8000',          // Local Wi-Fi IP (for development)
  'http://localhost:8000',              // Simulator/web
  'http://10.0.2.2:8000',               // Android emulator
  'http://172.31.16.1:8000',            // WSL environment
];

let activeApiBase = RENDER_URL; // Default to production
let isProbing = false;
let hasProbed = false;

export async function probeBackend() {
  if (hasProbed) return activeApiBase;
  if (isProbing) return activeApiBase;
  
  isProbing = true;
  console.log('[Translation Service] Probing backend URLs...');
  
  for (const url of CANDIDATE_URLS) {
    try {
      const controller = new AbortController();
      // Use longer timeout for production URLs (Render can be slower on free tier)
      const timeout = url.includes('https://') ? 3000 : 600;
      const id = setTimeout(() => controller.abort(), timeout);
      const res = await fetch(`${url}/api/health`, { signal: controller.signal });
      clearTimeout(id);
      if (res.ok) {
        activeApiBase = url;
        console.log('[Translation Service] Found active backend at:', url);
        isProbing = false;
        hasProbed = true;
        return url;
      }
    } catch (e) {
      // Ignore and try next
    }
  }
  
  isProbing = false;
  hasProbed = true;
  console.warn('[Translation Service] No running backend found. Using fallback:', activeApiBase);
  return activeApiBase;
}

// Trigger background probe early
probeBackend().catch(() => {});

// Language code mapping (display name → IndicTrans2 code)
// 22 Scheduled Languages of India + English
const LANG_CODES = {
  Hindi: 'hin_Deva',
  Bengali: 'ben_Beng',
  Telugu: 'tel_Telu',
  Marathi: 'mar_Deva',
  Tamil: 'tam_Taml',
  Gujarati: 'guj_Gujr',
  Kannada: 'kan_Knda',
  Malayalam: 'mal_Mlym',
  Punjabi: 'pan_Guru',
  Odia: 'ory_Orya',
  Assamese: 'asm_Beng',
  Maithili: 'mai_Deva',
  Urdu: 'urd_Arab',
  Sindhi: 'snd_Arab',
  Konkani: 'kok_Deva',
  Nepali: 'npi_Deva',
  Manipuri: 'mni_Beng',
  Bodo: 'brx_Deva',
  Sanskrit: 'san_Deva',
  Kashmiri: 'kas_Arab',
  Dogri: 'doi_Deva',
  Santali: 'sat_Olck',
  English: 'eng_Latn',
};

export function getLangCode(langName) {
  return LANG_CODES[langName] || null;
}

/**
 * Translate text — offline dictionary first, then Google Translate API fallback.
 *
 * @param {string} sourceText - Text to translate
 * @param {string} sourceLang - Display name of source language (e.g. 'English')
 * @param {string} targetLang - Display name of target language (e.g. 'Hindi')
 * @returns {{ translatedText: string, pronunciation: string, source: 'offline'|'google' }}
 */
export async function translate(sourceText, sourceLang, targetLang) {
  if (!sourceText || !sourceText.trim()) {
    throw new Error('No text to translate');
  }

  const sourceLangCode = getLangCode(sourceLang);
  const targetLangCode = getLangCode(targetLang);

  if (!sourceLangCode || !targetLangCode) {
    throw new Error(`Unsupported language pair: ${sourceLang} \u2192 ${targetLang}`);
  }

  if (sourceLangCode === targetLangCode) {
    return { translatedText: sourceText, pronunciation: sourceText, source: 'offline' };
  }

  // ── Step 1: Offline dictionary (instant, no network) ──────────────────────────
  const dictResult = lookupDictionary(sourceText, sourceLangCode, targetLangCode);
  if (dictResult) {
    return {
      translatedText: dictResult.text,
      pronunciation: dictResult.pronunciation || romanize(dictResult.text, targetLangCode),
      source: 'offline',
    };
  }

  // ── Step 1.5: Dynamic Cache (local persistent cache) ─────────────────────────
  const cached = await getCachedTranslation(sourceText, sourceLangCode, targetLangCode);
  if (cached) {
    console.log('[Translation Service] Cache hit:', sourceText);
    return cached;
  }

  // ── Step 2: Google Translate via backend API (any phrase, all languages) ──────
  try {
    // Dynamically probe backend URL
    const API_BASE = await probeBackend();

    const controller = new AbortController();
    // Use longer timeout for production (Render free tier can be slower)
    const timeout = API_BASE.includes('https://') ? 15000 : 5000;
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    const response = await fetch(`${API_BASE}/api/translate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: sourceText,
        source_lang: sourceLangCode,
        target_lang: targetLangCode,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      console.warn('[Google Translate API]', error.detail || response.status);
      throw new Error('API_ERROR');
    }

    const data = await response.json();
    const result = {
      translatedText: data.translated_text,
      pronunciation: romanize(data.translated_text, targetLangCode),
      source: data.source || 'google',
    };

    // Cache the successful result asynchronously
    setCachedTranslation(sourceText, sourceLangCode, targetLangCode, result).catch(() => {});

    return result;
  } catch (error) {
    console.warn('[Translation]', error.message);
    
    // ── Step 3: Offline Pivot Translation (Indian Lang → English → Indian Lang) ──
    // If online translation fails and we're translating between two non-English languages,
    // try pivot translation through English using the offline dictionary
    if (sourceLangCode !== 'eng_Latn' && targetLangCode !== 'eng_Latn') {
      console.log('[Translation Service] Attempting offline pivot translation via English...');
      
      // Step 3a: Source → English
      const sourceToEnglish = lookupDictionary(sourceText, sourceLangCode, 'eng_Latn');
      
      if (sourceToEnglish) {
        console.log('[Translation Service] Found source → English:', sourceToEnglish.text);
        
        // Step 3b: English → Target
        const englishToTarget = lookupDictionary(sourceToEnglish.text, 'eng_Latn', targetLangCode);
        
        if (englishToTarget) {
          console.log('[Translation Service] Found English → target, pivot translation successful');
          return {
            translatedText: englishToTarget.text,
            pronunciation: englishToTarget.pronunciation || romanize(englishToTarget.text, targetLangCode),
            source: 'offline',
          };
        } else {
          console.warn('[Translation Service] Pivot failed: No English → target translation');
          throw new Error('OFFLINE_PIVOT_FAILED_STAGE2');
        }
      } else {
        console.warn('[Translation Service] Pivot failed: No source → English translation');
        throw new Error('OFFLINE_PIVOT_FAILED_STAGE1');
      }
    }
    
    throw new Error('TRANSLATION_FAILED');
  }
}

export function getSupportedLanguages() {
  return Object.entries(LANG_CODES).map(([name, code]) => ({ name, code }));
}

// ─── Built-in Offline Dictionary ───
// 40+ common travel phrases × 22 Indian languages = instant offline translations

const OFFLINE_DICTIONARY = {
  'hello': {
    hin_Deva: { text: 'नमस्ते', pronunciation: 'Namaste' },
    ben_Beng: { text: 'নমস্কার', pronunciation: 'Nomoshkar' },
    tel_Telu: { text: 'నమస్కారం', pronunciation: 'Namaskāram' },
    mar_Deva: { text: 'नमस्कार', pronunciation: 'Namaskār' },
    tam_Taml: { text: 'வணக்கம்', pronunciation: 'Vanakkam' },
    guj_Gujr: { text: 'નમસ્તે', pronunciation: 'Namaste' },
    kan_Knda: { text: 'ನಮಸ್ಕಾರ', pronunciation: 'Namaskāra' },
    mal_Mlym: { text: 'നമസ്കാരം', pronunciation: 'Namaskāram' },
    pan_Guru: { text: 'ਸਤ ਸ੍ਰੀ ਅਕਾਲ', pronunciation: 'Sat Srī Akāl' },
    ory_Orya: { text: 'ନମସ୍କାର', pronunciation: 'Namaskāra' },
    asm_Beng: { text: 'নমস্কাৰ', pronunciation: 'Nomoshkar' },
    mai_Deva: { text: 'नमस्कार', pronunciation: 'Namaskār' },
    urd_Arab: { text: 'السلام علیکم', pronunciation: 'Assalamu Alaikum' },
    snd_Arab: { text: 'السلام عليڪم', pronunciation: 'Assalamu Alaikum' },
    kok_Deva: { text: 'नमस्कार', pronunciation: 'Namaskār' },
    npi_Deva: { text: 'नमस्ते', pronunciation: 'Namaste' },
    mni_Beng: { text: 'ꯈꯨꯔꯨꯝꯖꯔꯤ', pronunciation: 'Khurumjari' },
    brx_Deva: { text: 'आयो', pronunciation: 'Ayo' },
    san_Deva: { text: 'नमस्ते', pronunciation: 'Namaste' },
    kas_Arab: { text: 'السلام علیکم', pronunciation: 'Assalamu Alaikum' },
    doi_Deva: { text: 'नमस्कार', pronunciation: 'Namaskār' },
    sat_Olck: { text: 'ᱡᱚᱦᱟᱨ', pronunciation: 'Johar' },
  },
  'good morning': {
    hin_Deva: { text: 'सुप्रभात', pronunciation: 'Suprabhāt' },
    ben_Beng: { text: 'সুপ্রভাত', pronunciation: 'Suprabhāt' },
    tel_Telu: { text: 'శుభోదయం', pronunciation: 'Shubhōdayam' },
    mar_Deva: { text: 'सुप्रभात', pronunciation: 'Suprabhāt' },
    tam_Taml: { text: 'காலை வணக்கம்', pronunciation: 'Kālai vanakkam' },
    guj_Gujr: { text: 'સુપ્રભાત', pronunciation: 'Suprabhāt' },
    kan_Knda: { text: 'ಶುಭೋದಯ', pronunciation: 'Shubhōdaya' },
    mal_Mlym: { text: 'സുപ്രഭാതം', pronunciation: 'Suprabhātham' },
    pan_Guru: { text: 'ਸ਼ੁਭ ਸਵੇਰ', pronunciation: 'Shubh saver' },
    ory_Orya: { text: 'ଶୁଭ ପ୍ରଭାତ', pronunciation: 'Shubha prabhāta' },
    asm_Beng: { text: 'সুপ্ৰভাত', pronunciation: 'Suprabhāt' },
    mai_Deva: { text: 'शुभ प्रभात', pronunciation: 'Shubh prabhāt' },
    urd_Arab: { text: 'صبح بخیر', pronunciation: 'Subah bakhair' },
    snd_Arab: { text: 'صبح جو سلام', pronunciation: 'Subah jo salām' },
    kok_Deva: { text: 'शुभ प्रभात', pronunciation: 'Shubh prabhāt' },
    npi_Deva: { text: 'शुभ प्रभात', pronunciation: 'Shubh prabhāt' },
    mni_Beng: { text: 'ꯅꯨꯃꯤꯠ ꯈꯨꯝꯅ', pronunciation: 'Numit khumna' },
    brx_Deva: { text: 'सुबुं', pronunciation: 'Subung' },
    san_Deva: { text: 'सुप्रभातम्', pronunciation: 'Suprabhātam' },
    kas_Arab: { text: 'صبح بخیر', pronunciation: 'Subah bakhair' },
    doi_Deva: { text: 'शुभ प्रभात', pronunciation: 'Shubh prabhāt' },
    sat_Olck: { text: 'ᱥᱮᱛᱟᱜ ᱡᱚᱦᱟᱨ', pronunciation: 'Setag johar' },
  },
  'good night': {
    hin_Deva: { text: 'शुभ रात्रि', pronunciation: 'Shubh rātri' },
    ben_Beng: { text: 'শুভ রাত্রি', pronunciation: 'Shubho rātri' },
    tel_Telu: { text: 'శుభ రాత్రి', pronunciation: 'Śubha rātri' },
    mar_Deva: { text: 'शुभ रात्री', pronunciation: 'Shubh rātrī' },
    tam_Taml: { text: 'இனிய இரவு', pronunciation: 'Iniya iravu' },
    guj_Gujr: { text: 'શુભ રાત્રી', pronunciation: 'Shubh rātrī' },
    kan_Knda: { text: 'ಶುಭ ರಾತ್ರಿ', pronunciation: 'Śubha rātri' },
    mal_Mlym: { text: 'ശുഭ രാത്രി', pronunciation: 'Shubha rātri' },
    pan_Guru: { text: 'ਸ਼ੁਭ ਰਾਤ', pronunciation: 'Shubh rāt' },
    ory_Orya: { text: 'ଶୁଭ ରାତ୍ରି', pronunciation: 'Shubha rātri' },
    asm_Beng: { text: 'শুভ ৰাতি', pronunciation: 'Shubho rāti' },
    mai_Deva: { text: 'शुभ रात्रि', pronunciation: 'Shubh rātri' },
    urd_Arab: { text: 'شب بخیر', pronunciation: 'Shab bakhair' },
    snd_Arab: { text: 'رات جو سلام', pronunciation: 'Rāt jo salām' },
    kok_Deva: { text: 'शुभ रात्री', pronunciation: 'Shubh rātrī' },
    npi_Deva: { text: 'शुभ रात्री', pronunciation: 'Shubh rātrī' },
    mni_Beng: { text: 'ꯅꯨꯃꯤꯗꯥꯡ ꯈꯨꯝꯅ', pronunciation: 'Numidang khumna' },
    brx_Deva: { text: 'गाबुं', pronunciation: 'Gabung' },
    san_Deva: { text: 'शुभ रात्रिः', pronunciation: 'Shubh rātriḥ' },
    kas_Arab: { text: 'شب بخیر', pronunciation: 'Shab bakhair' },
    doi_Deva: { text: 'शुभ रात्री', pronunciation: 'Shubh rātrī' },
    sat_Olck: { text: 'ᱧᱤᱫᱟ ᱡᱚᱦᱟᱨ', pronunciation: 'Nida johar' },
  },
  'thank you': {
    hin_Deva: { text: 'धन्यवाद', pronunciation: 'Dhanyavād' },
    ben_Beng: { text: 'ধন্যবাদ', pronunciation: 'Dhonnobad' },
    tel_Telu: { text: 'ధన్యవాదాలు', pronunciation: 'Dhanyavādālu' },
    mar_Deva: { text: 'धन्यवाद', pronunciation: 'Dhanyavād' },
    tam_Taml: { text: 'நன்றி', pronunciation: 'Nandri' },
    guj_Gujr: { text: 'આભાર', pronunciation: 'Āabhaar' },
    kan_Knda: { text: 'ಧನ್ಯವಾದ', pronunciation: 'Dhanyavāda' },
    mal_Mlym: { text: 'നന്ദി', pronunciation: 'Nandi' },
    pan_Guru: { text: 'ਧੰਨਵਾਦ', pronunciation: 'Dhannvād' },
    ory_Orya: { text: 'ଧନ୍ୟବାଦ', pronunciation: 'Dhanyavāda' },
    asm_Beng: { text: 'ধন্যবাদ', pronunciation: 'Dhanyavād' },
    mai_Deva: { text: 'धन्यवाद', pronunciation: 'Dhanyavād' },
    urd_Arab: { text: 'شکریہ', pronunciation: 'Shukriya' },
    snd_Arab: { text: 'مهرباني', pronunciation: 'Meharbānī' },
    kok_Deva: { text: 'देव बरें करूं', pronunciation: 'Dev baren karun' },
    npi_Deva: { text: 'धन्यवाद', pronunciation: 'Dhanyavād' },
    mni_Beng: { text: 'ꯊꯥꯒꯠꯆꯔꯤ', pronunciation: 'Thagatchari' },
    brx_Deva: { text: 'मिथाइ', pronunciation: 'Mithai' },
    san_Deva: { text: 'धन्यवादः', pronunciation: 'Dhanyavādaḥ' },
    kas_Arab: { text: 'شکریہ', pronunciation: 'Shukriya' },
    doi_Deva: { text: 'धन्नवाद', pronunciation: 'Dhannvād' },
    sat_Olck: { text: 'ᱥᱟᱨᱦᱟᱣ', pronunciation: 'Sarhaw' },
  },
  'how are you': {
    hin_Deva: { text: 'आप कैसे हैं?', pronunciation: 'Āp kaise hain?' },
    ben_Beng: { text: 'কেমন আছেন?', pronunciation: 'Kemon āchhen?' },
    tel_Telu: { text: 'ఎలా ఉన్నారు?', pronunciation: 'Elā unnāru?' },
    mar_Deva: { text: 'तुम्ही कसे आहात?', pronunciation: 'Tumhī kase āhāt?' },
    tam_Taml: { text: 'எப்படி இருக்கீர்கள்?', pronunciation: 'Eppadi irukkīrgal?' },
    guj_Gujr: { text: 'તમે કેમ છો?', pronunciation: 'Tame kem chho?' },
    kan_Knda: { text: 'ಹೇಗಿದ್ದೀರಾ?', pronunciation: 'Hēgiddīrā?' },
    mal_Mlym: { text: 'സുഖമാണോ?', pronunciation: 'Sukhamāṇō?' },
    pan_Guru: { text: 'ਤੁਸੀਂ ਕਿਵੇਂ ਹੋ?', pronunciation: 'Tusīn kiven ho?' },
    ory_Orya: { text: 'ଆପଣ କେମିତି ଅଛନ୍ତି?', pronunciation: 'Āpaṇa kemiti achhanti?' },
    asm_Beng: { text: 'আপুনি কেনেকৈ আছে?', pronunciation: 'Āpuni kenekoi āchhe?' },
    mai_Deva: { text: 'अहाँ कोना छी?', pronunciation: 'Ahān konā chhī?' },
    urd_Arab: { text: 'آپ کیسے ہیں?', pronunciation: 'Āp kaise hain?' },
    snd_Arab: { text: 'توهان ڪيئن آهيو?', pronunciation: 'Tavhān kiyan āhiyo?' },
    kok_Deva: { text: 'तुवें कसो आसात?', pronunciation: 'Tuven kaso āsāt?' },
    npi_Deva: { text: 'तपाईं कस्तो हुनुहुन्छ?', pronunciation: 'Tapāīn kasto hunuhunchha?' },
    mni_Beng: { text: 'ꯅꯪ ꯀꯔꯝꯅ ꯂꯩꯕꯒꯦ?', pronunciation: 'Nang karamna leibage?' },
    brx_Deva: { text: 'नों खौरांनो?', pronunciation: 'Non khaurāno?' },
    san_Deva: { text: 'भवान् कथम् अस्ति?', pronunciation: 'Bhavān katham asti?' },
    kas_Arab: { text: 'توہ کیتھ چھو?', pronunciation: 'Toh keth chho?' },
    doi_Deva: { text: 'तुस किदां हो?', pronunciation: 'Tus kidān ho?' },
    sat_Olck: { text: 'ᱟᱢ ᱪᱮᱫᱽ ᱞᱮᱠᱟᱢ ᱢᱮᱱᱟᱢᱟ?', pronunciation: 'Am ched lekam menama?' },
  },
  'how are you?': {
    hin_Deva: { text: 'आप कैसे हैं?', pronunciation: 'Āp kaise hain?' },
    ben_Beng: { text: 'কেমন আছেন?', pronunciation: 'Kemon āchhen?' },
    tel_Telu: { text: 'ఎలా ఉన్నారు?', pronunciation: 'Elā unnāru?' },
    mar_Deva: { text: 'तुम्ही कसे आहात?', pronunciation: 'Tumhī kase āhāt?' },
    tam_Taml: { text: 'எப்படி இருக்கீர்கள்?', pronunciation: 'Eppadi irukkīrgal?' },
    guj_Gujr: { text: 'તમે કેમ છો?', pronunciation: 'Tame kem chho?' },
    kan_Knda: { text: 'ಹೇಗಿದ್ದೀರಾ?', pronunciation: 'Hēgiddīrā?' },
    mal_Mlym: { text: 'സുഖമാണോ?', pronunciation: 'Sukhamāṇō?' },
    pan_Guru: { text: 'ਤੁਸੀਂ ਕਿਵੇਂ ਹੋ?', pronunciation: 'Tusīn kiven ho?' },
    ory_Orya: { text: 'ଆପଣ କେମିତି ଅଛନ୍ତି?', pronunciation: 'Āpaṇa kemiti achhanti?' },
    asm_Beng: { text: 'আপুনি কেনেকৈ আছে?', pronunciation: 'Āpuni kenekoi āchhe?' },
    mai_Deva: { text: 'अहाँ कोना छी?', pronunciation: 'Ahān konā chhī?' },
    urd_Arab: { text: 'آپ کیسے ہیں?', pronunciation: 'Āp kaise hain?' },
    snd_Arab: { text: 'توهان ڪيئن آهيو?', pronunciation: 'Tavhān kiyan āhiyo?' },
    kok_Deva: { text: 'तुवें कसो आसात?', pronunciation: 'Tuven kaso āsāt?' },
    npi_Deva: { text: 'तपाईं कस्तो हुनुहुन्छ?', pronunciation: 'Tapāīn kasto hunuhunchha?' },
    mni_Beng: { text: 'ꯅꯪ ꯀꯔꯝꯅ ꯂꯩꯕꯒꯦ?', pronunciation: 'Nang karamna leibage?' },
    brx_Deva: { text: 'नों खौरांनो?', pronunciation: 'Non khaurāno?' },
    san_Deva: { text: 'भवान् कथम् अस्ति?', pronunciation: 'Bhavān katham asti?' },
    kas_Arab: { text: 'توہ کیتھ چھو?', pronunciation: 'Toh keth chho?' },
    doi_Deva: { text: 'तुस किदां हो?', pronunciation: 'Tus kidān ho?' },
    sat_Olck: { text: 'ᱟᱢ ᱪᱮᱫᱽ ᱞᱮᱠᱟᱢ ᱢᱮᱱᱟᱢᱟ?', pronunciation: 'Am ched lekam menama?' },
  },
  'i am fine': {
    hin_Deva: { text: 'मैं ठीक हूँ', pronunciation: 'Main ṭhīk hoon' },
    ben_Beng: { text: 'আমি ভালো আছি', pronunciation: 'Āmi bhālo āchhi' },
    tel_Telu: { text: 'నేను బాగున్నాను', pronunciation: 'Nēnu bāgunnānu' },
    mar_Deva: { text: 'मी ठीक आहे', pronunciation: 'Mī ṭhīk āhe' },
    tam_Taml: { text: 'நான் நலமாக இருக்கிறேன்', pronunciation: 'Nān nalamāga irukkiren' },
    guj_Gujr: { text: 'હું ઠીક છું', pronunciation: 'Hun ṭhīk chhun' },
    kan_Knda: { text: 'ನಾನು ಚೆನ್ನಾಗಿದ್ದೀನಿ', pronunciation: 'Nānu chennāgiddīni' },
    mal_Mlym: { text: 'ഞാൻ സുഖമാണ്', pronunciation: 'Nān sukhamāṇ' },
    pan_Guru: { text: 'ਮੈਂ ਠੀਕ ਹਾਂ', pronunciation: 'Main ṭhīk hān' },
    ory_Orya: { text: 'ମୁଁ ଭଲ ଅଛି', pronunciation: 'Mun bhala achhi' },
    asm_Beng: { text: 'মই ভাল আছো', pronunciation: 'Moi bhāl āchho' },
    mai_Deva: { text: 'हम ठीक छी', pronunciation: 'Ham ṭhīk chhī' },
    urd_Arab: { text: 'میں ٹھیک ہوں', pronunciation: 'Main ṭhīk hun' },
    snd_Arab: { text: 'مان ٺيڪ آهيان', pronunciation: 'Mān ṭhīk āhiyān' },
    kok_Deva: { text: 'हांव बरें आसा', pronunciation: 'Hānv baren āsā' },
    npi_Deva: { text: 'म ठीक छु', pronunciation: 'Ma ṭhīk chhu' },
    mni_Beng: { text: 'ꯑꯩ ꯐꯖꯩ', pronunciation: 'Ei phajei' },
    brx_Deva: { text: 'आं गोजौ', pronunciation: 'Ān gojau' },
    san_Deva: { text: 'अहम् कुशलः अस्मि', pronunciation: 'Aham kushalaḥ asmi' },
    kas_Arab: { text: 'بہ ٹھیک چھوس', pronunciation: 'Buh ṭhīk chhus' },
    doi_Deva: { text: 'मैं ठीक आं', pronunciation: 'Main ṭhīk ān' },
    sat_Olck: { text: 'ᱟᱹᱧ ᱵᱷᱟᱹᱜᱤ ᱢᱮᱱᱟᱹᱧ', pronunciation: 'Ān bhāgi menān' },
  },
  'yes': {
    hin_Deva: { text: 'हाँ', pronunciation: 'Haan' },
    ben_Beng: { text: 'হ্যাঁ', pronunciation: 'Hyān' },
    tel_Telu: { text: 'అవును', pronunciation: 'Avunu' },
    mar_Deva: { text: 'हो', pronunciation: 'Ho' },
    tam_Taml: { text: 'ஆம்', pronunciation: 'Ām' },
    guj_Gujr: { text: 'હા', pronunciation: 'Hā' },
    kan_Knda: { text: 'ಹೌದು', pronunciation: 'Haudu' },
    mal_Mlym: { text: 'അതെ', pronunciation: 'Athe' },
    pan_Guru: { text: 'ਹਾਂ', pronunciation: 'Hān' },
    ory_Orya: { text: 'ହଁ', pronunciation: 'Han' },
    asm_Beng: { text: 'হয়', pronunciation: 'Hoy' },
    mai_Deva: { text: 'हाँ', pronunciation: 'Hān' },
    urd_Arab: { text: 'ہاں', pronunciation: 'Hān' },
    snd_Arab: { text: 'ها', pronunciation: 'Hā' },
    kok_Deva: { text: 'हय', pronunciation: 'Hay' },
    npi_Deva: { text: 'हो', pronunciation: 'Ho' },
    mni_Beng: { text: 'ꯍꯣꯏ', pronunciation: 'Hoi' },
    brx_Deva: { text: 'हां', pronunciation: 'Hān' },
    san_Deva: { text: 'आम्', pronunciation: 'Ām' },
    kas_Arab: { text: 'آ', pronunciation: 'Ā' },
    doi_Deva: { text: 'हां', pronunciation: 'Hān' },
    sat_Olck: { text: 'ᱦᱚᱭ', pronunciation: 'Hoy' },
  },
  'no': {
    hin_Deva: { text: 'नहीं', pronunciation: 'Nahīn' },
    ben_Beng: { text: 'না', pronunciation: 'Nā' },
    tel_Telu: { text: 'లేదు', pronunciation: 'Lēdu' },
    mar_Deva: { text: 'नाही', pronunciation: 'Nāhī' },
    tam_Taml: { text: 'இல்லை', pronunciation: 'Illai' },
    guj_Gujr: { text: 'ના', pronunciation: 'Nā' },
    kan_Knda: { text: 'ಇಲ್ಲ', pronunciation: 'Illa' },
    mal_Mlym: { text: 'ഇല്ല', pronunciation: 'Illa' },
    pan_Guru: { text: 'ਨਹੀਂ', pronunciation: 'Nahīn' },
    ory_Orya: { text: 'ନାହିଁ', pronunciation: 'Nāhin' },
    asm_Beng: { text: 'নহয়', pronunciation: 'Nohoy' },
    mai_Deva: { text: 'नै', pronunciation: 'Nai' },
    urd_Arab: { text: 'نہیں', pronunciation: 'Nahīn' },
    snd_Arab: { text: 'نہ', pronunciation: 'Nah' },
    kok_Deva: { text: 'ना', pronunciation: 'Nā' },
    npi_Deva: { text: 'होइन', pronunciation: 'Hoina' },
    mni_Beng: { text: 'ꯅꯠꯇꯦ', pronunciation: 'Natte' },
    brx_Deva: { text: 'नङा', pronunciation: 'Nangā' },
    san_Deva: { text: 'न', pronunciation: 'Na' },
    kas_Arab: { text: 'نہ', pronunciation: 'Nah' },
    doi_Deva: { text: 'नेईं', pronunciation: 'Neīn' },
    sat_Olck: { text: 'ᱵᱟᱝ', pronunciation: 'Bāng' },
  },
  'please': {
    hin_Deva: { text: 'कृपया', pronunciation: 'Kripayā' },
    ben_Beng: { text: 'দয়া করে', pronunciation: 'Doyā kore' },
    tel_Telu: { text: 'దయచేసి', pronunciation: 'Dayachēsi' },
    mar_Deva: { text: 'कृपया', pronunciation: 'Kripayā' },
    tam_Taml: { text: 'தயவுசெய்து', pronunciation: 'Thayavuseydhu' },
    guj_Gujr: { text: 'કૃપા કરીને', pronunciation: 'Krupā karīne' },
    kan_Knda: { text: 'ದಯವಿಟ್ಟು', pronunciation: 'Dayaviṭṭu' },
    mal_Mlym: { text: 'ദയവായി', pronunciation: 'Dayavāyi' },
    pan_Guru: { text: 'ਕਿਰਪਾ ਕਰਕੇ', pronunciation: 'Kirapā karake' },
    ory_Orya: { text: 'ଦୟାକରି', pronunciation: 'Dayākari' },
    asm_Beng: { text: 'অনুগ্ৰহ কৰি', pronunciation: 'Anugroha kori' },
    mai_Deva: { text: 'कृपया', pronunciation: 'Kripayā' },
    urd_Arab: { text: 'براہ کرم', pronunciation: 'Barāh karam' },
    snd_Arab: { text: 'مهرباني ڪري', pronunciation: 'Meharbānī kari' },
    kok_Deva: { text: 'उपकार करून', pronunciation: 'Upakār karūn' },
    npi_Deva: { text: 'कृपया', pronunciation: 'Kripayā' },
    mni_Beng: { text: 'ꯆꯥꯅꯕꯤꯗꯨꯅ', pronunciation: 'Chānabiduna' },
    brx_Deva: { text: 'दया खालामनाय', pronunciation: 'Dayā khālāmānāy' },
    san_Deva: { text: 'कृपया', pronunciation: 'Kripayā' },
    kas_Arab: { text: 'مہربانی کرتھ', pronunciation: 'Meharbānī karath' },
    doi_Deva: { text: 'कृपा करियै', pronunciation: 'Kripā kariyai' },
    sat_Olck: { text: 'ᱫᱚᱭᱟ ᱠᱟᱛᱮ', pronunciation: 'Doyā kāte' },
  },
  'sorry': {
    hin_Deva: { text: 'माफ़ कीजिए', pronunciation: 'Māf kījiye' },
    ben_Beng: { text: 'দুঃখিত', pronunciation: 'Dukhito' },
    tel_Telu: { text: 'క్షమించండి', pronunciation: 'Kshaminchanḍi' },
    mar_Deva: { text: 'माफ करा', pronunciation: 'Māf karā' },
    tam_Taml: { text: 'மன்னிக்கவும்', pronunciation: 'Mannikkavum' },
    guj_Gujr: { text: 'માફ કરો', pronunciation: 'Māf karo' },
    kan_Knda: { text: 'ಕ್ಷಮಿಸಿ', pronunciation: 'Kshamisi' },
    mal_Mlym: { text: 'ക്ഷമിക്കണം', pronunciation: 'Kshemikkanam' },
    pan_Guru: { text: 'ਮਾਫ਼ ਕਰੋ', pronunciation: 'Māf karo' },
    ory_Orya: { text: 'କ୍ଷମା କରନ୍ତୁ', pronunciation: 'Kshamā karantu' },
    asm_Beng: { text: 'ক্ষমা কৰক', pronunciation: 'Kshamā karak' },
    mai_Deva: { text: 'माफ करू', pronunciation: 'Māf karū' },
    urd_Arab: { text: 'معاف کیجیے', pronunciation: 'Māf kījiye' },
    snd_Arab: { text: 'معافي گهرائين', pronunciation: 'Māfī gharāin' },
    kok_Deva: { text: 'माफ करा', pronunciation: 'Māf karā' },
    npi_Deva: { text: 'माफ गर्नुहोस्', pronunciation: 'Māf garnuhos' },
    mni_Beng: { text: 'ꯑꯋꯥꯕꯥ ꯄꯤꯌꯨ', pronunciation: 'Awābā pīyu' },
    brx_Deva: { text: 'फोजोब मावगासि', pronunciation: 'Phojob māvgāsi' },
    san_Deva: { text: 'क्षम्यताम्', pronunciation: 'Kshamyatām' },
    kas_Arab: { text: 'معاف کرو', pronunciation: 'Māf karo' },
    doi_Deva: { text: 'माफी', pronunciation: 'Māfī' },
    sat_Olck: { text: 'ᱢᱟᱯᱷᱤᱭ', pronunciation: 'Māphiy' },
  },
  'goodbye': {
    hin_Deva: { text: 'अलविदा', pronunciation: 'Alvidā' },
    ben_Beng: { text: 'বিদায়', pronunciation: 'Bidāy' },
    tel_Telu: { text: 'వీడ్కోలు', pronunciation: 'Vīḍkōlu' },
    mar_Deva: { text: 'निरोप', pronunciation: 'Nirōp' },
    tam_Taml: { text: 'விடைபெறுகிறேன்', pronunciation: 'Vidaiperukirēn' },
    guj_Gujr: { text: 'આવજો', pronunciation: 'Āvjo' },
    kan_Knda: { text: 'ವಿದಾಯ', pronunciation: 'Vidāya' },
    mal_Mlym: { text: 'വിട', pronunciation: 'Vida' },
    pan_Guru: { text: 'ਅਲਵਿਦਾ', pronunciation: 'Alvidā' },
    ory_Orya: { text: 'ବିଦାୟ', pronunciation: 'Bidāya' },
    asm_Beng: { text: 'বিদায়', pronunciation: 'Bidāy' },
    mai_Deva: { text: 'अलविदा', pronunciation: 'Alvidā' },
    urd_Arab: { text: 'الوداع', pronunciation: 'Alvidā' },
    snd_Arab: { text: 'الوداع', pronunciation: 'Alvidā' },
    kok_Deva: { text: 'निरोप', pronunciation: 'Nirōp' },
    npi_Deva: { text: 'अलविदा', pronunciation: 'Alvidā' },
    mni_Beng: { text: 'ꯆꯠꯂꯁꯤ', pronunciation: 'Chatlasi' },
    brx_Deva: { text: 'जायो', pronunciation: 'Jāyo' },
    san_Deva: { text: 'पुनर्दर्शनाय', pronunciation: 'Punardarśanāya' },
    kas_Arab: { text: 'الوداع', pronunciation: 'Alvidā' },
    doi_Deva: { text: 'अलविदा', pronunciation: 'Alvidā' },
    sat_Olck: { text: 'ᱥᱮᱱᱚᱜ ᱢᱮ', pronunciation: 'Senog me' },
  },
  'my name is': {
    hin_Deva: { text: 'मेरा नाम है', pronunciation: 'Merā nām hai' },
    kan_Knda: { text: 'ನನ್ನ ಹೆಸರು', pronunciation: 'Nanna hesaru' },
    tam_Taml: { text: 'என் பெயர்', pronunciation: 'En peyar' },
    guj_Gujr: { text: 'મારું નામ છે', pronunciation: 'Mārun nām chhe' },
    ben_Beng: { text: 'আমার নাম', pronunciation: 'Āmār nām' },
    tel_Telu: { text: 'నా పేరు', pronunciation: 'Nā pēru' },
    mal_Mlym: { text: 'എന്റെ പേര്', pronunciation: 'Ente pēr' },
  },
  'i am hungry': {
    hin_Deva: { text: 'मुझे भूख लगी है', pronunciation: 'Mujhe bhookh lagi hai' },
    kan_Knda: { text: 'ನನಗೆ ಹಸಿವಾಗಿದೆ', pronunciation: 'Nanage hasivāgide' },
    tam_Taml: { text: 'எனக்கு பசிக்கிறது', pronunciation: 'Enakku pasikkiradhu' },
    guj_Gujr: { text: 'મને ભૂખ લાગી છે', pronunciation: 'Mane bhookh lāgī chhe' },
    ben_Beng: { text: 'আমার খিদে পেয়েছে', pronunciation: 'Āmār khide peyechhe' },
    tel_Telu: { text: 'నాకు ఆకలిగా ఉంది', pronunciation: 'Nāku ākaligā undi' },
    mal_Mlym: { text: 'എനിക്ക് വിശക്കുന്നു', pronunciation: 'Enikku vishakkunnu' },
    mar_Deva: { text: 'मला भूक लागली आहे', pronunciation: 'Malā bhūk lāglī āhe' },
  },
  'i am thirsty': {
    hin_Deva: { text: 'मुझे प्यास लगी है', pronunciation: 'Mujhe pyās lagī hai' },
    kan_Knda: { text: 'ನನಗೆ ಬಾಯಾರಿಕೆ ಆಗಿದೆ', pronunciation: 'Nanage bāyārike āgide' },
    tam_Taml: { text: 'எனக்கு தாகமாக இருக்கிறது', pronunciation: 'Enakku dhāgamāga irukkuradhu' },
  },
  'give me water': {
    hin_Deva: { text: 'मुझे पानी दो', pronunciation: 'Mujhe pānī do' },
    ben_Beng: { text: 'আমাকে জল দাও', pronunciation: 'Āmāke jol dāo' },
    tel_Telu: { text: 'నాకు నీళ్ళు ఇవ్వండి', pronunciation: 'Nāku nīllu ivvandi' },
    mar_Deva: { text: 'मला पाणी द्या', pronunciation: 'Malā pāṇī dyā' },
    tam_Taml: { text: 'எனக்கு தண்ணீர் கொடுங்கள்', pronunciation: 'Enakku thannīr kodungal' },
    guj_Gujr: { text: 'મને પાણી આપો', pronunciation: 'Mane pāṇī āpo' },
    kan_Knda: { text: 'ನನಗೆ ನೀರು ಕೊಡಿ', pronunciation: 'Nanage nīru koḍi' },
    mal_Mlym: { text: 'എനിക്ക് വെള്ളം തരൂ', pronunciation: 'Enikku vellam tharū' },
    pan_Guru: { text: 'ਮੈਨੂੰ ਪਾਣੀ ਦਿਓ', pronunciation: 'Mainūn pāṇī dio' },
    ory_Orya: { text: 'ମୋତେ ପାଣି ଦିଅନ୍ତୁ', pronunciation: 'Mote pāṇi diantu' },
    asm_Beng: { text: 'মোক পানী দিয়ক', pronunciation: 'Mok pānī diyak' },
    mai_Deva: { text: 'हमरा पानि दिऔ', pronunciation: 'Hamarā pāni diau' },
    urd_Arab: { text: 'مجھے پانی دو', pronunciation: 'Mujhe pānī do' },
    snd_Arab: { text: 'مون کي پاڻي ڏيو', pronunciation: 'Mon kī pāṇī dio' },
    kok_Deva: { text: 'म्हाका उदक दी', pronunciation: 'Mhākā udak dī' },
    npi_Deva: { text: 'मलाई पानी दिनुहोस्', pronunciation: 'Malāī pānī dinuhos' },
    mni_Beng: { text: 'ꯑꯩꯕꯨ ꯏꯁꯤꯡ ꯄꯤꯌꯨ', pronunciation: 'Eibu ising pīyu' },
    brx_Deva: { text: 'आंखौ दाब दे', pronunciation: 'Ānkhau dāb de' },
    san_Deva: { text: 'मह्यं जलं देहि', pronunciation: 'Mahyam jalam dehi' },
    kas_Arab: { text: 'می آب دیو', pronunciation: 'Mī āb dio' },
    doi_Deva: { text: 'मिगी पाणी दे', pronunciation: 'Migī pāṇī de' },
    sat_Olck: { text: 'ᱟᱹᱧᱟᱜ ᱫᱟᱜ ᱮᱢᱟ', pronunciation: 'Āng dāg emā' },
  },
  'is it spicy': {
    hin_Deva: { text: 'क्या यह तीखा है?', pronunciation: 'Kya yah tīkhā hai?' },
    kan_Knda: { text: 'ಇದು ಖಾರವೇ?', pronunciation: 'Idu khāravē?' },
    tam_Taml: { text: 'இது காரமா?', pronunciation: 'Idhu kāramā?' },
  },
  'is it spicy?': {
    hin_Deva: { text: 'क्या यह तीखा है?', pronunciation: 'Kya yah tīkhā hai?' },
    kan_Knda: { text: 'ಇದು ಖಾರವೇ?', pronunciation: 'Idu khāravē?' },
    tam_Taml: { text: 'இது காரமா?', pronunciation: 'Idhu kāramā?' },
  },
  'where is the temple': {
    hin_Deva: { text: 'मंदिर कहाँ है?', pronunciation: 'Mandir kahān hai?' },
    kan_Knda: { text: 'ದೇವಸ್ಥಾನ ಎಲ್ಲಿದೆ?', pronunciation: 'Dēvasthāna ellide?' },
    tam_Taml: { text: 'கோவில் எங்கே?', pronunciation: 'Kōvil engkē?' },
    tel_Telu: { text: 'గుడి ఎక్కడ?', pronunciation: 'Gudi ekkada?' },
  },
  'where is the temple?': {
    hin_Deva: { text: 'मंदिर कहाँ है?', pronunciation: 'Mandir kahān hai?' },
    ben_Beng: { text: 'মন্দির কোথায়?', pronunciation: 'Mandir kothāy?' },
    tel_Telu: { text: 'గుడి ఎక్కడ?', pronunciation: 'Gudi ekkada?' },
    mar_Deva: { text: 'मंदिर कुठे आहे?', pronunciation: 'Mandir kuthe āhe?' },
    tam_Taml: { text: 'கோவில் எங்கே?', pronunciation: 'Kōvil engkē?' },
    guj_Gujr: { text: 'મંદિર ક્યાં છે?', pronunciation: 'Mandir kyān chhe?' },
    kan_Knda: { text: 'ದೇವಸ್ಥಾನ ಎಲ್ಲಿದೆ?', pronunciation: 'Dēvasthāna ellide?' },
    mal_Mlym: { text: 'ക്ഷേത്രം എവിടെയാണ്?', pronunciation: 'Kshethram evideyāṇ?' },
    pan_Guru: { text: 'ਮੰਦਿਰ ਕਿੱਥੇ ਹੈ?', pronunciation: 'Mandir kitthe hai?' },
    ory_Orya: { text: 'ମନ୍ଦିର କେଉଁଠି ଅଛି?', pronunciation: 'Mandira keuthi achhi?' },
    asm_Beng: { text: 'মন্দিৰ কত আছে?', pronunciation: 'Mandir kota āchhe?' },
    mai_Deva: { text: 'मंदिर कतय अछि?', pronunciation: 'Mandir kataya achhi?' },
    urd_Arab: { text: 'مندر کہاں ہے?', pronunciation: 'Mandir kahān hai?' },
    snd_Arab: { text: 'مندر ڪٿي آهي?', pronunciation: 'Mandir kathī āhi?' },
    kok_Deva: { text: 'देवूळ कोंय आसा?', pronunciation: 'Devūl konay āsā?' },
    npi_Deva: { text: 'मन्दिर कहाँ छ?', pronunciation: 'Mandir kahān chha?' },
    mni_Beng: { text: 'ꯃꯟꯗꯤꯔ ꯀꯗꯥꯏꯗꯥ ꯂꯩꯕꯒꯦ?', pronunciation: 'Mandir kadāidā leibage?' },
    brx_Deva: { text: 'मान्दिर माबा दं?', pronunciation: 'Māndir mābā dang?' },
    san_Deva: { text: 'मन्दिरं कुत्र अस्ति?', pronunciation: 'Mandiram kutra asti?' },
    kas_Arab: { text: 'مندر کتھ چھو?', pronunciation: 'Mandir kath chho?' },
    doi_Deva: { text: 'मंदर किथू ऐ?', pronunciation: 'Mandar kithū ai?' },
    sat_Olck: { text: 'ᱢᱚᱱᱫᱤᱨ ᱚᱠᱟᱨᱮ ᱢᱮᱱᱟᱜᱼᱟ?', pronunciation: 'Mandir okāre menag-ā?' },
  },
  'where is the bathroom': {
    hin_Deva: { text: 'बाथरूम कहाँ है?', pronunciation: 'Bathroom kahān hai?' },
    kan_Knda: { text: 'ಶೌಚಾಲಯ ಎಲ್ಲಿದೆ?', pronunciation: 'Shauchālaya ellide?' },
    tam_Taml: { text: 'கழிவறை எங்கே?', pronunciation: 'Kazhivarai engkē?' },
  },
  'where is the bathroom?': {
    hin_Deva: { text: 'बाथरूम कहाँ है?', pronunciation: 'Bathroom kahān hai?' },
    kan_Knda: { text: 'ಶೌಚಾಲಯ ಎಲ್ಲಿದೆ?', pronunciation: 'Shauchālaya ellide?' },
    tam_Taml: { text: 'கழிவறை எங்கே?', pronunciation: 'Kazhivarai engkē?' },
  },
  'where is the hotel': {
    hin_Deva: { text: 'होटल कहाँ है?', pronunciation: 'Hotel kahān hai?' },
    kan_Knda: { text: 'ಹೋಟೆಲ್ ಎಲ್ಲಿದೆ?', pronunciation: 'Hōṭel ellide?' },
    tam_Taml: { text: 'ஹோட்டல் எங்கே?', pronunciation: 'Hōṭṭal engkē?' },
  },
  'where is the station': {
    hin_Deva: { text: 'स्टेशन कहाँ है?', pronunciation: 'Station kahān hai?' },
    kan_Knda: { text: 'ನಿಲ್ದಾಣ ಎಲ್ಲಿದೆ?', pronunciation: 'Nildāṇa ellide?' },
    tam_Taml: { text: 'நிலையம் எங்கே?', pronunciation: 'Nilaiyam engkē?' },
  },
  'go left': {
    hin_Deva: { text: 'बाएं जाइए', pronunciation: 'Bāyein jāiye' },
    kan_Knda: { text: 'ಎಡಕ್ಕೆ ಹೋಗಿ', pronunciation: 'Eḍakke hōgi' },
    tam_Taml: { text: 'இடதுபுறம் போங்கள்', pronunciation: 'Idathupuram pōngal' },
  },
  'go right': {
    hin_Deva: { text: 'दाएं जाइए', pronunciation: 'Dāyein jāiye' },
    kan_Knda: { text: 'ಬಲಕ್ಕೆ ಹೋಗಿ', pronunciation: 'Balakke hōgi' },
    tam_Taml: { text: 'வலதுபுறம் போங்கள்', pronunciation: 'Valathupuram pōngal' },
  },
  'go straight': {
    hin_Deva: { text: 'सीधे जाइए', pronunciation: 'Sīdhe jāiye' },
    kan_Knda: { text: 'ನೇರವಾಗಿ ಹೋಗಿ', pronunciation: 'Nēravāgi hōgi' },
    tam_Taml: { text: 'நேராக போங்கள்', pronunciation: 'Nērāga pōngal' },
  },
  'help me': {
    hin_Deva: { text: 'मेरी मदद करो', pronunciation: 'Merī madad karo' },
    ben_Beng: { text: 'আমাকে সাহায্য করো', pronunciation: 'Āmāke sāhājya korō' },
    tel_Telu: { text: 'నాకు సహాయం చేయండి', pronunciation: 'Nāku sahāyam chēyandi' },
    mar_Deva: { text: 'मला मदत करा', pronunciation: 'Malā madat karā' },
    tam_Taml: { text: 'எனக்கு உதவுங்கள்', pronunciation: 'Enakku udhavungal' },
    guj_Gujr: { text: 'મને મદદ કરો', pronunciation: 'Mane madad karo' },
    kan_Knda: { text: 'ನನಗೆ ಸಹಾಯ ಮಾಡಿ', pronunciation: 'Nanage sahāya māḍi' },
    mal_Mlym: { text: 'എന്നെ സഹായിക്കൂ', pronunciation: 'Enne sahāyikkū' },
    pan_Guru: { text: 'ਮੇਰੀ ਮਦਦ ਕਰੋ', pronunciation: 'Merī madad karo' },
    ory_Orya: { text: 'ମୋତେ ସାହାଯ୍ୟ କରନ୍ତୁ', pronunciation: 'Mote sāhāyya karantu' },
    asm_Beng: { text: 'মোক সহায় কৰক', pronunciation: 'Mok sahāya karak' },
    mai_Deva: { text: 'हमर मदद करू', pronunciation: 'Hamar madad karū' },
    urd_Arab: { text: 'میری مدد کرو', pronunciation: 'Merī madad karo' },
    snd_Arab: { text: 'منهنجي مدد ڪريو', pronunciation: 'Munhinjī madad kariyo' },
    kok_Deva: { text: 'म्हाका मदत करा', pronunciation: 'Mhākā madat karā' },
    npi_Deva: { text: 'मलाई मदत गर्नुहोस्', pronunciation: 'Malāī madat garnuhos' },
    mni_Beng: { text: 'ꯑꯩꯕꯨ ꯃꯇꯦꯡ ꯄꯥꯡꯕꯤꯌꯨ', pronunciation: 'Eibu mateng pāngbiyu' },
    brx_Deva: { text: 'आंखौ मददख', pronunciation: 'Ānkhau madadkha' },
    san_Deva: { text: 'मम साहाय्यं कुर्वन्तु', pronunciation: 'Mama sāhāyyam kurvantu' },
    kas_Arab: { text: 'می مدد کرو', pronunciation: 'Mī madad karo' },
    doi_Deva: { text: 'मेरी मदद करो', pronunciation: 'Merī madad karo' },
    sat_Olck: { text: 'ᱟᱹᱧᱟᱜ ᱜᱚᱲᱚ ᱮᱢᱟ', pronunciation: 'Āng goro emā' },
  },
  'call a doctor': {
    hin_Deva: { text: 'डॉक्टर को बुलाओ', pronunciation: 'Doctor ko bulāo' },
    kan_Knda: { text: 'ವೈದ್ಯರನ್ನು ಕರೆಯಿರಿ', pronunciation: 'Vaidyarannu kareyiri' },
    tam_Taml: { text: 'மருத்துவரை அழையுங்கள்', pronunciation: 'Maruthuvarai azhaiyungal' },
  },
  'call the police': {
    hin_Deva: { text: 'पुलिस को बुलाओ', pronunciation: 'Police ko bulāo' },
    kan_Knda: { text: 'ಪೊಲೀಸರನ್ನು ಕರೆಯಿರಿ', pronunciation: 'Polīsarannu kareyiri' },
  },
  'i am lost': {
    hin_Deva: { text: 'मैं रास्ता भूल गया हूँ', pronunciation: 'Main rāstā bhool gayā hoon' },
    kan_Knda: { text: 'ನಾನು ದಾರಿ ತಪ್ಪಿದ್ದೇನೆ', pronunciation: 'Nānu dāri tappiddēne' },
    tam_Taml: { text: 'நான் வழி தவறிவிட்டேன்', pronunciation: 'Nān vazhi thavarivittēn' },
  },
  'how much does this cost': {
    hin_Deva: { text: 'इसकी कीमत क्या है?', pronunciation: 'Iskī kīmat kya hai?' },
    kan_Knda: { text: 'ಇದರ ಬೆಲೆ ಎಷ್ಟು?', pronunciation: 'Idara bele eṣṭu?' },
    tam_Taml: { text: 'இதன் விலை என்ன?', pronunciation: 'Idhan vilai enna?' },
    guj_Gujr: { text: 'આનો ભાવ શું છે?', pronunciation: 'Āno bhāv shun chhe?' },
    tel_Telu: { text: 'దీని ధర ఎంత?', pronunciation: 'Dīni dhara entha?' },
  },
  'how much does this cost?': {
    hin_Deva: { text: 'इसकी कीमत क्या है?', pronunciation: 'Iskī kīmat kya hai?' },
    kan_Knda: { text: 'ಇದರ ಬೆಲೆ ಎಷ್ಟು?', pronunciation: 'Idara bele eṣṭu?' },
    tam_Taml: { text: 'இதன் விலை என்ன?', pronunciation: 'Idhan vilai enna?' },
    guj_Gujr: { text: 'આનો ભાવ શું છે?', pronunciation: 'Āno bhāv shun chhe?' },
  },
  'very expensive': {
    hin_Deva: { text: 'बहुत महंगा', pronunciation: 'Bahut mahangā' },
    kan_Knda: { text: 'ತುಂಬಾ ದುಬಾರಿ', pronunciation: 'Tumbā dubāri' },
    tam_Taml: { text: 'மிகவும் விலை உயர்ந்தது', pronunciation: 'Migavum vilai uyarndhadhu' },
  },
  'please reduce the price': {
    hin_Deva: { text: 'कृपया कीमत कम करें', pronunciation: 'Kripayā kīmat kam karein' },
    kan_Knda: { text: 'ದಯವಿಟ್ಟು ಬೆಲೆ ಕಡಿಮೆ ಮಾಡಿ', pronunciation: 'Dayaviṭṭu bele kaḍime māḍi' },
  },
  'i love india': {
    hin_Deva: { text: 'मुझे भारत से प्यार है', pronunciation: 'Mujhe Bhārat se pyār hai' },
    kan_Knda: { text: 'ನನಗೆ ಭಾರತ ಇಷ್ಟ', pronunciation: 'Nanage Bhārata ishṭa' },
    tam_Taml: { text: 'நான் இந்தியாவை நேசிக்கிறேன்', pronunciation: 'Nān Indhiyāvai nēsikkirēn' },
    tel_Telu: { text: 'నాకు భారతదేశం అంటే ఇష్టం', pronunciation: 'Nāku Bhāratadēśam antē ishtam' },
  },
  'i dont understand': {
    hin_Deva: { text: 'मुझे समझ नहीं आया', pronunciation: 'Mujhe samajh nahīn āyā' },
    kan_Knda: { text: 'ನನಗೆ ಅರ್ಥವಾಗಲಿಲ್ಲ', pronunciation: 'Nanage arthavāgalilla' },
    tam_Taml: { text: 'எனக்கு புரியவில்லை', pronunciation: 'Enakku puriyavillai' },
  },
  "i don't understand": {
    hin_Deva: { text: 'मुझे समझ नहीं आया', pronunciation: 'Mujhe samajh nahīn āyā' },
    kan_Knda: { text: 'ನನಗೆ ಅರ್ಥವಾಗಲಿಲ್ಲ', pronunciation: 'Nanage arthavāgalilla' },
    tam_Taml: { text: 'எனக்கு புரியவில்லை', pronunciation: 'Enakku puriyavillai' },
  },
  'do you speak english': {
    hin_Deva: { text: 'क्या आप अंग्रेज़ी बोलते हैं?', pronunciation: 'Kya āp Angrezī bolte hain?' },
    kan_Knda: { text: 'ನೀವು ಆಂಗ್ಲ ಮಾತನಾಡುತ್ತೀರಾ?', pronunciation: 'Nīvu āngla mātanāḍuttīrā?' },
    tam_Taml: { text: 'நீங்கள் ஆங்கிலம் பேசுவீர்களா?', pronunciation: 'Nīngal āngkilam pēsuvīrgalā?' },
  },
  'do you speak english?': {
    hin_Deva: { text: 'क्या आप अंग्रेज़ी बोलते हैं?', pronunciation: 'Kya āp Angrezī bolte hain?' },
    kan_Knda: { text: 'ನೀವು ಆಂಗ್ಲ ಮಾತನಾಡುತ್ತೀರಾ?', pronunciation: 'Nīvu āngla mātanāḍuttīrā?' },
    tam_Taml: { text: 'நீங்கள் ஆங்கிலம் பேசுவீர்களா?', pronunciation: 'Nīngal āngkilam pēsuvīrgalā?' },
  },
  'one': { hin_Deva: { text: 'एक', pronunciation: 'Ek' }, kan_Knda: { text: 'ಒಂದು', pronunciation: 'Ondu' }, tam_Taml: { text: 'ஒன்று', pronunciation: 'Ondru' } },
  'two': { hin_Deva: { text: 'दो', pronunciation: 'Do' }, kan_Knda: { text: 'ಎರಡು', pronunciation: 'Eraḍu' }, tam_Taml: { text: 'இரண்டு', pronunciation: 'Iranḍu' } },
  'three': { hin_Deva: { text: 'तीन', pronunciation: 'Tīn' }, kan_Knda: { text: 'ಮೂರು', pronunciation: 'Mūru' }, tam_Taml: { text: 'மூன்று', pronunciation: 'Mūndru' } },
  'four': { hin_Deva: { text: 'चार', pronunciation: 'Chār' }, kan_Knda: { text: 'ನಾಲ್ಕು', pronunciation: 'Nālku' }, tam_Taml: { text: 'நான்கு', pronunciation: 'Nāngu' } },
  'five': { hin_Deva: { text: 'पाँच', pronunciation: 'Pānch' }, kan_Knda: { text: 'ಐದು', pronunciation: 'Aidu' }, tam_Taml: { text: 'ஐந்து', pronunciation: 'Aindhu' } },
  'ten': { hin_Deva: { text: 'दस', pronunciation: 'Das' }, kan_Knda: { text: 'ಹತ್ತು', pronunciation: 'Hattu' }, tam_Taml: { text: 'பத்து', pronunciation: 'Paththu' } },
  'hundred': { hin_Deva: { text: 'सौ', pronunciation: 'Sau' }, kan_Knda: { text: 'ನೂರು', pronunciation: 'Nūru' }, tam_Taml: { text: 'நூறு', pronunciation: 'Nūru' } },
};

/**
 * Fuzzy dictionary lookup:
 * 1. Exact match
 * 2. Input contains a dictionary phrase
 * 3. Dictionary phrase contains the input
 * 4. Best word-overlap match (≥50%)
 */
function lookupDictionary(sourceText, sourceLangCode, targetLangCode) {
  const normalizedInput = sourceText.trim().toLowerCase().replace(/[.!?,?|।]+$/g, '').trim();
  if (!normalizedInput) return null;

  const dictKeys = Object.keys(OFFLINE_DICTIONARY);

  // Case 1: Source is English
  if (sourceLangCode === 'eng_Latn') {
    // 1. Exact match
    const exact = OFFLINE_DICTIONARY[normalizedInput];
    if (exact) {
      if (targetLangCode === 'eng_Latn') return { text: normalizedInput, pronunciation: normalizedInput };
      if (exact[targetLangCode]) return exact[targetLangCode];
    }

    // Try with question mark
    const withQ = normalizedInput + '?';
    const exactQ = OFFLINE_DICTIONARY[withQ];
    if (exactQ) {
      if (targetLangCode === 'eng_Latn') return { text: withQ, pronunciation: withQ };
      if (exactQ[targetLangCode]) return exactQ[targetLangCode];
    }

    // 2. Substring containment
    for (const key of dictKeys) {
      const cleanKey = key.replace(/[?]/g, '');
      if (normalizedInput.includes(cleanKey) || cleanKey.includes(normalizedInput)) {
        const entry = OFFLINE_DICTIONARY[key];
        if (entry) {
          if (targetLangCode === 'eng_Latn') return { text: key, pronunciation: key };
          if (entry[targetLangCode]) return entry[targetLangCode];
        }
      }
    }

    // 3. Word overlap ≥50%
    const inputWords = new Set(normalizedInput.split(/\s+/));
    let bestMatch = null;
    let bestScore = 0;

    for (const key of dictKeys) {
      const entry = OFFLINE_DICTIONARY[key];
      const keyWords = new Set(key.replace(/[?]/g, '').split(/\s+/));
      let overlap = 0;
      for (const word of inputWords) {
        if (keyWords.has(word)) overlap++;
      }

      const score = overlap / Math.max(inputWords.size, keyWords.size);
      if (score > bestScore && score >= 0.5) {
        bestScore = score;
        if (targetLangCode === 'eng_Latn') {
          bestMatch = { text: key, pronunciation: key };
        } else {
          bestMatch = (entry && entry[targetLangCode]) ? entry[targetLangCode] : null;
        }
      }
    }

    return bestMatch;
  }

  // Case 2: Source is NOT English (Indian Language to Indian Language / English)
  // Search the values in the dictionary entries
  let matchedKey = null;
  let matchedEntry = null;

  for (const key of dictKeys) {
    const entry = OFFLINE_DICTIONARY[key];
    const langEntry = entry[sourceLangCode];
    if (langEntry) {
      const cleanText = (langEntry.text || '').trim().toLowerCase().replace(/[.!?,?|।]+$/g, '').trim();
      const cleanPron = (langEntry.pronunciation || '').trim().toLowerCase().replace(/[.!?,?|।]+$/g, '').trim();

      // Check exact match or substring match in native script or pronunciation
      if (
        cleanText === normalizedInput ||
        cleanPron === normalizedInput ||
        normalizedInput.includes(cleanText) ||
        cleanText.includes(normalizedInput) ||
        normalizedInput.includes(cleanPron) ||
        cleanPron.includes(normalizedInput)
      ) {
        matchedKey = key;
        matchedEntry = entry;
        break;
      }
    }
  }

  if (matchedEntry) {
    if (targetLangCode === 'eng_Latn') {
      // Capitalize first letter of English translation
      const formattedKey = matchedKey.charAt(0).toUpperCase() + matchedKey.slice(1);
      return { text: formattedKey, pronunciation: formattedKey };
    }
    if (matchedEntry[targetLangCode]) {
      return matchedEntry[targetLangCode];
    }
  }

  return null;
}

export function getQuickPhrasesForLang(langName) {
  const langCode = getLangCode(langName);
  const phrases = [
    'hello', 'thank you', 'sorry', 'how are you?', 'i am hungry', 
    'help me', 'yes', 'no', 'goodbye', 'how much does this cost?', 
    'where is the temple?', 'give me water'
  ];

  if (!langCode || langCode === 'eng_Latn') {
    return phrases.map(p => p.charAt(0).toUpperCase() + p.slice(1));
  }

  return phrases.map(p => {
    const entry = OFFLINE_DICTIONARY[p];
    if (entry && entry[langCode]) {
      return entry[langCode].text;
    }
    // Check with question mark if not found
    const withQ = p.endsWith('?') ? p : p + '?';
    const entryQ = OFFLINE_DICTIONARY[withQ];
    if (entryQ && entryQ[langCode]) {
      return entryQ[langCode].text;
    }
    // Also try checking keys without question mark
    const withoutQ = p.endsWith('?') ? p.slice(0, -1) : p;
    const entryNoQ = OFFLINE_DICTIONARY[withoutQ];
    if (entryNoQ && entryNoQ[langCode]) {
      return entryNoQ[langCode].text;
    }
    return p.charAt(0).toUpperCase() + p.slice(1);
  });
}

/**
 * Get list of all phrases available in the offline dictionary (English keys)
 */
export function getOfflinePhrasesList() {
  return Object.keys(OFFLINE_DICTIONARY);
}

/**
 * Check if a specific phrase is available offline for a language pair
 */
export function isPhraseAvailableOffline(sourceText, sourceLang, targetLang) {
  const sourceLangCode = getLangCode(sourceLang);
  const targetLangCode = getLangCode(targetLang);
  
  if (!sourceLangCode || !targetLangCode) return false;
  if (sourceLangCode === targetLangCode) return true;
  
  const result = lookupDictionary(sourceText, sourceLangCode, targetLangCode);
  return result !== null;
}
